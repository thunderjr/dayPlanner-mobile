import axios from 'axios';

let date = new Date();
date.setDate(date.getDate() -1);

export const chartApi = axios.create({
    baseURL: `https://api.binance.com/api/v1/klines?interval=1h&startTime=${date.getTime()}`
});

export const priceApi = axios.create({
    baseURL: `https://api.binance.com/api/v3/ticker/24hr`
})