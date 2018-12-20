import React from 'react';
import styled from 'styled-components';
import fbIcon from '../../../images/buttonIcons/fb.svg';
import gIcon from '../../../images/buttonIcons/g+.svg';

const Button = styled.div`
    display: inline-block;
    text-align: left;
    color: white;
    font-size: 24px;
    padding: 16px 0;
    width: 252px;
    background-color: ${props => props.fb ? '#4267B2' : '#E74847'};
    border-radius: 4px 0 0 4px;
    :hover {
        cursor: pointer;
    }
`;

const LoginDiv = styled.div`
    font-size: 34px;
    color: white;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
`;
const ImgIcon = styled.div`
    display: inline-block;
    vertical-align: middle;
    padding: 0px 30px 0px 22px;
`;

const Login = ({email, pass, signIn, changeHandler, errorMessage, remember, classForBg, classForButton}) => {
    return (
        <div>
            <div className={`login  ${classForBg}`}>
                <div className='Logwrapper'>
                    <LoginDiv>LOGIN</LoginDiv>
                    {errorMessage !== "" && <div className="errorMessage">{errorMessage}</div>}
                    <form onSubmit={signIn}>
                        <input
                            className='info-field'
                            type="email"
                            placeholder='EMAIL *'
                            value={email}
                            onChange={(e) => changeHandler(e, 'email')}
                        />
                        <input
                            className='info-field'
                            type="password"
                            placeholder='PASSWORD *'
                            value={pass}
                            onChange={(e) => changeHandler(e, 'pass')}
                        />
                        <div className='remembering'>
                            <div className='remember'>
                                <input type="checkbox" onChange={(e => remember(e))} name="Remember Me" value="Remember Me"/>
                                <label htmlFor="Remember Me">{' '} Remember Me </label>
                            </div>
                            {/* <a href = "" >Forgot Password ? </a> */}
                        </div>
                        <input type="submit" value="LOGIN" className=' submit '/>
                        <p>You can also log in with one of this accounts</p>
                        <div className='facgo'>
                            <Button fb><ImgIcon><img src={fbIcon} /></ImgIcon>Facebook</Button>
                            <Button><ImgIcon><img src={gIcon} /></ImgIcon> Google</Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};


export default Login;
