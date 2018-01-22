import React from "react"
import { connect } from "react-redux"


require("./style.scss")


// React Redux Bindings

const mapStateToProps = (state) => state


const mapDispatchToProps = (dispatch) => {
  return {}
}



// Main Component

const main = ({ height, rings, separators }) => {
  const midPoint = height / 2
  const width = midPoint / (rings.length + 1)
  const ringsAndCenter = [...rings, "#fff"]

  return (
    <div>
      <svg height={height} width={height}>
        <g>
          { ringsAndCenter.map((color, i) => {
              const invserseI = rings.length - i + 1
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
        <g>
          <line x1={midPoint} y1={midPoint - width} x2={midPoint} y2={0} stroke="#00000040" />
          { separators.map(([angle, month]) => {
            const x2 = midPoint + midPoint * Math.cos(Math.PI * angle / 180.0)
            const y2 = midPoint + midPoint * Math.sin(Math.PI * angle / 180.0)

            return (
              <line key={angle} x1={midPoint} y1={midPoint} x2={x2} y2={y2} stroke="#fff" />
            )
          }) }
        </g>
      </svg>
    </div>
  )
}



// Connected Main Component

export default connect(mapStateToProps, mapDispatchToProps)(main)
