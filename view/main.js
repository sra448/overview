import React from "react"
import { connect } from "react-redux"
import { format } from "date-fns"


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


// Components


const Circle = ({ height, rings, separators }) => {
  const midPoint = height / 2
  const width = midPoint / (rings.length + 1)
  const ringsAndCenter = [...rings, "#fff"]

  return (
    <svg height={height} width={height}>
      <Rings rings={ringsAndCenter} width={width} midPoint={midPoint} />
      <Separators separators={separators} width={width} midPoint={midPoint} />
    </svg>
  )
}


const Rings = ({ rings, width, midPoint }) =>
  <g>
    { rings.map((color, i) => {
        const invserseI = rings.length - i
        return (
          <circle
            key={color}
            cx={midPoint}
            cy={midPoint}
            r={invserseI * width}
            fill={color}
            stroke="#f8f9f9a1"
            />
        )
      })
    }
  </g>


const Separators = ({ separators, midPoint, width }) =>
  <g>
    <line x1={midPoint} y1={midPoint - width} x2={midPoint} y2={0} stroke="#00000040" />
    { separators.map(([angle, _]) => {
      const x2 = midPoint + midPoint * Math.cos(Math.PI * angle / 180.0)
      const y2 = midPoint + midPoint * Math.sin(Math.PI * angle / 180.0)

      return (
        <line key={angle} x1={midPoint} y1={midPoint} x2={x2} y2={y2} stroke="#fff" />
      )
    }) }
  </g>



// Main Component

const main = ({ fromDate, toDate, height, rings, separators, onChange }) => {
  return (
    <div>
      <Circle height={height} rings={rings} separators={separators} />
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
