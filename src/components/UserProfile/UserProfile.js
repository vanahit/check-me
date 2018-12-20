import React, { Component } from 'react';
import PassedTests from '../PassedTests';
import UserSvg from './UserSvg';
import * as firebase from "firebase";
import { storage } from '../../firebase/firebase'
import styled from 'styled-components';
import close from '../../images/buttonIcons/closeIcon.svg';

const Main = styled.div`
	box-sizing: border-box;
`;
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
export default class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: null,
            url: this.props.user.image,
            progress: 0,
            popup: false,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            description: this.props.user.description,
            languages: this.props.user.languages
        }
    }

    changeField(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }

    editData() {
        let obj = this.props.user;
        obj.firstName = this.state.firstName;
        obj.lastName = this.state.lastName;
        obj.description = this.state.description;
        obj.languages = this.state.languages
        firebase.database().ref(`user/${this.props.user.id}`).set(obj);
    }

    changeCheckboxHandler(e, lang) {
        let languages = this.state.languages;
        if (e.target.checked) {
            languages.push(lang);
        } else {
            languages = languages.filter(item => item !== lang);
        }
        this.setState({ languages });
    }

    chooseImg(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image })
            setTimeout(() => {
                this.handleUpload()
            }, 100)
        }
    }

    createPopup() {
        this.setState({ popup: true })
    }

    removePopup() {
        this.setState({ popup: false })
    }

    handleUpload() {

        const { image } = this.state;
        if (image) {
            const uploadImage = storage.ref(`images/${this.props.user.id}/${image.name}`).put(image);


            uploadImage.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress })
                },
                (error) => {

                },
                () => {
                    storage.ref(`images/${this.props.user.id}`).child(image.name).getDownloadURL().then(url => {

                        this.setState({ url })
                    })
                })
        }

    }

    checked(skill) {
        return this.state.languages.some(item => item === skill)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            firebase.database().ref(`user/${this.props.user.id}`).child('image').set(this.state.url);


        }
    }

    render() {
        const languages = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];
        function skills(arr) {
            return arr.join(', ')
        }


        return (
            <div>
                {this.state.popup && <div className="popupOverlay">
                    <div className="popupOverlay__content">
                        <div className="popupOverlay__content__setting">
                            <CloseDiv> <Close onClick={this.removePopup.bind(this)} /></CloseDiv>
                        </div>
                        <div className="content">
                            <label>Name:</label>
                            <input type="text" value={this.state.firstName} onChange={(e) => this.changeField(e, 'firstName')} />
                            <label>Surname:</label>
                            <input type="text" value={this.state.lastName} onChange={(e) => this.changeField(e, 'lastName')} />
                            <label>About Yourself:</label>
                            <textarea value={this.state.description} onChange={(e) => this.changeField(e, 'description')}>{this.state.description}</textarea>
                            <div className="">
                                {
                                    languages.map((item, index) => {
                                        return (
                                            <div className="popup--skill skill" key={index}>
                                                <input
                                                    type="checkbox"
                                                    onChange={e => this.changeCheckboxHandler(e, item)}
                                                    checked={this.checked(item)} />
                                                <span>{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <hr style={{ margin: "20px 0" }} />
                        <div className="popupOverlay__content__setting">
                            <CloseDiv><button className="green" onClick={this.editData.bind(this)}>Edit</button></CloseDiv>
                        </div>
                    </div>
                </div>}
                <Main>
                    <div className="userContent company-profile">
                        <div className='profile-logo' >
                            <div className="image-content">
                                {this.state.url ? <img src={this.state.url} alt="Upload" /> : <UserSvg />}
                                {this.state.url && <div className='uploadOverlay'></div>}

                            </div>
                            {this.state.progress !== 0 && <progress value={this.state.progress} className="progress red upload-progress" max="100" ></progress>}
                            <input type="file" name="file" id="file" className="upload" onChange={this.chooseImg.bind(this)} />


                        </div>
                        <div className="infoUser">
                            <h2>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h2>
                            <div className="skillsDivUser" style={{ margin: "20px 0" }}>
                                <span style={{ color: "grey" }}>Skills: </span>
                                <span className="orange"> {skills(this.props.user.languages)} </span>
                            </div>
                            <div style={{ padding: "20px" }}>
                                {this.props.user.description}
                            </div>
                        </div>
                    </div>
                    <div className="settings">
                        <span onClick={this.createPopup.bind(this)}>Edit Profie</span>
                    </div>
                    <div className="labelHeader">Passed Tests</div>
                    <PassedTests user={this.props.user} />
                </Main>
            </div>
        );
    }

}