import React from 'react'

const RoundResult = ({ id, dictator, value }) => {
  if (id == dictator) {
    return (
      <div>
        <p>手もとに残るポイント</p>
        <p>{value}</p>
        <p>相手に渡すポイント</p>
        <p>{1000 - value}ポイント</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>相手から受け取ったポイント</p>
        <p>{1000 - value}ポイント</p>
      </div>
    )
  }
}

export default RoundResult
