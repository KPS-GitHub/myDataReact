import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Home from '../../pages/Home';

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        console.log(response);
        // store userID in local storage - it will be pulled and attached to data every time a data entry is made
        window.sessionStorage.setItem("userID", response.userID);
        // set state for facebook login
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
    }

    componentClicked = () => console.log('clicked');

    render() {
        let fbContent;

        if(this.state.isLoggedIn) {
            fbContent = (
                <Home />
            );
        } else {
            fbContent = (
            <FacebookLogin
                appId="159212111619088"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            )
        }
        return <div>{fbContent}</div>;
    }
}