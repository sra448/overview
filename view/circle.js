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


const SegmentTitles = ({ separators, midPoint }) =>
  <g>
    { separators.map(([angle, title]) => {
        const [x, y] = radiusEndpoint(midPoint, angle + 1, midPoint + 6)

        return (
          <text
            key={angle}
            x={x}
            y={y}
            fontSize="11"
            transform={`rotate(${angle + 92 % 360}, ${x}, ${y})`}>
            {title}
          </text>
        )
      })
    }
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


const getDistanceByCategory = (category, categories, width) =>
  (categories.length - categories.findIndex(({ name }) => category === name) + 1) * width - width / 2


const Edges = ({ tasks, rings, midPoint, width }) => {
  return tasks.reduce((acc, { id, angle, category, children}) => {
    const distance = getDistanceByCategory(category, rings, width)
    const [x1, y1] = radiusEndpoint(midPoint, angle, distance)

    const edges = children.map((childId) => {
      const childTask = tasks.find(({ id }) => id == childId)
      const childWidth = getDistanceByCategory(childTask.category, rings, width)
      const [x2, y2] = radiusEndpoint(midPoint, childTask.angle, childWidth)

      return <line
        key={`${id}-${childId}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className="edge"
        />
    })

    return [...acc, ...edges]
  }, [])
}


const Edge = ({ from, to }) => {
  return <line
    x1={from[0]}
    y1={from[1]}
    x2={to[0] - 30 || from[0]}
    y2={to[1] - 30 || from[1]}
    stroke="#000"
    />
}


const Tasks = ({ rings, tasks, midPoint, width, hoveredTask, showTask, showTooltip, hideTooltip, startDrawConnection }) =>
  <g>
    { rings.map(({ name }, i) => {
      const invserseI = rings.length - i + 1
      return tasks
        .filter(({ category }) => category === name)
        .map(({ id, angle, text }) => {
          const [cx, cy] = radiusEndpoint(midPoint, angle, invserseI * width - width / 2)

          return (
            <g
              key={id}
              className="task"
              onMouseOver={showTooltip(id)}
              onMouseOut={hideTooltip}
              >
              <circle
                className="main"
                data-id={id}
                cx={cx}
                cy={cy}
                onClick={showTask(id)}
                onMouseDown={startDrawConnection(id, cx, cy)}
                />
              { hoveredTask === id ?
                <ToolTip key="tooltip" text={text} cx={cx} cy={cy} />
                : undefined
              }
            </g>
          )
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
  const { height, rings, tasks, separators, hoveredTask, tempEdge } = state
  const { showTask, showTooltip, hideTooltip, startDrawConnection } = state

  const midPoint = height / 2
  const width = midPoint / (rings.length + 1)
  const ringsAndCenter = [...rings, { color: "#fff" }]

  return (
    <svg height={height} width={height} id="circle">
      <Rings
        rings={ringsAndCenter}
        width={width}
        midPoint={midPoint}
        />
      <Separators
        separators={separators}
        midPoint={midPoint}
        width={width}
        />
      <SegmentTitles
        separators={separators}
        midPoint={midPoint}
        />
      <Edges
        tasks={tasks}
        rings={rings}
        midPoint={midPoint}
        width={width}
        />
      { tempEdge ?
        <Edge {...tempEdge} /> :
        undefined
      }
      <Tasks
        rings={rings}
        tasks={tasks}
        width={width}
        midPoint={midPoint}
        hoveredTask={hoveredTask}
        showTask={showTask}
        showTooltip={showTooltip}
        hideTooltip={hideTooltip}
        startDrawConnection={startDrawConnection}
        />
    </svg>
  )
}
