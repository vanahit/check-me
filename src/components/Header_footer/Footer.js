import React from 'react';
import ContuctUsSvg from './ContactUsSvg';
import SupportSvg from './SupportSvg';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";
import androidSvg from '../../images/buttonIcons/androidIos.svg';
import socialIcons from '../../images/buttonIcons/footerIcons.svg';

const FlexRow = styled.div`
    display: flex;
    max-width: 1200px;
    margin: auto;
    align-items: flex-start;
    flex-direction: ${props => props.dir || 'row'};
    justify-content: ${props => props.content || 'space-between'}; 
    flex-wrap: wrap;
    box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
        min-width: 100%;
        text-align: center;
    }
`;

const EmailDiv = styled.div`
    width: 100%;
    min-height: 100px;
    background-color: #141218;
    padding: 25px 0;

    @media screen and (max-width: 1190px) {
        padding: 25px 10px;
 
    }
`;

const Subscribe = styled.span`
    font-size: 34px;
    color: white;
`;

const EmailInput = styled.input`
    vertical-align: middle;
    width: 90%;
    height: 44px;
    padding-left: 16px;
    border: 1px solid #FF5959;
    font-size: 24px;
    @media screen and (max-width: 350px) {
		max-width: 80%;
    }
`;
const EmailButton = styled.button`
    display: inline-block;
    width: 44px;
    height: 44px;
    vertical-align: middle;
    background-color: #FF5959;
    border: 1px solid #FF5959;
    color: white;
    font-size: 36px;
`;

const FooterMiddle = styled.div`
    max-width: 1200px;
    min-height: 116px;
    margin: 34px auto;
    box-sizing: border-box;
    
`;
const FooterTitleDiv = styled.div`
    color: #201C16;
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    stroke: #201c16;
    border-bottom: 1px solid #E3E3E3;
    :hover {
        color: #FFAD5A;
        fill: #FFAD5A;
        stroke: #FFAD5A;
    }
`;
const IconSize = styled.span`
    display: inline-block;
    vertical-align: middle;
`;

const LinkSpan = styled(NavLink) `
    display: block;
    color: #201C16;
    text-decoration: underline;
    font-size: 14px;
`;
const FlexChild = styled.div`
    font-size: 14px;
    position: relative;
    box-sizing: border-box;
    margin: 5px 0;
    width: ${props => props.width || ''};   
    @media screen and (max-width: 1190px) {
        margin: 10px 5px;
        min-width: 98%;
        max-width: 98%;
    }
`;
const CheckMe = styled.span`
    padding: 2px;
    width: 24px;
    height: 24px;
    background-color:#FF5959;
    border-radius: 4px;
    font-size: 17px;
    color: white;
`;

const AndroidImg = styled.img`
    width: 170px;
    height: 116px;

`;

const SocialIcons = styled.img`
    width: 216px;

`;
const SocialIconsDIv = styled.div`
    width: 100%;
    margin: 80px auto;
    text-align: center;
    border-top: 1px solid #E3E3E3;
    padding-top: 40px;
`;

const Footer = () => {
    return (
        <footer className='footer'>
            <EmailDiv>
            <FlexRow>
                <Subscribe>SUBSCRIBE & GET <span style={{color: '#FFAD5A'}}>NEWS</span></Subscribe>
                <FlexChild width='444px'><div><EmailInput type="email" placeholder='EMAIL' />< EmailButton>></ EmailButton></div></FlexChild>
            </FlexRow>
            </EmailDiv>
            <FooterMiddle>
                <FlexRow>
                    <FlexChild  width={'186px'}>
                        <FlexRow>
                            <FooterTitleDiv>
                                <IconSize><ContuctUsSvg /></IconSize> CONTACT US
                            </FooterTitleDiv>
                            <FlexChild width={'100%'}>Erevan, Kilikia, sisvan str. 59 </FlexChild>
                            <FlexChild width={'100%'}>+ 374 (94) 444444 </FlexChild>
                            <FlexChild width={'100%'}>info@checkme.com</FlexChild>
                        </FlexRow>
                    </FlexChild>
                    <FlexChild width={'246px'}>
                        <FlexRow >
                            <FooterTitleDiv>
                                <IconSize><SupportSvg /></IconSize> SUPPORT
                            </FooterTitleDiv>
                            <FlexChild><LinkSpan to=''>Customer Service </LinkSpan></FlexChild>
                            <FlexChild><LinkSpan to=''> Privacy Policy </LinkSpan></FlexChild>
                            <FlexChild width={'100%'}><LinkSpan to=''>Contact Us </LinkSpan></FlexChild>
                        </FlexRow>
                    </FlexChild>
                    <FlexChild width={'214px'}>
                        <FlexRow >
                            <FooterTitleDiv>
                               <CheckMe>CM</CheckMe> ABOUT CHECK ME
                            </FooterTitleDiv>
                            <FlexChild width={'50%'}><LinkSpan to=''>Company </LinkSpan></FlexChild>
                            <FlexChild width={'50%'}><LinkSpan to=''>Partners </LinkSpan></FlexChild>
                            <FlexChild width={'50%'}><LinkSpan to=''>About Us </LinkSpan></FlexChild>
                            <FlexChild width={'50%'}><LinkSpan to=''>Mobile Apps </LinkSpan></FlexChild>
                        </FlexRow>
                    </FlexChild>
                    <FlexChild >
                        <AndroidImg src={androidSvg} />
                    </FlexChild>
                </FlexRow>
            </FooterMiddle>
            <SocialIconsDIv>
                <SocialIcons src={socialIcons}/>
            </SocialIconsDIv>
        </footer>
    );
};

export default Footer;