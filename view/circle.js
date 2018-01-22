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
    <line x1={midPoint} y1={midPoint - width} x2={midPoint} y2={0} stroke="#00000040" />
    { separators.map(([angle, _]) => {
      const x2 = midPoint + midPoint * Math.cos(Math.PI * angle / 180.0)
      const y2 = midPoint + midPoint * Math.sin(Math.PI * angle / 180.0)

      return (
        <line key={angle} x1={midPoint} y1={midPoint} x2={x2} y2={y2} stroke="#fff" />
      )
    }) }
  </g>


const Tasks = ({ rings, tasks, midPoint, width }) =>
  <g>
    { rings.map(({ name }, i) => {
        const invserseI = rings.length - i
        return tasks
          .filter(({ category }) => category === name)
          .map(({ angle }) => {
            const cx = midPoint + (invserseI * width - width/2) * Math.cos(Math.PI * angle / 180.0)
            const cy = midPoint + (invserseI * width - width/2) * Math.sin(Math.PI * angle / 180.0)

            // debugger

            return (
              <circle
                key={angle}
                cx={cx}
                cy={cy}
                r="6"
                fill="black"
                />
              )
          })
      })
    }
  </g>


export default ({ height, rings, tasks, separators }) => {
  const midPoint = height / 2
  const width = midPoint / (rings.length + 1)
  const ringsAndCenter = [...rings, { color: "#fff" }]

  return (
    <svg height={height} width={height}>
      <Rings rings={ringsAndCenter} width={width} midPoint={midPoint} />
      <Separators separators={separators} width={width} midPoint={midPoint} />
      <Tasks rings={rings} tasks={tasks} width={width} midPoint={midPoint} />
    </svg>
  )
}
