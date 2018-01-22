import React from "react"
import { connect } from "react-redux"
import { format } from "date-fns"


import Circle from "./circle"
import TaskDialog from "./task-dialog"


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
    showTask: (id) => () => {
      dispatch({ type: "SHOW_TASK", id })
    },
    deleteTask: (id) => () => {
      dispatch({ type: "DELETE_TASK", id })
    }
  }
}






// Main Component

const main = (state) => {
  const { fromDate, toDate, height, rings, tasks, currentTask, separators } = state
  const { changeCurrentTask, saveCurrentTask, closeCurrentTask, showTask, deleteTask } = state
  const { onChange, addTask } = state

  return (
    <div className="main">
      { currentTask ?
        <TaskDialog
          task={currentTask}
          categories={rings}
          changeField={changeCurrentTask}
          save={saveCurrentTask}
          close={closeCurrentTask}
          destroy={deleteTask}
          />
        : undefined
       }
      <Circle
        height={height}
        rings={rings}
        tasks={tasks}
        separators={separators}
        showTask={showTask}
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
