import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchContents,
  intoLoading,
  exitLoading,
} from './actions.js'

import FlatButton from 'material-ui/FlatButton';

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'
import ExperimentSetting from './ExperimentSetting.js'
import MatchingButton from './MatchingButton.js'
import DownloadButton from './DownloadButton'

import throttle from 'react-throttle-render'

const ThrottledChart = throttle(Chart, 100)

const mapStateToProps = ({ dispatch, dictator_results, participants, pairs, page }) => ({
  dispatch, dictator_results, participants, pairs, page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(intoLoading())
    dispatch(fetchContents())
    dispatch(exitLoading())
  }

  render() {
    const { dictator_results, participants, pairs, page } = this.props
    return (
      <div>
        <PageSteps />
        <Users />
        <ThrottledChart />
        <ExperimentSetting />
        <MatchingButton />
        <DownloadButton
          fileName={"dictator_game.csv"}
          list={[
            ["独裁者ゲーム"],
            ["実験日", new Date()],
            ["登録者数", Object.keys(participants).length],
            ["ペア数", Object.keys(pairs).length],
            ["ID", "得点"],
          ].concat(
            Object.keys(participants).map(id => [id, participants[id].point])
          ).concat(
            [["得点"].concat(Object.keys(dictator_results).map(key => key + "ラウンド"))]
          ).concat(
            [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(n => [n].concat(
              Object.keys(dictator_results).map(key => {
                const tmp = Object.keys(dictator_results[key]).map(i => dictator_results[key][i].value)
                let cnt = 0
                for(var j in tmp) cnt += (0 + (tmp[j] == n))
                return cnt
              })
            ))
          )}
          style={{marginLeft: '2%'}}
          disabled={page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
