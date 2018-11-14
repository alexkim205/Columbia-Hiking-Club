const initialState = {
  isLoading: true,
  received: false,
  hikes: null,
  // user: false,
  errors: {}
}

export default function hike (state = initialState, action) {
  console.log(state)
  switch (action.type) {
    case 'HIKE_LOADING':
      return { ...state, isLoading: true, received: false }

    case 'HIKE_LOADED':
      return {
        ...state,
        hikes: action.hikes,
        isLoading: false,
        received: true
      }

    case 'HIKE_ERROR':
      // localStorage.removeItem("token");
      return {
        ...state,
        errors: action.data,
        isLoading: false,
        received: false
      }

    case 'REQUEST_SUCCESSFUL':
      return {
        ...state,
        hikes: action.hikes,
        isLoading: false,
        received: true
      }

    case 'REQUEST_FAILED':
      return {
        ...state,
        errors: action.data,
        isLoading: false,
        received: false
      }

    default:
      return state
  }
}
