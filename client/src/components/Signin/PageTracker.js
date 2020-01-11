import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { isProduction } from '../../services/env.service'

GoogleAnalytics.initialize('UA-48111628-4');

export const trackPage = (page, options = {}) => {
  GoogleAnalytics.set({
    page,
    ...options,
    isProduction,
    debug: !isProduction,
  });
  GoogleAnalytics.pageview(page);
};

const withTracker = (WrappedComponent, options = {}) => {
  const HOC = class extends Component {
    componentDidMount() {
      const page = window.location.hostname + this.props.location.pathname;
      trackPage(page, options);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(window.location.hostname + nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  };

  return HOC;
};

export const trackModelView = (viewName) => {
  trackPage(window.location.hostname + viewName);
};

export default withTracker;