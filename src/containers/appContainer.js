import React, { Component } from 'react';
import ReactNative from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateRootNavigator from "../routes";
import { connect } from 'react-redux';
import { isLoginSelector } from '../redux/auth/selectors';

const USER_KEY = 'accessToken';
const USER_DATA = 'userData';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: null,
      data: [],
      isOnboarding: null
    };
  }

  componentDidMount() {
    const _this = this;
      AsyncStorage.multiGet([USER_KEY, USER_DATA])
      .then((res) => {
        if (res !== null) {
          var data = {
            accessToken: null,
            userData: null
          }
          res.forEach((item, index) => {
            if (item[0] == 'accessToken') {
              data.accessToken = JSON.parse(item[1])
            } else if (item[0] == 'userData') {
              data.userData = JSON.parse(item[1])
            }
          })
          if (data.accessToken == null) {
            this.setState({ signedIn: false, isOnboarding: false })
          }
        } else {
          this.setState({ signedIn: false, isOnboarding: false })
        }
      })
      .catch((err) => reject(err));
  }

  render() {
    if( this.props.isLogin ){
      return(<CreateRootNavigator signedIn={this.props.isLogin} isOnboarding={this.state.isOnboarding} />);
    }
    if (this.state.signedIn == null || this.state.isOnboarding == null ) {
      return (null)
    } else {
      return (
      <CreateRootNavigator signedIn={this.props.isLogin} isOnboarding={this.state.isOnboarding} />);
    }
  }
}

function mapStateToProps(state) {
  return {
    isLogin: isLoginSelector(state)
  }
}


export default connect(mapStateToProps)(AppContainer);
