import { range } from "ramda"


const initialState = {
  height: 600,
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
  tasks: [
    {
      category: "Culture",
      date: "2018-03-01",
      angle: undefined,
      text: "Do something"
    }
  ]
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


export default (state = initialState, action) => {
  switch (action.type) {

    case "CHANGE_DATE_FIELD":
      return setAnglesForTasks(generateSeparators(changeDateField(state, action.field, action.value)))

    default:
      return setAnglesForTasks(generateSeparators(state))
  }
}
