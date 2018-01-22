import React from "react"
import { connect } from "react-redux"


require("./style.scss")



// React Redux Bindings

const mapStateToProps = (state) => state


const mapDispatchToProps = (dispatch) => {
  return {}
}



// Main Component

const main = () =>
  <h1>Overview</h1>



// Connected Main Component

export default connect(mapStateToProps, mapDispatchToProps)(main)
