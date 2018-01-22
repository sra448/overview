
const initialState = {
  tasks: []
}


export default (state = initialState, action) => {
  switch (action.type) {

    // case "GAME_STATE_CHANGE":
    //   return updateGameState(state, action.state)
    //
    // case "SWITCH_PLAYER":
    //   return switchPlayer(state, action.nextPlayer)

    default:
      return state
  }
}
