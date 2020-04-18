import React, { useState, useEffect } from 'react';
import { View, BackHandler, TouchableOpacity } from 'react-native';

import { Snackbar, Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

import moment from 'moment';
import 'moment/locale/pt-br';

import api from './../../services/api';

import { 
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

export default function NewPlanPage({ navigator }) {
    const [selectedDays, setSelectedDays] = useState(['Mon','Tue','Wed','Thu','Fri']);

    const [name, setName] = useState('');
    const [startTimeValue, setStartTimeValue] = useState(new Date(moment('12:00', 'HH:mm')));
    const [endTimeValue, setEndTimeValue] = useState(new Date(moment('12:30', 'HH:mm')));
    
    const [startTimeShow, setStartTimeShow] = useState(false);
    const [endTimeShow, setEndTimeShow] = useState(false);
    const [switchStartEnd, setSwitchStartEnd] = useState(false);

    const [snackBarShow, setSnackBarShow] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('SnackBar');
    const showSnackBar = message => { setSnackBarShow(true); setSnackBarMessage(message) }

    const onChangeStartTime = (e, time) => { setStartTimeShow(false); setStartTimeValue(time || startTimeValue); setEndTimeValue(new Date(moment(time).add(1, 'hours')) || endTimeValue); }
    const onChangeEndTime = (e, time) => { setEndTimeShow(false); setEndTimeValue(time || endTimeValue) }

    const handleSubmit = async () => {
        let validation = true;
        if (name == '') {
            validation = false;
            showSnackBar('Por favor, insira um nome e tente novamente!');
        } else if (selectedDays.length == 0) {
            validation = false;
            showSnackBar('Selecione pelo menos um dia da semana!');
        }

        if (validation) {
            try {
                await api.post('/plans/new', { 
                    nome: name,
                    startHora: moment(startTimeValue).format('LT'),
                    endHora: (switchStartEnd) ? moment(endTimeValue).format('LT') : null,
                    repeatOn: selectedDays.toString()
                });
                showSnackBar('Plano adicionado!')
            } catch (e) {
                showSnackBar('Não foi possível adicionar o plano!')
            }
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
                <Input onChangeText={t => setName(t)} value={name} />

                <TimeRow>
                    <TimeWrapper>
                        <InputLabel>{ (switchStartEnd) ? 'Início' : 'Horário' }:</InputLabel>
                        <TimeToggle onPress={() => setStartTimeShow(true)} value={startTimeValue} />
                        {startTimeShow && (<DateTimePicker mode="time" value={startTimeValue} onChange={onChangeStartTime} />)}
                    </TimeWrapper>

                    { switchStartEnd && 
                        <TimeWrapper last={true}>
                            <InputLabel>Fim:</InputLabel>
                            <TimeToggle onPress={() => setEndTimeShow(true)} value={endTimeValue} />
                            {endTimeShow && (<DateTimePicker mode="time" value={endTimeValue} onChange={onChangeEndTime} />)}
                        </TimeWrapper>
                    }
                </TimeRow>
                
                <SwitchGroup>
                    <Switch color='#333' value={switchStartEnd} onValueChange={() => setSwitchStartEnd(!switchStartEnd)} />
                    <SwitchText>Habilitar Início - Fim</SwitchText>
                </SwitchGroup>

                <View style={{alignItems: 'center'}}>
                    <WeekdaysPicker selected={selectedDays} setSelected={setSelectedDays} />
                </View>
            </FormBody>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <ActionButton outline={true} onPress={() => navigator('list')} activeOpacity={0.6}>
                    <MaterialIcons name="arrow-back" size={26} color="black" />
                    <ActionButtonText color="black">Voltar</ActionButtonText>
                </ActionButton>
                
                <ActionButton onPress={handleSubmit} activeOpacity={0.6}>
                    <MaterialIcons name="add" size={26} color="white" />
                    <ActionButtonText>Adicionar</ActionButtonText>
                </ActionButton>
            </View>
            <Snackbar visible={snackBarShow} duration={2000} onDismiss={() => setSnackBarShow(false)}>{snackBarMessage}</Snackbar>
        </View>
    );
}