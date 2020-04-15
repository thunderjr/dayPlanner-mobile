import React, { useState, useEffect } from 'react';
import { Container, Header, HeaderText, HeaderSubText} from './components';
import Swiper from 'react-native-swiper';

import moment from 'moment';
import 'moment/locale/pt-br';

import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';
import TradesPage from './pages/TradesPage';

export default function App() {
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

    useEffect(() => {
        getDate();
    }, [])

    return (<>
        <Container>
            <Header>
                <HeaderText>{ greetings[0] }</HeaderText>
                <HeaderSubText>{ greetings[1] }</HeaderSubText>
            </Header>

            <Swiper
                // dot={<></>}
                // activeDot={<></>}
                paginationStyle={{
                    position: 'absolute',
                    top: 0,
                    height: 0
                }}
                activeDotColor="#333"
                loop={false}
            >
                <Swiper 
                    dot={<></>}
                    activeDot={<></>}
                    loop={false}
                    horizontal={false}
                    loadMinimal={true}
                >
                    <MainPage />
                    <SettingsPage />
                </Swiper>
                <TradesPage />
            </Swiper>
        </Container>
    </>);
}