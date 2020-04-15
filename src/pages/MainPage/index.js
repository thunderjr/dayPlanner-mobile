import React, { useState, useEffect } from 'react';

import api from './../../services/api';
import { Container, ListPage } from './components';
import NewPlanPage from './../NewPlanPage';

export default function MainPage() {
    const [todayData, setTodayData] = useState({});
    const [todayPlans, setTodayPlans] = useState([]);
    
    const [actualPage, setActualPage] = useState('list');
    
    async function getTodayData() {
        try {
            const response = await api.get('/plans/today');
            setTodayData(response.data);
            setTodayPlans(response.data.plans);
        } catch(e) {}
    }
 
    return (
        <Container>            
            { (actualPage == 'list') ? <ListPage data={todayPlans} getData={getTodayData} navigator={setActualPage} /> : [] }
            { (actualPage == 'newPlan') ? <NewPlanPage navigator={setActualPage} /> : [] }
        </Container>
    )
};