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

const HeaderBox = styled.View`
    padding: 10px;
    justify-content: center;
    height: 100px;
`;

const HeaderText = styled.Text`
    font-size: 32px;
    line-height: 40px;
`;

const HeaderSubText = styled.Text`
    font-size: 26px;
    line-height: 40px;
`;

export const Header = ({ swiperIndex, pages, greetings, data, navigator }) => {
    // default
    let content = (
        <HeaderBox style={{ paddingLeft: 20 }}>
            <HeaderText>{ greetings[0] }</HeaderText>
            <HeaderSubText>{ greetings[1] }</HeaderSubText>
        </HeaderBox>
    );

    // main
    if (swiperIndex == 1 && pages.main == 'newPlan') {
        content = (
            <HeaderBox>
                <HeaderText>Adicionar Novo Plano</HeaderText>
            </HeaderBox>
        );
    } else if (swiperIndex == 1 && pages.main.indexOf('plan') == 0) {
        try {
            const planName = data.plans.filter(p => p.id == pages.main.split('-')[1])[0].nome;
            content = (
                <HeaderBox>
                    <HeaderText>{ planName }</HeaderText>
                </HeaderBox>
            );
        } catch (e) {
            navigator('main', 'list');
        }
    // settings
    } else if (swiperIndex == 0 && pages.settings == 'main') {
        content = (
            <HeaderBox>
                <HeaderText>Configurações e Atalhos</HeaderText>
            </HeaderBox>
        );
    // trades
    } else if (swiperIndex == 2) {
        content = (
            <HeaderBox style={{ paddingLeft: 20 }}>
                <HeaderText>Portifólio</HeaderText>
                <HeaderSubText>Criptomoedas</HeaderSubText>
            </HeaderBox>
        );
    }

    return content;
}