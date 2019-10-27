import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Icon from '../Icon';
import Styles from './styles';

const handleLogin = (service, callback) => {
  const options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup',
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'popup',
    },
    google: {
      requestPermissions: ['email', 'profile'],
      requestOfflineToken: true,
      loginStyle: 'popup',
    },
  }[service];

  return {
    facebook: Meteor.loginWithFacebook,
    github: Meteor.loginWithGithub,
    google: Meteor.loginWithGoogle,
    twitter: Meteor.loginWithTwitter,
  }[service](options, callback);
};

const serviceLabel = {
  facebook: (
    <span>
      <Icon iconStyle="brand" icon="facebook" />
      {' Log In with Facebook'}
    </span>
  ),
  github: (
    <span>
      <Icon iconStyle="brand" icon="github" />
      {' Log In with GitHub'}
    </span>
  ),
  google: (
    <span>
      <Icon iconStyle="brand" icon="google" />
      {' Log In with Google'}
    </span>
  ),
  twitter: (
    <span>
      <Icon iconStyle="brand" icon="twitter" />
      {' Log In with Twitter'}
    </span>
  ),
};

const OAuthLoginButton = ({ service, callback }) => (
  <Styles.OAuthLoginButton
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    type="button"
    onClick={() => handleLogin(service, callback)}
  >
    {serviceLabel[service]}
  </Styles.OAuthLoginButton>
);

OAuthLoginButton.defaultProps = {
  callback: (error) => {
    if (error) Bert.alert(error.message, 'danger');
  },
};

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default OAuthLoginButton;
