import React, { useState, useEffect, Fragment } from 'react';

import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';

import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: #FFF;
    border-radius: 2px;
    padding: 10px;
    margin: 10px 8px;
    elevation: 3;
`;

const Separator = styled.View`
    border-bottom-width: 0.7px;
    border-bottom-color: #3F3F3F44;
`;

const PlanTitle = styled.Text`
    font-size: 25px;
`;

const PlanTime = styled.View`
    flex-direction: row;
`;

const PlanTimeText = styled.Text`
    margin-left: 5px;
    line-height: 23px;
`;

const PlanTile = styled.TouchableOpacity`
    padding: 12px 8px;
`;

const ActionTile = styled.TouchableOpacity`
    padding: 10px 8px;    
    align-items: center;
    flex-direction: row;
`;

const ActionText = styled.Text`
    font-size: 20px;
    margin-left: 10px;
`;

const renderPlans = ({ item }) => {
    return(<>
        <PlanTile activeOpacity={0.5} onPress={() => {}}>
            <>
                <PlanTitle>{ item.nome }</PlanTitle>
                <PlanTime>
                    <MaterialIcons name="watch-later" size={20} color="#050505" />
                    <PlanTimeText>
                        { item.startHora }{ (item.endHora !== null) ? ` - ${item.endHora}` : `` }
                    </PlanTimeText>
                </PlanTime>
            </>
        </PlanTile>
        <Separator />
    </>);
}

export const ListPage = ({ data, getData, navigator }) => {
    useEffect(() => { getData() }, []);
    return (
        <View style={{flex:1}}>
            <FlatList 
                data={data}
                renderItem={renderPlans}
                keyExtractor={item => `plan-${item.id}`}
            />
            
            <Separator />
            
            <ActionTile onPress={() => navigator('newPlan')}>
                <MaterialIcons name="add" size={30} />
                <ActionText>
                    Adicionar novo plano...
                </ActionText>
            </ActionTile>

            <ActionTile onPress={getData}>
                <MaterialIcons name="update" size={30} />
                <ActionText>
                    Atualizar Dados...
                </ActionText>
            </ActionTile>
        </View>
    );
}