import React from "react"
import { connect } from "react-redux"
import { format, parse } from "date-fns"

import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'


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
    <List>
      <ListItem>
        <TextField
          label="Start"
          type="date"
          value={format(fromDate, "YYYY-MM-DD")}
          onChange={onChange("fromDate")}
          />
      </ListItem>
      <ListItem>
        <TextField
          label="End"
          type="date"
          value={format(toDate, "YYYY-MM-DD")}
          onChange={onChange("toDate")}
          />
      </ListItem>
    </List>
  </Paper>


const RingPicker = ({ rings }) => {
  return (
    <Paper>
      <h2>Layers</h2>
      <List>
        { rings
            .map(({ name, color }) =>
              <ListItem key={name}>
                <Checkbox
                  checked={true}
                  color="primary"
                  disableRipple
                />
                <ListItemText primary={name} />
              </ListItem>)
        }
      </List>
    </Paper>
  )
}


const Tasks = ({ addTask }) => {
  return (
    <Paper>
      <h2>Tasks</h2>
      <List>
        <ListItem>
          <button onClick={addTask}>+ Task</button>
        </ListItem>
        <ListItem>
          <TextField
            label="Filter"
            />
        </ListItem>
      </List>
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
          <Tasks
            addTask={addTask}
            />
          <DateRangePicker
            fromDate={fromDate}
            toDate={toDate}
            onChange={onChange}
            />
          <RingPicker
            rings={rings}
            />
        </div>
      </div>
    </div>
  )
}



// Connected Main Component

export default connect(mapStateToProps, mapDispatchToProps)(main)
