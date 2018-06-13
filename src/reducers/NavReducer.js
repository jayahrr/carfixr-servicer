import AppNavigation from '../navigators/AppNavigation'

const NavReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}

export default NavReducer
