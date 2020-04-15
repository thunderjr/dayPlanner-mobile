import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Header = styled.View`
    align-items: center;
`;

export const HeaderText = styled.Text`
    font-size: 30px;
    letter-spacing: -1.5px;
    margin-top: -9px;
`;

export const FormBody = styled.View`
    margin-top: 20px;
    padding-horizontal: 10px;
`;

export const InputLabel = styled.Text`
    font-size: ${props => props.size || 18}px;
    letter-spacing: -1.45px;
`;

export const Input = styled.TextInput`
    width: ${props => (props.width - 1 || 100)}%;
    height: 30px;
    font-size: 20px;
    border-bottom-width: 2px;
    border-bottom-color: #333;
    padding-horizontal: 1px;
    margin-top: 5px;
    margin-bottom: 20px;
    letter-spacing: -1.45px;
`;

// date and time picker wrappers
export const DateTimeRow = styled.View`
    flex-direction: row;
    margin-top: 15px;
`;

export const DateWrapper = styled.View`
    flex: 2;
    margin-right: 10px;
`;

export const TimeWrapper = styled.View`
    flex: 1;
    ${props => (props.last) ? '' : 'margin-right: 10px;' }
`;

// date toggle
const _DateToggle = styled.TouchableOpacity`
    border-bottom-width: 2px;
    border-bottom-color: #333;
    margin-top: 5px;
    margin-bottom: 20px;
    letter-spacing: -1.45px;
`;

const DateValue = styled.Text`
    font-size: 20px;
    padding-right: 5px;
    text-align: center;
`;

export const DateToggle = ({ onPress, value }) => {
    return (
        <_DateToggle onPress={onPress}>
            <DateValue>{ value.toLocaleDateString('pt-BR') }</DateValue>
        </_DateToggle>
    );
}

// time toggle
const _TimeToggle = styled.TouchableOpacity`
    border-bottom-width: 2px;
    border-bottom-color: #333;
    margin-top: 5px;
    margin-bottom: 20px;
    letter-spacing: -1.45px;
`;

const TimeValue = styled.Text`
    font-size: 20px;
    padding-right: 5px;
    
    text-align: center;
`;

export const TimeToggle = ({ onPress, value }) => {
    let time = value.toLocaleTimeString('pt-BR').split(':');
    time.splice(2);
    time = time.join(':');

    return (
        <_TimeToggle onPress={onPress}>
            <TimeValue>{ time }</TimeValue>
        </_TimeToggle>
    );
}

// weekdays picker
const _DayCircle = styled.View`
    width: 35px;
    height: 35px;
    border-radius: 50;
    margin: 2px;
    background-color: ${props => (props.active) ? '#1A649C': '#EEE' };
    align-items: center;
    justify-content: center;
`;

const DayCircle = ({ day, letter, selected, setSelected }) => {
    const handleClick = () => {
        if (selected.includes(day)) {
            setSelected(selected.filter(x => x !== day));
        } else {
            setSelected([...selected, day]);
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={handleClick}>
            <_DayCircle active={selected.includes(day)}>
                <Text style={{ color: (selected.includes(day)) ? 'white' : 'black', fontSize: 17 }}>
                    { letter }
                </Text>
            </_DayCircle>
        </TouchableOpacity>
    );
}

export const WeekdaysPicker = () => {
    const [selected, setSelected] = useState(['Mon','Tue','Wed','Thu','Fri']);
    const days = [
        { name: 'Mon', letter: 'S' },
        { name: 'Tue', letter: 'T' },
        { name: 'Wed', letter: 'Q' },
        { name: 'Thu', letter: 'Q' },
        { name: 'Fri', letter: 'S' },
        { name: 'Sat', letter: 'S' },
        { name: 'Sun', letter: 'D' },
    ];

    return (
        <View style={{flexDirection: 'row'}}>
            { days.map(day => (
                <DayCircle
                    day={day.name}
                    letter={day.letter}
                    selected={selected}
                    setSelected={setSelected}
                />
            )) }
        </View>
    );
}