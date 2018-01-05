import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Allocating from './componets/Allocating.js'
import Judging from './componets/Judging.js'
import Finished from './componets/Finished.js'

import {
  fallSnackBarFlags,
  fallSnackBarFlags2,
  fallSnackBarFlags3,
} from './actions.js'

import {
  getRoleName,
} from '../util/index'
import { InsertVariable, ReadJSON } from '../util/ReadJSON';

const mapStateToProps = ({
  state, role, allo_result,
  game_round, now_round,
  point, game_progress,
  responsedOK, responseOK,
  responsedNG, responseNG,
  changeRole,
}) => ({
  state, role, allo_result,
  game_round, now_round,
  point, game_progress,
  responsedOK, responseOK, 
  responsedNG, responseNG,
  changeRole,
})

const styles = {
  chip1: {
    margin: 4,
    float: "left"
  },
  chip2: {
    margin: 4,
    float: "right"
  },
  contents: {
    clear: "both"
  }
}

class Respond extends Component {
  constructor() {
    super()
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestClose2 = this.handleRequestClose2.bind(this)
    this.handleRequestClose3 = this.handleRequestClose3.bind(this)
  }

  handleRequestClose = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags())
  }

  handleRequestClose2 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags2())
  }

  handleRequestClose3 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags3())
  }

  renderContents () {
    const { state } = this.props
    switch(state) {
      case "allocating":
        return <Allocating />
      case "judging":
        return <Judging />
      case "finished":
        return  <Finished />
    }
  }

  render() {
    const {
      role, game_round,
      now_round, point,
      game_progress, allo_result,
      responsedOK, responseOK,
      responsedNG, responseNG,
      changeRole, state,
    } = this.props
    return (
      role != "visitor"?
        <div>
        { state != "finished"?
            <span>
              <Chip style={styles.chip1}>{InsertVariable(ReadJSON().static_text["round__"], { now: now_round, round: game_round })}</Chip>
              <Chip style={styles.chip1}>{(game_round - now_round) == 0? ReadJSON().static_text["final_round"] : InsertVariable(ReadJSON().static_text["change_count"], { count: game_round - now_round })}</Chip>
            </span>
          : <span />
        }
        { state == "finished"?
            <span><Chip style={styles.chip2}>{InsertVariable(ReadJSON().static_text["progress"], { progress: Math.round(game_progress) })}</Chip></span>
          : <span />
        }
        <Chip style={styles.chip2}>{InsertVariable(ReadJSON().static_text["point_"], { point: point })}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
          <Snackbar
            open={changeRole}
            message={InsertVariable(ReadJSON().static_text["role_change"], { role: getRoleName(role) })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose2}
          />
          <Snackbar
            open={responsedOK}
            message={InsertVariable(ReadJSON().static_text["accepted"], { point: allo_result })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responseOK}
            message={InsertVariable(ReadJSON().static_text["accepted_"], { point: (1000 - allo_result) })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      :
        <p>{ReadJSON().static_text["cant_join"]}</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


