import { Redirect, Route } from 'react-router-dom'
import React, { Component } from 'react'

import { auth } from '../actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'

// class PrivateRoute extends Component {
//
// }

class PrivateRoute extends Component {
  componentDidMount () {
    this.props.loadUser()
  }

  render () {
    const { component: ChildComponent,
      auth,
      ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props => {
          if (auth.isLoading) {
            return <em>Loading...</em>
          } else if (!auth.isAuthenticated) {
            return <Redirect to='/login' />
          } else {
            return <ChildComponent {...props} />
          }
        }} />
    )
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser())
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(PrivateRoute)
