import React from 'react';
import Header from "../Header_footer/Header";
import Footer from "../Header_footer/Footer";
import styled from 'styled-components';

const Main = styled.div`
    min-height: 850px;
    @media screen and (max-width: 850px) {
        margin-top: 187px;
    }
    box-sizing: border-box;
`;

const Layout = (props) => {
    return (
        <div>
            <Header currentLog={props.currentLog} user={props.user}/>
             <Main>
                {props.children}
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;