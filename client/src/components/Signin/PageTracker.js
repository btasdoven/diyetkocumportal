import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { isProduction } from '../../services/env.service'

GoogleAnalytics.initialize('UA-48111628-4', {
  gaOptions: {
    siteSpeedSampleRate: 100,
  },
  debug: !isProduction
});

export const trackPage = (page) => {
  var user = JSON.parse(localStorage.getItem('user'));
  var username = user ? user.username : ''

  GoogleAnalytics.set({
    page,
    hostname: window.location.hostname,
    username: username
  });

  GoogleAnalytics.pageview(page);
  GoogleAnalytics.event({
    category: window.location.hostname + '_' + username,
    action: 'PageView_' + page,
  });
};

export const registerEvent = (eventName) => {
  var user = JSON.parse(localStorage.getItem('user'));
  var username = user ? user.username : ''

  GoogleAnalytics.set({
    eventName,
    hostname: window.location.hostname,
    username: username
  });

  GoogleAnalytics.event({
    category: 'hostname_' + window.location.hostname + '_user_' + username,
    action: eventName,
  });
};

const withTracker = (WrappedComponent) => {
  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  };

  return HOC;
};

export default withTracker;