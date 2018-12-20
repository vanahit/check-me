import React from 'react';
import styled from 'styled-components'
import VideoCreator from './VideoCreator';
import testPassVideo from '../../../videos/testPassVideo.mp4';

const FlexRow = styled.div`
    display: flex;
    margin: 19px auto;
    max-width: 1200px;
    flex-direction: row;
    justify-content: ${props => props.content || 'space-between'};  ;
	flex-wrap: wrap;
    box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
        min-width: 100%;
    }
`;

const FlexChild = styled.div`
	position: relative;
    width: ${props => props.width || ''};
    height: ${props => props.height || ''};    
    box-sizing: border-box; 
    
	@media screen and (max-width: 1190px) {
		margin: 20px 5px;
        max-width: 98%;
        min-width: 98%
	}
`;

const Title = styled.div`
    width: 100%;
    margin-top: 76px;
    margin-bottom: 30px;
    font-size: ${props => props.size || '34px'};  
    font-weight: bold;
    color:rgba(79, 157, 166, 1);
    border-bottom: 1px solid rgba(220, 220, 220, 1);
`;


const Description = styled.div`
    font-size: 20px;
    color: #100529;
`;

export default function ForOurUser () {
    return (
        <FlexRow>
            <Title>
                FOR OUR USERS
            </Title>
            <FlexChild width={'48%'}>
                <Description>
                    Our main goal is cooperation, which we founded between our users and companies .We give opportunity to our 
                    users to make achievements by completing tests which created by our companies . It is important for us to 
                    create reliable collaboration. The best achievement will be for our users , to receive invitation from leading companies. 
                    For our companies the best achievement will be invitation the best users to their company.<br /> 
                    <b>DESTINATION WAS ACHIEVES.</b>
                </Description>
            </FlexChild>
            <FlexChild width={'48%'}>
                <VideoCreator video={testPassVideo} />
            </FlexChild>
        </FlexRow>
    );
}
