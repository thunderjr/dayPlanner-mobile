import React from 'react';
import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    padding: 10px;
    padding-top: ${Constants.statusBarHeight + 10}px;
    background-color: #F6F6F6;
`;

// background-color: #fff;
//     border-radius: 2px;
//     elevation: 3;

export const Header = styled.View`
    padding: 10px;
    margin-bottom: 10px;
`;

export const HeaderText = styled.Text`
    font-size: 32px;
    line-height: 40px;
`;

export const HeaderSubText = styled.Text`
    font-size: 26px;
    line-height: 40px;
`;

export const BackButton = ({ navigator, backTo }) => (
    <TouchableOpacity onPress={() => navigator(backTo)} style={{position: 'absolute', top: -10, left: -8}}>
        <MaterialIcons name="navigate-before" size={35} />
    </TouchableOpacity>
);