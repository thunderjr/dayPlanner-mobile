import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

import moment from 'moment';
import 'moment/locale/pt-br';

import api from './../../services/api';
import { BackButton } from './../../components';
import { 
    Input,
    InputLabel,
    Header,
    HeaderText,
    FormBody,
    TimeRow,
    TimeWrapper,
    TimeToggle,
    WeekdaysPicker
} from './components';

export default function NewPlanPage({ navigator }) {
    const [selectedDays, setSelectedDays] = useState(['Mon','Tue','Wed','Thu','Fri']);

    const [name, setName] = useState('');
    const [startTimeValue, setStartTimeValue] = useState(new Date());
    const [endTimeValue, setEndTimeValue] = useState(new Date());
    
    const [startTimeShow, setStartTimeShow] = useState(false);
    const [endTimeShow, setEndTimeShow] = useState(false);

    const [snackBarShow, setSnackBarShow] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('SnackBar');
    const showSnackBar = message => { setSnackBarShow(true); setSnackBarMessage(message) }

    const onChangeStartTime = (e, time) => { setStartTimeShow(false); setStartTimeValue(time) }
    const onChangeEndTime = (e, time) => { setEndTimeShow(false); setEndTimeValue(time) }


    const handleSubmit = async () => {
        const data = { 
            nome: name,
            startHora: moment(startTimeValue).format('LT'),
            endHora: moment(endTimeValue).format('LT'),
            repeatOn: selectedDays.toString()
        };

        try {
            await api.post('/plans/new', data);
            showSnackBar('Plano adicionado!')
        } catch (e) {
            showSnackBar('Não foi possível adicionar o plano!')
        }
    }

    return (
        <View style={{marginTop: 10, flex: 1}}>
            <BackButton navigator={navigator} backTo="list" />
            <Header>
                <HeaderText>Adicionar novo Plano</HeaderText>
            </Header>

            <FormBody>
                <InputLabel>Nome:</InputLabel>
                <Input onChangeText={t => setName(t)} value={name} />

                <TimeRow>
                    <TimeWrapper>
                        <InputLabel size={17}>Início:</InputLabel>
                        <TimeToggle onPress={() => setStartTimeShow(true)} value={startTimeValue} />
                        {startTimeShow && (<DateTimePicker mode="time" value={startTimeValue} onChange={onChangeStartTime} />)}
                    </TimeWrapper>

                    <TimeWrapper last={true}>
                        <InputLabel size={17}>Fim:</InputLabel>
                        <TimeToggle onPress={() => setEndTimeShow(true)} value={endTimeValue} />
                        {endTimeShow && (<DateTimePicker mode="time" value={endTimeValue} onChange={onChangeEndTime} />)}
                    </TimeWrapper>
                </TimeRow>
                
                <View style={{alignItems: 'center'}}>
                    <WeekdaysPicker selected={selectedDays} setSelected={setSelectedDays} />
                </View>

                <MaterialIcons.Button name="done" onPress={handleSubmit} size={30}>
                    Adicionar
                </MaterialIcons.Button>
            </FormBody>
            <Snackbar
                visible={snackBarShow}
                duration={5000}
                onDismiss={() => setSnackBarShow(false)}
            >
                {snackBarMessage}
            </Snackbar>
        </View>
    );
}