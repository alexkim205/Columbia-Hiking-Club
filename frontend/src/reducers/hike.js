const initialState = {
  hikeIsLoading: true,
  hikeReceived: false,
  hikeReqIsLoading: true,
  hikeReqReceived: false,
  hikes: null,
  // user: false,
  errors: {},
};

export default function hike (state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case 'HIKE_LOADING':
      return {
        ...state,
        hikeIsLoading: true,
        hikeReceived: false,
      };

    case 'HIKE_LOADED':
      return {
        ...state,
        hikes: action.hikes,
        hikeIsLoading: false,
        hikeReceived: true,
      };

    case 'HIKE_ERROR':
      // localStorage.removeItem("token");
      return {
        ...state,
        errors: action.data,
        hikeIsLoading: false,
        hikeReceived: false,
      };

    case 'REQUEST_LOADING':
      return {
        ...state,
        hikeReqIsLoading: true,
        hikeReqReceived: false,
      };

    case 'REQUEST_SUCCESSFUL':
      return {
        ...state,
        hikes: action.hikes,
        hikeReqIsLoading: false,
        hikeReqReceived: true,
      };

    case 'REQUEST_FAILED':
      return {
        ...state,
        errors: action.hikes,
        hikeReqIsLoading: false,
        hikeReqReceived: true,
      };

    default:
      return state;
  }
}
