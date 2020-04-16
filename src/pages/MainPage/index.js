import React, { useState } from 'react';

import { Container, ListPage } from './components';
import NewPlanPage from './../NewPlanPage';

export default function MainPage({ todayPlans, getData, actualPage, navigator }) {
    return (
        <Container>            
            { (actualPage == 'list') ? <ListPage data={todayPlans} getData={getData} navigator={navigator} /> : [] }
            { (actualPage == 'newPlan') ? <NewPlanPage navigator={navigator} /> : [] }
        </Container>
    )
};