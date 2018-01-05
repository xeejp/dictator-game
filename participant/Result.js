import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Chart from '../components/Chart.js'
import RoundResult from './RoundResult.js'
import { fetchContents } from './actions'
import { ReadJSON, InsertVariable } from '../util/ReadJSON';

const mapStateToProps = ({ id, pair_results }) => {
  return {
    id,
    results: pair_results.concat().reverse()
  }
}

const Result = ({ id, results }) => (
  <div>
    <Card initiallyExpanded={true}>
      <CardHeader
        title={ReadJSON().static_text["graph"]}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Chart />
      </CardText>
    </Card>
    <Card>
      <CardHeader
        title={ReadJSON().static_text["round_result"]}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        {results.map(({ dictator, value }, index) => {
          return (
            <div key={index}>
              <p>{InsertVariable(ReadJSON().static_text["round___"], { round: index + 1 })}</p>
              <RoundResult
                id={id}
                dictator={dictator}
                value={value}
              />
            </div>
          )
        })}
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps)(Result)
