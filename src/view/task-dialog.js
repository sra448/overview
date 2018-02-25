import React from "react"
import { format } from "date-fns"
import Dialog, { DialogTitle } from 'material-ui/Dialog'


export default ({ task, categories, changeField, save, close, destroy }) => {
  return (
    <Dialog onClose={close} aria-labelledby="add task" open={true}>
      <div className="dialog">
        <div className="form">
          <div>
            <label>Text</label>
            <input value={task.text} onChange={changeField("text")} autoFocus={true} />
          </div>
          <div>
            <label>Due At</label>
            <input type="date" value={format(task.date, "YYYY-MM-DD")} onChange={changeField("date")}  />
          </div>
          <div>
            <label>Category</label>
            <select value={task.category} onChange={changeField("category")}>
              { categories.map(({ name, color }) =>
                <option key={name} value={name}>{ name }</option>
              )}
            </select>
          </div >
        </div >
        <div className="footer">
          <div>
            <button onClick={destroy(task.id)}>Delete</button>
          </div>
          <div className="spacer" />
          <div>
            <button onClick={close}>Cancel</button>
          </div>
          <div>
            <button onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
