import React, { useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';

import { Snackbar, Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

import moment from 'moment';
import 'moment/locale/pt-br';

import api from './../../services/api';

import { 
    useStateWithCallback,
    Input,
    InputLabel,
    FormBody,
    TimeRow,
    TimeWrapper,
    TimeToggle,
    SwitchGroup,
    SwitchText,
    WeekdaysPicker,
    ActionButton,
    ActionButtonText
} from './components';

export default function PlanPage({ planId, data, navigator }) {
    const planData = data.filter(p => p.id == planId)[0];
    const toState = {
        name: planData.nome,
        selectedDays: planData.repeatOn.split(','),
        startTimeValue: new Date(moment(planData.startHora, 'HH:mm')),
        endTimeValue: (planData.endHora != null) ? new Date(moment(planData.endHora, 'HH:mm')) : new Date(moment(planData.startHora, 'HH:mm').add(1, 'hours')),
        switchStartEnd: planData.endHora != null,
        active: planData.active
    };

    // mutable values - watch changes
    const [name, setName] = useState(toState.name);
    const [selectedDays, setSelectedDays] = useState(toState.selectedDays);
    const [startTimeValue, setStartTimeValue] = useStateWithCallback(toState.startTimeValue, () => setStartTimeShow(false));
    const [endTimeValue, setEndTimeValue] = useStateWithCallback(toState.endTimeValue, () => setEndTimeShow(false));
    const [switchStartEnd, setSwitchStartEnd] = useState(toState.switchStartEnd);
    const [switchActive, setSwitchActive] = useState(toState.active);    

    // data watcher
    const [shouldSendUpdate, setShouldSendUpdate] = useState(false);
    useEffect(() => {
        setShouldSendUpdate(
            name != toState.name ||
            JSON.stringify(selectedDays) != JSON.stringify(toState.selectedDays) ||
            moment(startTimeValue).format('LT') != moment(toState.startTimeValue).format('LT') ||
            (planData.endHora != null && moment(endTimeValue).format('LT') != moment(toState.endTimeValue).format('LT')) ||
            switchStartEnd != toState.switchStartEnd ||
            switchActive != toState.active
        )
    }, [name, selectedDays, startTimeValue, endTimeValue, switchStartEnd, switchActive]);

    // time pickers
    
    // fix datetimepicker bug
    
    const [startTimeShow, setStartTimeShow] = useState(false);
    const [endTimeShow, setEndTimeShow] = useState(false);
    const onChangeStartTime = (e, time) => setStartTimeValue(time || startTimeValue);
    const onChangeEndTime = (e, time) => setEndTimeValue(time || endTimeValue);

    // snackBar 
    const [snackBarShow, setSnackBarShow] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('SnackBar');
    const showSnackBar = message => { setSnackBarShow(true); setSnackBarMessage(message) }

    const handleSubmit = async () => {
        try {
            await api.post(`/plans/update/${planId}`, {
                nome: name,
                startHora: moment(startTimeValue).format('LT'),
                endHora: (switchStartEnd) ? moment(endTimeValue).format('LT') : null,
                repeatOn: selectedDays.toString()
            });
            showSnackBar('Plano atualizado!')
        } catch (e) {
            showSnackBar('Não foi possível atualizar o plano!')
        }
    }

    const handleBackButton = () => {
        navigator('list');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);
        return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    }, [])

    return (
        <View style={{flex: 1}}>
            <FormBody>
                <InputLabel>Nome:</InputLabel>
                <Input value={name} onChangeText={t => setName(t)} />

                <TimeRow>
                    <TimeWrapper>
                        <InputLabel>
                            { (switchStartEnd) ? 'Início' : 'Horário' }:
                        </InputLabel>
                        <TimeToggle onPress={() => setStartTimeShow(true)} value={startTimeValue} />
                        {startTimeShow && (<DateTimePicker mode={"time"} value={startTimeValue} onChange={onChangeStartTime} />)}
                    </TimeWrapper>

                    { switchStartEnd && 
                        <TimeWrapper last={true}>
                            <InputLabel>Fim:</InputLabel>
                            <TimeToggle onPress={() => setEndTimeShow(true)} value={endTimeValue} />
                            {endTimeShow && (<DateTimePicker mode={"time"} value={endTimeValue} onChange={onChangeEndTime} />)}
                        </TimeWrapper>
                    }
                </TimeRow>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <SwitchGroup>
                        <Switch color='#333' value={switchStartEnd} onValueChange={() => setSwitchStartEnd(!switchStartEnd)} />
                        <SwitchText>Habilitar Início - Fim</SwitchText>
                    </SwitchGroup>

                    <SwitchGroup>
                        <Switch color='#333' value={switchActive} onValueChange={() => setSwitchActive(!switchActive)} />
                        <SwitchText>Plano {(switchActive) ? 'Ativo' : 'Inativo'}</SwitchText>
                    </SwitchGroup>                    
                </View>

                <View style={{alignItems: 'center'}}>
                    <WeekdaysPicker selected={selectedDays} setSelected={setSelectedDays} />
                </View>
            </FormBody>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <ActionButton outline={true} onPress={() => navigator('list')} activeOpacity={0.6}>
                    <MaterialIcons name="arrow-back" size={26} color="black" />
                    <ActionButtonText color="black">Voltar</ActionButtonText>
                </ActionButton>
                
                { shouldSendUpdate && 
                    <ActionButton onPress={handleSubmit} activeOpacity={0.6}>
                        <MaterialIcons name="update" size={26} color="white" />
                        <ActionButtonText>Atualizar</ActionButtonText>
                    </ActionButton>
                }
            </View>
            <Snackbar visible={snackBarShow} duration={5000} onDismiss={() => setSnackBarShow(false)}>{snackBarMessage}</Snackbar>
        </View>
    );
}