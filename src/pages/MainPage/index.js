import React, { useState } from 'react';

import { Container, ListPage } from './components';
import NewPlanPage from './../NewPlanPage';

export default function MainPage({ todayPlans, getData, actualPage, setActualPage }) {
    return (
        <Container>            
            { (actualPage == 'list') ? <ListPage data={todayPlans} getData={getData} navigator={setActualPage} /> : [] }
            { (actualPage == 'newPlan') ? <NewPlanPage navigator={setActualPage} /> : [] }
        </Container>
    )
};