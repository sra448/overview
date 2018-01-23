import React from "react"
import { filter, identity } from "ramda"



// Some usefull functions


const radiusEndpoint = (midPoint, angle, width) =>{
  const x = midPoint + width * Math.cos(Math.PI * angle / 180.0)
  const y = midPoint + width * Math.sin(Math.PI * angle / 180.0)
  return [x, y]
}



// Components


const Rings = ({ rings, width, midPoint }) =>
  <g>
    { rings.map(({ color }, i) => {
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
    { separators.map(([angle, _]) =>
        <RadiusLine key={angle} midPoint={midPoint} angle={angle} />
      )
    }
    <NowLine midPoint={midPoint} width={width} />
  </g>


const RadiusLine = ({ midPoint, angle }) => {
  const [x2, y2] = radiusEndpoint(midPoint, angle, midPoint)

  return (
    <line
      x1={midPoint}
      y1={midPoint}
      x2={x2}
      y2={y2}
      stroke="#fff"
      />
    )
}


const NowLine = ({ midPoint, width }) =>
  <line
    x1={midPoint}
    y1={midPoint - width}
    x2={midPoint}
    y2={0}
    stroke="#00000040"
    strokeWidth="2"
    />


const Tasks = ({ rings, tasks, midPoint, width, hoveredTask, showTask, showTooltip, hideTooltip }) =>
  <g>
    { rings.map(({ name }, i) => {
      const invserseI = rings.length - i + 1
      return tasks
        .filter(({ category }) => category === name)
        .map(({ id, angle, text }) => {
          const [cx, cy] = radiusEndpoint(midPoint, angle, invserseI * width - width / 2)

          return filter(identity, [
            <circle
              key={id}
              className="task"
              cx={cx}
              cy={cy}
              onClick={showTask(id)}
              onMouseOver={showTooltip(id)}
              onMouseOut={hideTooltip}
              />,
            hoveredTask === id ?
              <ToolTip key="tooltip" text={text} cx={cx} cy={cy} />
              : undefined
          ])
        })
      })
    }
  </g>


const ToolTip = ({ text, cx, cy }) => {
  return [
    <rect
      key="tooltip-bg"
      className="tooltip"
      x={cx - 60}
      y={cy - 50}
      width={120}
      height={30}
      />,
    <text
      key="tooltip-text"
      className="tooltip-text"
      x={cx}
      y={cy - 35}
      >
      {text}
    </text>
  ]
}



// Main Component


export default (state) => {
  const { height, rings, tasks, separators, hoveredTask } = state
  const { showTask, showTooltip, hideTooltip } = state

  const midPoint = height / 2
  const width = midPoint / (rings.length + 1)
  const ringsAndCenter = [...rings, { color: "#fff" }]

  return (
    <svg height={height} width={height}>
      <Rings
        rings={ringsAndCenter}
        width={width}
        midPoint={midPoint}
        />
      <Separators
        separators={separators}
        width={width}
        midPoint={midPoint}
        />
      <Tasks
        rings={rings}
        tasks={tasks}
        width={width}
        midPoint={midPoint}
        hoveredTask={hoveredTask}
        showTask={showTask}
        showTooltip={showTooltip}
        hideTooltip={hideTooltip}
        />
    </svg>
  )
}
