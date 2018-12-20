import React, { Component } from 'react';
import styled from 'styled-components'
import QuestionDeleteFlag from './QuestionDeleteFlag';
import { deleteQuestion } from '../../../../store/actions/testCreator';
import {connect} from 'react-redux';

const DeleteQuestionButton = styled.button`
	position: absolute;
	right: 5px;
	top: -25px;
	color: rgba(230, 36, 22, 1);
	font-size: 24px;
	background-color: transparent;
	border: 0;	
`;

class DeleteQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {closeOver: false};
    }


    render() {
        return (
            <>
                {this.state.closeOver && <QuestionDeleteFlag count={this.props.count}/>}
                <DeleteQuestionButton 
                    type='button'
                    onMouseOver= {()=> this.setState({closeOver: true})}
                    onMouseOut= {()=> this.setState({closeOver: false})}
                    onClick= {() => this.props.deleteQuestion(this.props.id, this.props.score)}	
                > X  
                </DeleteQuestionButton>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
	return {
		deleteQuestion: (id, score) => dispatch(deleteQuestion(id, score))
	}
}

export default connect(null, mapDispatchToProps)(DeleteQuestion)