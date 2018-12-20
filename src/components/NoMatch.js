import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    padding-top: 100px;
    display: flex;
    align-items: center;
    text-align: center;
    height: 850px;
    width: 100%;
    background-color: rgba(20, 18, 24, 0.9);
    box-sizing: border-box;

`;
const Text = styled.div`
    margin: auto;
    width: 1200px;
    font-size: 48px;
    color: rgba(255, 89, 89, 1);
`;

const NoMatch = () => {
    return (
        <Main >
           <Text>
               Sorry, page not found!
            </Text>
        </Main>
    )
};

export default NoMatch;