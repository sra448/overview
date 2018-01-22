import React from "react"
import { connect } from "react-redux"
import { format } from "date-fns"


import Circle from "./circle"


require("./style.scss")


// React Redux Bindings

const mapStateToProps = (state) => state


const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (field) => ({ target }) => {
      dispatch({ type: "CHANGE_DATE_FIELD", field, value: target.value })
    }
  }
}



// Main Component

const main = ({ fromDate, toDate, height, rings, tasks, separators, onChange }) => {
  return (
    <div>
      <Circle
        height={height}
        rings={rings}
        tasks={tasks}
        separators={separators}
        />
      <div>
        <input
          type="date"
          value={format(fromDate, "YYYY-MM-DD")}
          onChange={onChange("fromDate")}
          />
        <input
          type="date"
          value={format(toDate, "YYYY-MM-DD")}
          onChange={onChange("toDate")}
          />
      </div>
    </div>
  )
}



// Connected Main Component

export default connect(mapStateToProps, mapDispatchToProps)(main)
