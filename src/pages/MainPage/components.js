import React, { useState, useEffect, Fragment } from 'react';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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

const Actions = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 5px;
`;

const ActionPill = styled.View`
    background-color: ${props => (props.active) ? '#1A649C': '#EEE' };
    flex-direction: row;
    border-radius: 50;
    padding-vertical: 8px;
    padding-horizontal: 10px;
    margin-horizontal: 2px;
    align-items: center;
    justify-content: center;
`;

const ActionText = styled.Text`
    margin-left: 2px;
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

            <Actions>
                <TouchableOpacity onPress={() => navigator('newPlan')}>
                    <ActionPill>
                        <MaterialIcons name="add" size={20} />
                        <ActionText>
                            Adicionar novo plano
                        </ActionText>
                    </ActionPill>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigator('newPlan')}>
                    <ActionPill>
                        <MaterialIcons name="add" size={20} />
                        <ActionText>
                            Adicionar nova tarefa
                        </ActionText>
                    </ActionPill>
                </TouchableOpacity>
            </Actions>
        </View>
    );
}