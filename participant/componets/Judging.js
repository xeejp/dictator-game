import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../../util/index'

import {
  submitAlloTemp,
  finishAllocating,
} from '../actions.js'

const mapStateToProps = ({ allo_temp, change_count, role, now_round }) => ({
  allo_temp, change_count, role, now_round,
})

import {
  responseOK,
} from '../actions.js'
import { InsertVariable, ReadJSON } from '../../util/ReadJSON';

class Allocating extends Component {
  constructor() {
    super()
    this.handleOK = this.handleOK.bind(this)
  }

  handleOK = () => {
    const { dispatch, allo_temp, change_count, now_round } = this.props
    const result = {
      value: allo_temp,
      change_count: change_count,
      now_round: now_round,
    }
    dispatch(responseOK(result))
  }

  render() {
    const { allo_temp, role } = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "responder")? "dictator" : "responder"
    return (
      <div>
        <Card>
          <CardHeader
            title={InsertVariable(ReadJSON().static_text["role_side"], { role: getRoleName(role) })}
            subtitle={role == "responder"? ReadJSON().static_text["please_ans"] : ReadJSON().static_text["please_wait_"]}
          />
          <CardText>
            <p>{InsertVariable(ReadJSON().static_text["allo"], { user_allo: role == "responder"? 1000 - allo_temp : allo_temp, role: getRoleName(enemy), enemy_allo: role == "responder"? allo_temp : 1000 - allo_temp })}</p>
            { role != "responder"?
              <p>{ReadJSON().static_text["sent"]}</p>
            :
              <div>
                <p>{InsertVariable(ReadJSON().static_text["please_ans_"], { role: getRoleName(enemy) })}</p>
                <RaisedButton
                  label={ReadJSON().static_text["accept"]}
                  primary={true}
                  onClick={this.handleOK}
                  style={{marginRight: "16px"}}
                />
                <RaisedButton
                  label={ReadJSON().static_text["reject"]}
                  secondary={true}
                  disabled={true}
                />
              </div>
            }
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Allocating)

