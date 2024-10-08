import Card from 'antd/es/card/Card';
import styled from 'styled-components';

export const WrapperStyles = styled(Card)`
    width: 100%;
    height: 330px;
    .ant-card-body {
        padding: 24px;
        border-radius: 0 0 8px 8px;
        background-color: white;
    }
`;

export const Styles = styled.div`
    color: var(--Alias-Primary---On-Theme, #27272a);
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    margin: 0px;
    word-break: break-word;
    text-align: center;
`;
export const Rate = styled.div`
    display: flex;
    font-size: 11px;
    align-items: center;
    text-align: center;
    background: pink;
`;
export const Price = styled.div`
    display: flex;
    justify-content: center;
    text-align: left;
    font-size: 16px;
    line-height: 150%;
    font-weight: 600;
    color: rgb(255, 66, 78);
`;
export const PriceDiscount = styled.div`
    display: flex;
    padding: 0px 4px;
    align-items: flex-start;
    border-radius: 8px;
    background: var(--Alias-Theme-Variant, #f5f5fa);
    color: var(--Alias-Primary---On-Theme, #27272a);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`;
