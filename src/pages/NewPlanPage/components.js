import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import moment from 'moment';
import 'moment/locale/pt-br';

export const Header = styled.View`
    align-items: center;
`;

export const HeaderText = styled.Text`
    font-size: 30px;
    letter-spacing: -1.5px;
    margin-top: -9px;
`;

export const FormBody = styled.View`
    flex: 1;
    margin-top: 20px;
    padding-horizontal: 10px;
`;

export const InputLabel = styled.Text`
    font-size: 19px;
    letter-spacing: -1.45px;
`;

export const Input = styled.TextInput`
    width: 100%;
    height: 30px;
    font-size: 20px;
    border-bottom-width: 1.3px;
    border-bottom-color: #333;
    padding-horizontal: 1px;
    margin-top: 5px;
    margin-bottom: 20px;
    letter-spacing: -1.45px;
`;

// switch end time
export const SwitchGroup = styled.View`
    margin-bottom: 40px;
    flex-direction: row;
`;

export const SwitchText = styled.Text`
    margin-top: 2px;
    font-size: 17px;
`;

// time picker wrapper
export const TimeRow = styled.View`
    flex-direction: row;
    margin-vertical: 15px;
`;

export const TimeWrapper = styled.View`
    flex: 1;
    ${props => (props.last) ? 'margin-left: 10px;' : '' }
`;

export const ActionButton = styled.TouchableOpacity`
    background-color: #333;    
    ${props => (props.outline) 
        ? `background-color: white
           border-width: 2px;
           border-color: #333;`
        : ''
    }
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    flex-direction: row;
    padding: 10px;
    width: 45%;
`;

export const ActionButtonText = styled.Text`
    color: ${props => (props.color) ? props.color : 'white'};
    font-size: 20px;
    margin-left: 10px;
`;

// time toggle/value
const _TimeToggle = styled.TouchableOpacity`
    border-bottom-width: 1.3px;
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

// weekdays picker
const _DayCircle = styled.View`
    width: 35px;
    height: 35px;
    border-radius: 50px;
    margin: 2px;
    background-color: ${props => (props.active) ? '#333': '#EEE' };
    align-items: center;
    justify-content: center;
`;

const _ShortcutPill = styled.View`
    border-radius: 50px;
    padding-vertical: 8px;
    padding-horizontal: 15px;
    margin: 2px;
    background-color: ${props => (props.active) ? '#333': '#EEE' };
    align-items: center;
    justify-content: center;
`;

export const TimeToggle = ({ onPress, value }) => (
    <_TimeToggle onPress={onPress}>
        <TimeValue>{ moment(value).format('LT') }</TimeValue>
    </_TimeToggle>
);

const WeekdayShortcut = ({ type, selected, setSelected }) => {
    // workdays or weekend
    const active = (type == 'workdays') 
                        ? selected.includes('Mon') && selected.includes('Tue') && selected.includes('Wed') && selected.includes('Thu') && selected.includes('Fri') && !selected.includes('Sat') && !selected.includes('Sun')
                        : !selected.includes('Mon') && !selected.includes('Tue') && !selected.includes('Wed') && !selected.includes('Thu') && !selected.includes('Fri') && selected.includes('Sat') && selected.includes('Sun');

    const handleClick = () => setSelected((type == 'workdays') ? ['Mon','Tue','Wed','Thu','Fri'] : ['Sat','Sun']);
    return (
        <TouchableOpacity onPress={handleClick}>
            <_ShortcutPill active={active}>
                <Text style={{ color: (active) ? 'white' : '#333', fontSize: 17 }}>
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
            <View style={{flexDirection: 'row', marginTop: 5}}>
                <WeekdayShortcut type='workdays' selected={selected} setSelected={setSelected} />
                <WeekdayShortcut type='weekend' selected={selected} setSelected={setSelected} />
            </View>
        </>
    );
}