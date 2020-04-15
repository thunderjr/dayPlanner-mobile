import React from 'react';
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

// time picker wrapper
export const TimeRow = styled.View`
    flex-direction: row;
    margin-vertical: 15px;
`;

export const TimeWrapper = styled.View`
    flex: 1;
    ${props => (props.last) ? '' : 'margin-right: 10px;' }
`;

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

const _ShortcutPill = styled.View`
    border-radius: 50;
    padding-vertical: 8px;
    padding-horizontal: 15px;
    margin: 2px;
    background-color: ${props => (props.active) ? '#1A649C': '#EEE' };
    align-items: center;
    justify-content: center;
`;

const WeekdayShortcut = ({ type, selected, setSelected }) => {
    let active;
    if (type == 'workdays') {
        active = selected.includes('Mon') && selected.includes('Tue') && selected.includes('Wed') && selected.includes('Thu') && selected.includes('Fri') && !selected.includes('Sat') && !selected.includes('Sun');
    } else if (type == 'weekend') {
        active = !selected.includes('Mon') && !selected.includes('Tue') && !selected.includes('Wed') && !selected.includes('Thu') && !selected.includes('Fri') && selected.includes('Sat') && selected.includes('Sun');
    }

    const handleClick = () => {
        if (type == 'workdays') {
            setSelected(['Mon','Tue','Wed','Thu','Fri']);
        } else if (type == 'weekend') {
            setSelected(['Sat','Sun']);
        }
    }

    return (
        <TouchableOpacity onPress={handleClick}>
            <_ShortcutPill active={active}>
                <Text style={{ color: (active) ? 'white' : 'black', fontSize: 17 }}>
                    { (type == 'workdays') ? 'Dias da Semana' : 'Fim de Semana' }
                </Text>
            </_ShortcutPill>
        </TouchableOpacity>
    );
}

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

export const WeekdaysPicker = ({ selected, setSelected }) => {
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
        <>
            <View style={{flexDirection: 'row'}}>
                { days.map(day => (
                    <DayCircle
                        key={day.name}
                        day={day.name}
                        letter={day.letter}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )) }
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <WeekdayShortcut type='workdays' selected={selected} setSelected={setSelected} />
                <WeekdayShortcut type='weekend' selected={selected} setSelected={setSelected} />
            </View>
        </>
    );
}