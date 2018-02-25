import React from "react"
import { connect } from "react-redux"
import { format, parse } from "date-fns"


import Paper from 'material-ui/Paper'
import Circle from "./circle"
import TaskDialog from "./task-dialog"


import "./style.css"


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
    },
    showTaskTooltip: (id) => () => {
      dispatch({ type: "SHOW_TASK_TOOLTIP", id })
    },
    hideTaskTooltip: () => {
      dispatch({ type: "HIDE_TASK_TOOLTIP" })
    },
    startDrawConnection: (taskId, x, y) => () => {
      dispatch({ type: "START_DRAW_CONNECTION", taskId, x, y })
    }
  }
}


// Components


const DateRangePicker = ({ fromDate, toDate, onChange }) =>
  <Paper>
    <h2>Timeframe</h2>
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
  </Paper>


const RingPicker = ({ rings }) => {
  return (
    <Paper>
      <h2>Layers</h2>
      { rings.map(({ name, color }) =>
          <div key={name}>
            <div className="color" style={{ background: color }}></div>
            <div>{name}</div>
          </div>)
      }
    </Paper>
  )
}


const Filters = ({ rings }) => {
  return (
    <Paper>
      <h2>Filters</h2>
      <input />
    </Paper>
  )
}



// Main Component

const main = (state) => {
  const { fromDate, toDate, height, rings, tasks, currentTask, separators, tempEdge } = state
  const { changeCurrentTask, saveCurrentTask, closeCurrentTask, showTask, deleteTask } = state
  const { onChange, addTask, showTaskTooltip, hideTaskTooltip, hoveredTask, startDrawConnection } = state

  const visibleTasks = tasks.filter((task) => {
    const date = parse(task.date)
    return date >= fromDate && date <= toDate
  })

  return (
    <div>
      { currentTask ?
        <TaskDialog
          task={currentTask}
          categories={rings}
          changeField={changeCurrentTask}
          save={saveCurrentTask}
          close={closeCurrentTask}
          destroy={deleteTask}
          /> :
        undefined
      }
      <div className="main">
        <Circle
          height={height}
          rings={rings}
          tasks={visibleTasks}
          separators={separators}
          hoveredTask={hoveredTask}
          showTask={showTask}
          showTooltip={showTaskTooltip}
          hideTooltip={hideTaskTooltip}
          startDrawConnection={startDrawConnection}
          tempEdge={tempEdge}
          />
        <div>
          <div>
            <button onClick={addTask}>+ Task</button>
          </div>
          <DateRangePicker
            fromDate={fromDate}
            toDate={toDate}
            onChange={onChange}
            />
          <RingPicker
            rings={rings}
            />
          <Filters
            />
        </div>
      </div>
    </div>
  )
}



// Connected Main Component

export default connect(mapStateToProps, mapDispatchToProps)(main)
