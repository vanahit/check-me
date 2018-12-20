
import {Link} from "react-router-dom";
import styled from 'styled-components';
import React from 'react';

const RouterLink = styled.span`
	color: #4F9DA6;
	text-decoration: underline;
`;
const TextDiv = styled.div`
    margin: 100px 0;
	font-size: 32px;
`;
export default function SuccessText (props) {
    return (
        <TextDiv>
            Test created successfully.{' '} 
            <Link to='/tests'> 
                <RouterLink >See All Tests. </RouterLink> 
            </Link>
        </TextDiv>
        
	)
}
