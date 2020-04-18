import React, { useState } from 'react';

import { Container, ListPage } from './components';
import PlanPage from './../PlanPage';
import NewPlanPage from './../NewPlanPage';

export default function MainPage({ todayPlans, getData, actualPage, navigator }) {
    return (
        <Container>            
            { (actualPage == 'list') ? <ListPage data={todayPlans} getData={getData} navigator={navigator} /> : [] }
            { (actualPage == 'newPlan') ? <NewPlanPage navigator={navigator} /> : [] }
            { (actualPage.indexOf('plan') == 0) ? <PlanPage data={todayPlans} planId={actualPage.split('-')[1]} navigator={navigator} /> : [] }
        </Container>
    )
};