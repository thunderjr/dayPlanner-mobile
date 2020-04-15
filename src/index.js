import React, { useState, useEffect } from 'react';
import { Container, Header, HeaderText, HeaderSubText } from './components';
import Swiper from 'react-native-swiper';

import moment from 'moment';
import 'moment/locale/pt-br';

import api from './services/api';

import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';
import TradesPage from './pages/TradesPage';

export default function App() {
    const [todayData, setTodayData] = useState({});
    const [todayPlans, setTodayPlans] = useState([]);
    
    const [actualPage, setActualPage] = useState('list'); // on MainPage
    const [greetings, setGreetings] = useState([]);

    const getDate = () => {
        const horas = moment().format('HH');
        const greeting =
                horas < 12 && horas > 8
                    ? "dia"
                    : horas < 18 && horas > 8
                        ? "tarde"
                        : "noite";
        const data = moment().format('LLLL').split(' ').splice(0, 4)
        fullGreeting = [
            `${greeting == "dia" ? "Bom" : "Boa"} ${greeting}!`,
            `${data.join(' ')}`
        ];
        setGreetings(fullGreeting);
    }

    const getTodayData = async () => {
        try {
            const response = await api.get('/plans/today');
            setTodayData(response.data);
            setTodayPlans(response.data.plans);
        } catch(e) {}
    }

    useEffect(() => {
        getTodayData();
        getDate();
    }, [])

    return (<>
        <Container>
            <Header>
                <HeaderText>{ greetings[0] }</HeaderText>
                <HeaderSubText>{ greetings[1] }</HeaderSubText>
            </Header>

            <Swiper
                paginationStyle={{
                    position: 'absolute',
                    top: 0,
                    height: 0
                }}
                activeDotColor="#333"
                loop={false}
                index={1}
            >
                <SettingsPage />
                <MainPage todayPlans={todayPlans} getData={getTodayData} actualPage={actualPage} setActualPage={setActualPage} />
                <TradesPage />
            </Swiper>
        </Container>
    </>);
}