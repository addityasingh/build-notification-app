import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory, Router } from 'react-router'
import { Provider, connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { updateToken } from '../actions/user'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = dispatch => ({
  actions: {
    updateToken: bindActionCreators(updateToken, dispatch)
  }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)(AppContainer);

