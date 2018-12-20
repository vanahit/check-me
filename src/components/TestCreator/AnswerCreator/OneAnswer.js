import React from 'react';
import styled, {css} from 'styled-components'
import {connect} from 'react-redux';
import { answerValid, answerNotValid } from '../../../store/actions/testCreator';

const AnswerInput = styled.textarea`
  width: calc(100% - 96px);
  height: 60px;
  padding: 16px 16px;
  margin-bottom: 15px;
  color: #4F9DA6;
  font-size: 24px;
  overflow: hidden;
  overflow-wrap: break-word;
  border: 1px solid #4F9DA6;
  box-sizing: border-box; 
  transition: font-size 0.5s ease-in-out;

    @media screen and (max-width: 580px) {
		font-size: 12px;
  }
  ::-webkit-input-placeholder {color: rgba(79, 157, 166, 0.5)}
	::-moz-placeholder          {color:rgba(79, 157, 166, 0.5)}/* Firefox 19+ */
	:-moz-placeholder           {color:rgba(79, 157, 166, 0.5)}/* Firefox 18- */
  :-ms-input-placeholder      {color:rgba(79, 157, 166, 0.5)}

  ${props => props.invalid && css`
    font-size: 22px;
    color: rgba(185, 4, 46, 0.5);
    border-bottom: 1px solid rgba(185, 4, 46, 1);
    ::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
    ::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
    :-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
    :-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
  `}
`;

class OneAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.value};
  }
    handleChange = (e) => {
      this.setState({title: e.target.value});
      this.isAnswerValid();
  }

  isAnswerValid = () => {
    if (this.props.value && this.props.submitted) {
      this.props.answerValid();
    } else {
      this.props.answerNotValid();
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.submitted !== prevProps.submitted 
      || (this.props.value !== prevState.value && this.props.submitted)) {
      this.isAnswerValid();
      this.props.getAnswersValues(this.props.id,  this.state.title);
    }
  }

 	render() {
    return ( 
      <AnswerInput 
        type="text"
        value={this.state.title}
        placeholder={`Answer ${this.props.count}`} 
        onChange={this.handleChange} 
        invalid = {this.props.isFilled(this.props.value)}
      />
    );
   }
  }

function mapStateToProps(state) {
  return {
	 submitted: state.testCreator.submitted,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    answerValid: () => dispatch(answerValid()),
    answerNotValid: () => dispatch(answerNotValid()),
 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneAnswer)