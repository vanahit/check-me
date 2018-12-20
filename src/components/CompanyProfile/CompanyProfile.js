import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import CompanySvg from './CompanySvg';
import * as firebase from "firebase";
import { storage } from '../../firebase/firebase'
import styled from 'styled-components';
import bgImg from '../../images/Photos/CompanyProfileImage.jpg';
import close from '../../images/buttonIcons/closeIcon.svg';


const CloseDiv = styled.div`
    text-align: right;
`;
const Close = styled.button`
    width: 40px;
    height: 40px;
    border: 1px solid #E7E7E7;
    box-shadow: 0 3px 6px  rgba(0, 0, 0, 0.16);
    background-image:url(${close});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20px;
    background-color: transparent;
`;
  
const WhiteBackgroundDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    height: 360px;
    width: 1200px;
    margin: 76px auto;
    max-width: 100%;
`;
const EmployiesDiv = styled.div`
    align-items: center;
    background-image: url(${bgImg});
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    max-width: 100%;


`;
class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: this.props.user.image,
            progress: 0,
            popup: false,
            name: this.props.user.name,
            description: this.props.user.description
        }

    }

    changeField(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }

    editData () {
        let obj = this.props.user;
            obj.name = this.state.name;
            obj.description = this.state.description;
            firebase.database().ref(`companies/${this.props.user.id}`).set(obj);
    }

    chooseImg(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image })

            setTimeout(() => {
                this.handleUpload()
            },100)
        }
    }

    handleUpload () {

        const { image } = this.state;
        if (image) {
            const uploadImage = storage.ref(`images/${this.props.user.id}/${image.name}`).put(image);


            uploadImage.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress })
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref(`images/${this.props.user.id}`).child(image.name).getDownloadURL().then(url => {
                        console.log(url)
                        this.setState({ url })
                    })
                })
        }

    }

    createPopup(){
        this.setState({popup: true})
    }

    removePopup(){
        this.setState({popup: false})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            firebase.database().ref(`companies/${this.props.user.id}`).child('image').set(this.state.url);
        }
    }

    render() {
        return (
            <div>
                {this.state.popup && <div className="popupOverlay" >
                                    <div className="popupOverlay__content">
                                        <div className="popupOverlay__content__setting">
                                            <CloseDiv><Close onClick={this.removePopup.bind(this)} /></CloseDiv>
                                        </div>
                                        <div className="content">
                                            <label>Name:</label>
                                            <input type="text" value={this.state.name} onChange={(e) => this.changeField(e, 'name') } />
                                            <label>About Company:</label>
                                            <textarea value={this.state.description} onChange={(e) => this.changeField(e, 'description') }>{this.state.description}</textarea>
                                        </div>
                                        <div className="popupOverlay__content__setting">
                                            <CloseDiv><button className="green" onClick={this.editData.bind(this)}>Edit</button></CloseDiv>
                                        </div>
                                    </div>
                                </div>}
                <div>
                    <div className='company-profile'>
                        <div className='profile-logo' >
                            <div className="image-content image-contentCompany">
                                {this.state.url ? <img src={this.state.url} alt="Upload" /> : <CompanySvg />}
                                {this.state.url && <div className='uploadOverlay'></div>}
                            </div>
                            {this.state.progress !== 0 && <progress value={this.state.progress} className="progress red upload-progress" max="100" ></progress>}
                            <input type="file"  name="file" id="file" className="upload" onChange={this.chooseImg.bind(this)}/>


                        </div>
                        <div className='profile-synopsis'>
                            <div className='profile-synopsis-name'>{this.props.user.name}</div>
                            <div className='quote'>The <span>software agency</span> that doesnt work for you</div>
                            <div style={{padding: "20px"}}>
                               {this.props.user.description}
                            </div>
                        </div>
                    </div>
                    <div className="settings">
                        <span onClick={this.createPopup.bind(this)}>Edit Profie</span>
                    </div>
                    <EmployiesDiv>
                        <WhiteBackgroundDiv >
                            <div className='profile-create-test'>
                                <div>
                                    <div className='checked-icon'>
                                        <img src={require('../../images/checkbox.png')} alt='checkbox' />
                                        <span>You can find employee.</span>
                                    </div>
                                    <div className='checked-icon'>
                                        <img src={require('../../images/checkbox.png')} alt='checkbox' />
                                        <span>You can add your own test.</span>
                                    </div>
                                </div>
                                <div className='profile-buttons'>
                                    <NavLink to={`/users`}>
                                        <button>FIND EMPLOYEE</button>
                                    </NavLink>
                                    <NavLink to={`/${this.props.user.name}/add-test`}>
                                        <button>CREATE TEST</button>
                                    </NavLink>
                                </div>
                            </div>
                        </WhiteBackgroundDiv>
                    </EmployiesDiv>
                </div>
            </div>
        );
    }
}

export default CompanyProfile;