import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

import { changeGameRound } from './actions.js'
import { ReadJSON, InsertVariable } from '../util/ReadJSON';

const mapStateToProps = ({ game_round, page }) => ({
  game_round,
  page,
})

const styles = {
  block: {
    margin: '20px 20px'
  },
  game_roundButton: {
    margin: 12,
  },
};

class ExperimentSetting extends Component {
  constructor() {
    super()
    this.handleRoundInc = this.handleRoundInc.bind(this)
    this.handleRoundDec = this.handleRoundDec.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.state = {
      open: false,
      game_round_temp: 0,
    }
  }

  componentWillReceiveProps(props) {
    const { game_round } = props
    const open = this.state.game_round_temp !== game_round
    this.setState({
      open,
      game_round_temp: game_round,
    })
  }

  handleOpen = () => {
    this.setState({open: true})
    const { game_round } = this.props
    this.setState({
      game_round_temp: game_round,
    })
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = () => {
    const { dispatch } = this.props
    const { game_round_temp } = this.state
    dispatch(changeGameRound(game_round_temp))
    this.setState({open: false});
  }

  handleNothing = (event) => {}

  handleRoundInc = (event) => {
    const { game_round_temp } = this.state
    this.setState({game_round_temp: game_round_temp + 1})
  }

  handleRoundDec = (event) => {
    const { game_round_temp } = this.state
    this.setState({game_round_temp: game_round_temp - 1})
  }

  render() {
    const { page, game_round } = this.props
    const { game_round_temp } = this.state
    const actions = [
      <RaisedButton
        label={ReadJSON().static_text["apply"]}
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
      <RaisedButton
        label={ReadJSON().static_text["cancel"]}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <span>
        <FloatingActionButton label={ReadJSON().static_text["config"]}
          onTouchTap={this.handleOpen}
          disabled={page != "waiting"}
        ><ActionSettings /></FloatingActionButton>
        <Dialog
          title={ReadJSON().static_text["config"]}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>{InsertVariable(ReadJSON().static_text["current_round"], { round: game_round })}</p>
          <p>{InsertVariable(ReadJSON().static_text["max_round"], { round: game_round_temp, change: game_round_temp-1 })}</p>
          { game_round_temp != 1?
            <RaisedButton
              label="-"
              style={styles.game_roundButton}
              onClick={this.handleRoundDec}
            />
            :
            <RaisedButton
              label="-"
              style={styles.game_roundButton}
            />
          }
          <RaisedButton
            label="+"
            style={styles.game_roundButton}
            onClick={this.handleRoundInc}
          />
        </Dialog>
      </span>
    );
  }
}

export default connect(mapStateToProps)(ExperimentSetting)
