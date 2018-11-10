import {Redirect, Route} from "react-router-dom";
import React from "react";


const PrivateRoute = ({component: ChildComponent, ...rest}) => {
  return <Route {...rest} render={props => {
    if (this.props.auth.isLoading) {
      return <em>Loading...</em>
    } else if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/login"/>
    } else {
      return <ChildComponent {...props}/>
    }
  }}/>
}

export default PrivateRoute
