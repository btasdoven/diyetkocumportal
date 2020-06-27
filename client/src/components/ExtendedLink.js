import React from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

class ExtendedLink extends React.Component {
    render() {
        const {to, children, location, history, match, component, staticContext, ...rest} = this.props

        var calculatedTo = typeof(to) == 'object' ? to : {pathname: to}
        calculatedTo.search = location.search

        return (
            <Link
                to={calculatedTo}
                {...rest}
            >
                {children}
            </Link>
        )
    }
}
 
const withRouterAndRef = Wrapped => {
    const WithRouter = withRouter(({ forwardRef, ...otherProps }) => (
      <Wrapped ref={forwardRef} {...otherProps} />
    ))
    const WithRouterAndRef = React.forwardRef((props, ref) => (
      <WithRouter {...props} forwardRef={ref} />
    ))
    const name = Wrapped.displayName || Wrapped.name
    WithRouterAndRef.displayName = `withRouterAndRef(${name})`
    return WithRouterAndRef
  }

 export default withRouterAndRef(ExtendedLink)