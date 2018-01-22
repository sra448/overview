import React from "react"
import { render } from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"

import reducer from "./state/reducer"
import View from "./view/main"


const store = createStore(reducer)
const app = (
  <Provider store={store}>
    <View />
  </Provider>
)


render(app, document.getElementById("container"))
