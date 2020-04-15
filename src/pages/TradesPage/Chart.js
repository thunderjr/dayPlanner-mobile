import React, {  useState, useEffect } from 'react';
import { View } from 'react-native';
import { Svg, Polyline } from 'react-native-svg';

import { chartApi } from './../../services/exchangeApi';

export default Chart = ({ pair, dimensions, position }) => {
    const [chartData, setChartData] = useState('');
    
    function getPriceDataInSvgPoints(pair) {
        chartApi.get("", { params: { symbol: pair } }).then(response => {                
            const data = response.data.map(hourData => Number(hourData[1]));

            const max = Math.max(...data);
            const min = Math.min(...data);
            const formatedData = data.map(p => {
                return (isNaN(p - min) / (min - max)) ? 0 : Math.abs(Math.abs(((p - min) / (min - max)) * dimensions.height + 10) - dimensions.height + 5);
            });

            const points = formatedData.map((p, i) => `${i * dimensions.width},${p}`).join(' ');
            setChartData(points);
        })
    }

    useEffect(() => {
        getPriceDataInSvgPoints(pair)
    });

    return (<Svg 
            height={dimensions.height}
            width={(24 * (dimensions.width * 10)) || 10}
        >
            <Polyline
                points={chartData}
                fill="none"
                stroke="#074d05"
                strokeLinecap='round'
                strokeWidth="2.5"
            />
        </Svg>);
}