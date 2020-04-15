import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

import { BackButton } from './../../components';
import { 
    Input,
    InputLabel,
    Header,
    HeaderText,
    FormBody,
    DateTimeRow,
    DateWrapper,
    TimeWrapper,
    DateToggle,
    TimeToggle,
    WeekdaysPicker
} from './components';

export default function NewPlanPage({ navigator }) {
    const [dateValue, setDateValue] = useState(new Date());
    const [startTimeValue, setStartTimeValue] = useState(new Date());
    const [endTimeValue, setEndTimeValue] = useState(new Date());
    
    const [dateShow, setDateShow] = useState(false);
    const [startTimeShow, setStartTimeShow] = useState(false);
    const [endTimeShow, setEndTimeShow] = useState(false);

    const onChangeDate = (e, date) => { setDateShow(false); setDateValue(date) }
    const onChangeStartTime = (e, time) => { setStartTimeShow(false); setStartTimeValue(time) }
    const onChangeEndTime = (e, time) => { setEndTimeShow(false); setEndTimeValue(time) }

    const formatedDate = d => d.toLocaleDateString('pt-BR');
    const formatedTime = t => t.toLocaleTimeString('pt-BR').split(':').splice(0, 2).join(':');

    return (
        <View style={{marginTop:10}}>
            <BackButton navigator={navigator} backTo="list" />
            <Header>
                <HeaderText>Adicionar novo Plano</HeaderText>
            </Header>

            <FormBody>
                <InputLabel>Nome:</InputLabel>
                <Input />

                <DateTimeRow>
                    <DateWrapper>
                        <InputLabel size={17}>Data:</InputLabel>
                        <DateToggle onPress={() => setDateShow(true)} value={dateValue} />
                        {dateShow && (<DateTimePicker mode="date" value={dateValue} onChange={onChangeDate} />)}
                    </DateWrapper>

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
                </DateTimeRow>
                <View style={{alignItems: 'center'}}>
                    <WeekdaysPicker />
                </View>
            </FormBody>
        </View>
    );
}