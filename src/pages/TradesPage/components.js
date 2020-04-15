import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #FFF;
    border-radius: 2px;
    padding: 10px;
    margin: 10px 8px;
    elevation: 3;
`;

export const TradeCard = styled.View`
    padding: 15px 20px;
    margin-bottom: 5px;
    border: 0.5px solid #33333355;
    border-radius: 2px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const CoinTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

export const TCTitles = styled.Text`
    font-size: 14px;
    line-height: 14px;
`;

export const TCText = styled.Text`
    font-size: 16px;
    line-height: 18px;
`;

export const VariationText = styled(TCText)`
    color: ${props => (props.isPositive) ? 'green' : 'red'};
    
`;

export const ChartBox = styled.View`
    width: ${props => (props.dimensions.width * 24) - 10}px;
`;