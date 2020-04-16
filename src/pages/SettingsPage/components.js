import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
    margin: 10px 8px;
    elevation: 3;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const _CardButton = styled.View`
    background-color: #fff;
    border-radius: 2px;
    height: 150px;
    width: 150px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 5px;
    elevation: 3;
`;

export const CardButton = ({ action, icon, label }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={action}
        >
            <_CardButton>
                <MaterialIcons name={icon} size={30} />
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 16}}>
                    { label }
                </Text>
            </_CardButton>
        </TouchableOpacity>
    );
}