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
    },
    addTask: () => {
      dispatch({ type: "ADD_TASK" })
    },
    changeCurrentTask: (field) => ({ target }) => {
      dispatch({ type: "CHANGE_TASK_FIELD", field, value: target.value })
    },
    saveCurrentTask: () => {
      dispatch({ type: "SAVE_TASK" })
    },
    closeCurrentTask: () => {
      dispatch({ type: "CLOSE_CURRENT_TASK" })
    },
  }
}



// Main Component

const main = (state) => {
  const { fromDate, toDate, height, rings, tasks, currentTask, separators } = state
  const { onChange, addTask, changeCurrentTask, saveCurrentTask, closeCurrentTask } = state

  return (
    <div className="main">
      { currentTask ?
          <div className="modal">
            <div>
              <h2>Add Task</h2>
              <div>
                Text
                <input value={currentTask.text} onChange={changeCurrentTask("text")} />
              </div>
              <div>
                Due At
                <input type="date" value={format(currentTask.date, "YYYY-MM-DD")} onChange={changeCurrentTask("date")}  />
              </div>
              <div>
                Category
                <select value={currentTask.category} onChange={changeCurrentTask("category")}>
                  { rings.map(({ name, color }) =>
                    <option key={name} value={name}>{ name }</option>
                  )}
                </select>
              </div >
              <button onClick={closeCurrentTask}>Cancel</button>
              <button onClick={saveCurrentTask}>Add</button>
            </div>
          </div>
        : undefined
       }
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
      <div>
        <button onClick={addTask}>+ Task</button>
      </div>
    </div>
  )
}



// Connected Main Component

export default connect(mapStateToProps, mapDispatchToProps)(main)
