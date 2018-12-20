import React, {Component} from 'react';
import styled from 'styled-components'
import checkSvg from '../../../images/buttonIcons/check-box.svg';

const CheckBoxDiv = styled.div`
    position: relative;
    margin: 16px 16px;
`;
const CheckBoxInput = styled.input`
    display: inline-block;
    margin-right: 16px;
    width: 24px; 
    height: 24px;
    
    :before {
        content: '';
        display: inline-block;
        background: #FFAD5A;
        padding: 4px;
        width: 24px; 
        height: 24px;
        text-align: center;
        color: white;
    }
    :checked:after {
        position: absolute;
        display: block;
        top:0;
        padding: 4px;
        content: '';
        background-image:url(${checkSvg});
        background-position: center; 
        background-repeat: no-repeat; 
        background-size: 24px;
        height: 24px;
        width: 24px;
    }
     
`;

const CheckBoxLabel = styled.label`
    color: white;
    font-size: 24px;
`;

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {checked: true};
        
    }
    render() {
       return (
		<CheckBoxDiv>
            <CheckBoxInput type='checkbox' defaultChecked={this.state.checked} onClick={()=> {this.setState({checked: !this.state.checked})}}/>
            <CheckBoxLabel>
                {this.props.children}
            </CheckBoxLabel>
        </CheckBoxDiv> 
        ); 
    }
}


