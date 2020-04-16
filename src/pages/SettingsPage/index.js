import React from 'react';
import { Text } from 'react-native';

import { Container, CardButton } from './components';

export default function SettingsPage({ navigator, actualPage, actions }) {
    return (
        <Container>
            <CardButton action={actions['updateApiData']} icon="update" label={"Atualizar planos\ne tarefas"} />
            <CardButton action={actions['updateApiData']} icon="update" label={"Atualizar planos\ne tarefas"} />
        </Container>
    )
};