import React, { useState, useEffect, Suspense } from 'react';
import { View, Text, ActivityIndicator as _ActivityIndicator } from 'react-native';

import Intl from 'intl';
import 'intl/locale-data/jsonp/en-US.js';
import 'intl/locale-data/jsonp/pt-BR.js';

import { Container, TradeCard, CoinTitle, TCTitles, TCText, VariationText, ChartBox } from './components';
import Chart from './Chart';

import { priceApi } from './../../services/exchangeApi';

const ActivityIndicator = () => <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><_ActivityIndicator /></View>;

const formatBRL = i => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i).replace(/^(\D+)/, '$1 ');
const formatUSD = i => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i).replace(/^(\D+)/, '$1 ');

const svgDimensions = {
    height: 30,
    width: 3 // will be multiplied
};

const trades = [
    { coin: 'XRP', pair: 'XRPUSDT', startPrice: 0.27760, qtd: 49.4 },
    { coin: 'BCH', pair: 'BCHUSDT', startPrice: 405.00, qtd: 0.03393 },
    { coin: 'BCH', pair: 'BCHUSDT', startPrice: 172, qtd: 0.05161122 }
];

export default function TradesPage() {
    const [coinsData, setCoinsData] = useState([]);
    const [dollarPrice, setDollar] = useState([]);
    
    async function getDollar() {
        const response = await fetch("https://economia.awesomeapi.com.br/all/USD");
        const data = await response.json();
        setDollar(Number(data.USD.bid));
    }

    async function getCoinData(pair) {
        const response = await priceApi.get('', { params: { symbol: pair }});
        return response.data;
    }

    useEffect(() => {
        getDollar();
        
        const requests = [...new Set(trades.map(t => t.pair))].map(c => getCoinData(c));
        Promise.all(requests).then(data => { setCoinsData(data) });

        setInterval(() => {
            const requests = [...new Set(trades.map(t => t.pair))].map(c => getCoinData(c));
            Promise.all(requests).then(data => { setCoinsData(data) });
        }, 10000);
    }, []);

    return (
        <Container>
            { (coinsData.length === 0) ? 
                <ActivityIndicator /> : 
                trades.sort((a, b) => b.qtd - a.qtd).map((t, i) => {
                    const coinData = coinsData.filter(c => c.symbol == t.pair)[0];
                    return (
                        <TradeCard key={i}>
                            <View>
                                <CoinTitle>{ t.coin }</CoinTitle>
                                <TCText>$ { Number(coinData.lastPrice) }</TCText>
                                <VariationText isPositive={Number(coinData.priceChangePercent) > 0} style={{fontSize: 14}}>
                                    { Number(coinData.priceChangePercent).toFixed(2) } %
                                </VariationText>
                            </View>
                            <View>
                                <TCTitles>Na carteira</TCTitles>
                                <VariationText isPositive={(t.qtd * coinData.lastPrice) > (t.qtd * t.startPrice)}>
                                    { formatUSD(t.qtd * coinData.lastPrice) }
                                </VariationText>
                                <TCText style={{fontSize: 14}}>
                                    { formatBRL((t.qtd * coinData.lastPrice) * dollarPrice) }
                                </TCText>
                            </View>
                            <View>
                                <TCTitles>Lucro</TCTitles>
                                <VariationText isPositive={(t.qtd * coinData.lastPrice) > (t.qtd * t.startPrice)}>
                                    { formatUSD((t.qtd * coinData.lastPrice) - (t.qtd * t.startPrice)) }
                                </VariationText>
                                <VariationText isPositive={((((t.qtd * coinData.lastPrice) - (t.qtd * t.startPrice)) / (t.qtd * t.startPrice)) * 100) > 0} style={{fontSize: 14}}>
                                    {((((t.qtd * coinData.lastPrice) - (t.qtd * t.startPrice)) / (t.qtd * t.startPrice)) * 100).toFixed(2)} %
                                </VariationText>
                            </View>
                            <ChartBox dimensions={svgDimensions}>
                                <Chart
                                    pair={t.pair}
                                    dimensions={svgDimensions}
                                />
                            </ChartBox>
                        </TradeCard>
                    );
                })
            }
        </Container>
    );
};