import React from "react"


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
    <line x1={midPoint} y1={midPoint - width} x2={midPoint} y2={0} stroke="#00000040" strokeWidth="2" />
    { separators.map(([angle, _]) => {
      const x2 = midPoint + midPoint * Math.cos(Math.PI * angle / 180.0)
      const y2 = midPoint + midPoint * Math.sin(Math.PI * angle / 180.0)

      return (
        <line key={angle} x1={midPoint} y1={midPoint} x2={x2} y2={y2} stroke="#fff" />
      )
    }) }
  </g>


const Tasks = ({ rings, tasks, midPoint, width, hoveredTask, showTask, showTooltip, hideTooltip }) =>
  <g>
    { rings.map(({ name }, i) => {
      const invserseI = rings.length - i + 1
      return tasks
        .filter(({ category }) => category === name)
        .map(({ id, angle, text }) => {
          const cx = midPoint + (invserseI * width - width/2) * Math.cos(Math.PI * angle / 180.0)
          const cy = midPoint + (invserseI * width - width/2) * Math.sin(Math.PI * angle / 180.0)

          if (hoveredTask === id) {
            return [
              <rect
                key={`${id}-tooltip`}
                className="tooltip"
                x={cx - 60}
                y={cy - 50}
                width={120}
                height={30} />,
              <text
                key={`${id}-text`}
                className="tooltip-text"
                x={cx}
                y={cy - 35}>{text}</text>,
              <circle
                key={id}
                className="task"
                cx={cx}
                cy={cy}
                fill="black"
                onClick={showTask(id)}
                onMouseOver={showTooltip(id)}
                onMouseOut={hideTooltip}
                />
            ]
          } else {
            return (
              <circle
                key={angle}
                className="task"
                cx={cx}
                cy={cy}
                fill="black"
                onClick={showTask(id)}
                onMouseOver={showTooltip(id)}
                onMouseOut={hideTooltip}
                />
              )
          }
        })
      })
    }
  </g>


export default ({ height, rings, tasks, separators, hoveredTask, showTask, showTooltip, hideTooltip }) => {
  const midPoint = height / 2
  const width = midPoint / (rings.length + 1)
  const ringsAndCenter = [...rings, { color: "#fff" }]

  return (
    <svg height={height} width={height}>
      <Rings rings={ringsAndCenter} width={width} midPoint={midPoint} />
      <Separators separators={separators} width={width} midPoint={midPoint} />
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
