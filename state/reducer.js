import { range } from "ramda"


const initialState = {
  height: 680,
  fromDate: new Date(),
  toDate: new Date().setFullYear(new Date().getFullYear() + 1),
  separators: [],
  rings: [
    {
      name: "Culture",
      color: "#bed4e6"
    },
    {
      name: "Education",
      color: "#ccdfee"
    },
    {
      name: "Organization",
      color: "#dcecf9"
    },
    {
      name: "Recruitment",
      color: "#f0f8ff"
    }
  ],
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  currentTask: undefined
}


const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}



const dayDiff = (a, b) => {
  return Math.round((b - a) / (1000 * 60 * 60 * 24))
}


const generateSeparators = (state) => {
  const { fromDate, toDate } = state
  const days = dayDiff(fromDate, toDate)

  const separators = range(0, days).reduce((acc, x) => {
    const date = new Date(+fromDate + x * (1000*60*60*24))

    if (date.getDate() === 1) {
      const angle = getAngle(days, x)
      return [...acc, [angle, date.getMonth()]]
    } else {
      return acc
    }
  }, [])

  return {
    ...state,
    separators
  }
}


const changeDateField = (state, field, value) => {
  return {
    ...state,
    [field]: new Date(value)
  }
}


const setAnglesForTasks = (state) => {
  const tasks = state.tasks.map((task) => {
    return {
      ...task,
      angle: getAngleWithinRange(state.fromDate, state.toDate, task.date)
    }
  })

  return {
    ...state,
    tasks
  }
}


const getAngleWithinRange = (startDate, endDate, date) => {
  const daysTotal = dayDiff(startDate, endDate)
  const daysDelta = dayDiff(startDate, new Date(date))

  return getAngle(daysTotal, daysDelta)
}


const getAngle = (daysTotal, daysDelta) => {
  const angle = 360 / daysTotal * daysDelta

  if (angle >= 90) {
    return angle - 90
  } else {
    return 360 + (angle - 90)
  }
}


const addTask = (state) => {
  return {
    ...state,
    currentTask: {
      text: "",
      date: new Date(),
      category: "Culture"
    }
  }
}


const changeCurrentTask = (state, field, value) => {
  const currentTask = {
    ...state.currentTask,
    [field]: value
  }

  return {
    ...state,
    currentTask
  }
}


const saveCurrentTask = (state) => {
  if (state.currentTask.id) {
    const tasks = state.tasks.map((task) => {
      if (task.id === state.currentTask.id) {
        return state.currentTask
      } else {
        return task
      }
    })

    localStorage.setItem("tasks", JSON.stringify(tasks))
    return {
      ...state,
      tasks,
      currentTask: undefined
    }
  } else {
    const currentTask = { ...state.currentTask, id: guid() }
    const tasks = [...state.tasks, currentTask]


    localStorage.setItem("tasks", JSON.stringify(tasks))
    return {
      ...state,
      tasks,
      currentTask: undefined
    }
  }
}


const closeCurrentTask = (state) => {
  return {
    ...state,
    currentTask: undefined
  }
}


const showTask = (state, taskId) => {
  const currentTask = state.tasks.filter(({ id }) => taskId === id)[0]
  return {
    ...state,
    currentTask
  }
}


const deleteTask = (state, taskId) => {
  const tasks = state.tasks.filter(({ id }) => id != taskId)
  localStorage.setItem("tasks", JSON.stringify(tasks))

  return {
    ...state,
    tasks,
    currentTask: undefined
  }
}


export default (state = initialState, action) => {
  console.log(action.type)

  switch (action.type) {

    case "ADD_TASK":
      return addTask(state)

    case "CHANGE_TASK_FIELD":
      return changeCurrentTask(state, action.field, action.value)

    case "SAVE_TASK":
      return setAnglesForTasks(saveCurrentTask(state))

    case "DELETE_TASK":
      return deleteTask(state, action.id)

    case "SHOW_TASK":
      return showTask(state, action.id)

    case "CLOSE_CURRENT_TASK":
      return closeCurrentTask(state)

    case "CHANGE_DATE_FIELD":
      return setAnglesForTasks(generateSeparators(changeDateField(state, action.field, action.value)))

    default:
      return setAnglesForTasks(generateSeparators(state))
  }
}
