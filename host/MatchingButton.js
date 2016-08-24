import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { match } from './actions'

const mapStateToProps = ({}) => ({
})

const styles = {
  float: "right",
}

class MatchingButton extends Component {
  handleClick() {
    const { dispatch } = this.props
    dispatch(match())
  }

  render() {
    return (
      <RaisedButton
        label="再マッチング"
        style={styles}
        onClick={this.handleClick.bind(this)}
      />
    )
  }
}

export default connect(mapStateToProps)(MatchingButton)  