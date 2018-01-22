import { range } from "ramda"


const initialState = {
  fromDate: new Date().setFullYear(new Date().getFullYear() - 1),
  toDate: new Date(),
  seperators: [],
  rings: ["#bed4e6", "#ccdfee", "#dcecf9", "#f0f8ff"],
  height: 600
}


const dayDiff = (a, b) => {
  return Math.round((b - a) / (1000 * 60 * 60 * 24))
}


const generateSeparators = (state) => {
  const { fromDate, toDate } = state
  const days = dayDiff(fromDate, toDate)

  const separators = range(0, days).reduce((acc, x) => {
    const date = new Date(fromDate + x * (1000*60*60*24))
    if (date.getDate() === 1) {
      return [...acc, [360 / days * x, date.getMonth()]]
    } else {
      return acc
    }
  }, [])

  return {
    ...state,
    separators
  }
}


export default (state = initialState, action) => {
  switch (action.type) {

    default:
      return generateSeparators(state)
  }
}
