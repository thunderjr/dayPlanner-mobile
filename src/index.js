import React, { useState, useEffect } from 'react';
import { Container, Header } from './components';
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

    const [pages, setPages] = useState({
        main: 'list', // plans
        settings: 'main'
    }); // on cards
    const navigator = (tab, page) => setPages({ ...pages, [tab]: page });
    
    const [swiperIndex, setSwiperIndex] = useState(1);
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
        } catch(e) {
            console.warn("Não foi possível adquirir os dados da API!");
        }
    }

    const settingsActions = {
        updateApiData: getTodayData,
    }

    useEffect(() => {
        getTodayData();
        getDate();
    }, [])

    return (<>
        <Container>
            <Header swiperIndex={swiperIndex} pages={pages} greetings={greetings} navigator={navigator} data={todayData} />
            <Swiper
                paginationStyle={{
                    position: 'absolute',
                    top: 0,
                    height: 0
                }}
                activeDotColor="#333"
                loop={false}
                index={1}
                onIndexChanged={i => setSwiperIndex(i)}
            >
                <SettingsPage actualPage={pages.settings} navigator={page => navigator('settings', page)} actions={settingsActions} />
                <MainPage todayPlans={todayPlans} getData={getTodayData} actualPage={pages.main} navigator={page => navigator('main', page)} />
                <TradesPage />
            </Swiper>
        </Container>
    </>);
}