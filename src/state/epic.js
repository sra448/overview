import { Observable } from "rxjs"


const mouseMove = Observable.fromEvent(document, "mousemove")
const mouseUp = Observable.fromEvent(document, "mouseup")


export default (action$, store) => {
  return action$
    .ofType("START_DRAW_CONNECTION")
    .switchMap(({ taskId, x, y }) => {
      return mouseMove
        .map(({ offsetX, offsetY, target }) => {
          return { type: "TEMP_EDGE_CHANGE_POSITION", x: offsetX, y: offsetY, target }
        })
        .startWith({ type: "TEMP_EDGE_ADD", x, y, taskId })
        .takeUntil(mouseUp)
        .concat(Observable.of({ type: "TEMP_EDGE_CLOSE" }))
    })
}
