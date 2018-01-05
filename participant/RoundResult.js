import React from 'react'
import { InsertVariable, ReadJSON } from '../util/ReadJSON';

const RoundResult = ({ id, dictator, value }) => {
  if (id == dictator) {
    return (
      <div>
        <p>{ReadJSON().static_text["hold_point"]}</p>
        <p>{value}</p>
        <p>{ReadJSON().static_text["pass_point"]}</p>
        <p>{InsertVariable(ReadJSON().static_text["point__"], { point: 1000 - value })}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{ReadJSON().static_text["return_point"]}</p>
        <p>{InsertVariable(ReadJSON().static_text["point__"], { point: 1000 - value })}</p>
      </div>
    )
  }
}

export default RoundResult
