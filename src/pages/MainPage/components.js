import React, { useState, Fragment } from 'react';

import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { MaterialIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';

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

const TodoTile = styled.View`
    flex-direction: row;
    padding-left: 12px;
    margin-bottom: 12px;
`;

const TodoText = styled.Text`
    margin-left: 5px;
    line-height: 18px;
`;

const PlanTile = styled.TouchableOpacity`
    padding: 12px 8px;
`;

const PlanTileWithTodos = ({ item }) => {
    // the collapsed prop of Collapsible is inverted
    const [collapse, handleCollapse] = useState(!false);
    return (<>
        <PlanTile activeOpacity={0.5} onPress={() => { handleCollapse(!collapse) }}>
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
        <Collapsible collapsed={collapse} duration={200}>
            {
                item.todos.map((t, i) => (
                    <Fragment key={t.id}>
                        <TodoTile>
                            <MaterialIcons name="brightness-1" size={18} />
                            <TodoText>
                                { t.nome }{"\n"}
                                { t.descricao }
                            </TodoText>
                        </TodoTile>
                    </Fragment>
                ))
            }
        </Collapsible>
        <Separator />
    </>);
};

const PlanTileWithoutTodos = ({ item }) => (<>
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

const _NewPlanTile = styled.TouchableOpacity`
    padding: 20px 8px;    
    align-items: center;
    flex-direction: row;
`;

const NewPlanTile = ({ onPress }) => (
    <_NewPlanTile onPress={onPress}>
        <MaterialIcons name="add" size={30} />
        <Text style={{fontSize: 20, marginLeft: 10}}>Adicionar novo plano...</Text>
    </_NewPlanTile>
);

const FixedPlans = ({ data, navigator }) => {
    return (<>
    <View style={{flex: 1}}>
        {
            data.map(item => {
                if (item.todos.length > 0) {
                    return <PlanTileWithTodos key={item.id} item={item} />
                } else {
                    return <PlanTileWithoutTodos key={item.id} item={item} />
                }
            })
        }
        <NewPlanTile onPress={() => navigator('newPlan')} />
    </View>
</>)};

export const ListPage = ({ data, getData, navigator }) => (<>
    <FixedPlans data={data} navigator={navigator} />        
    <MaterialIcons.Button name="update" onPress={getData}>
        Get API Data
    </MaterialIcons.Button>
</>);