const initialState = {
  hikeIsLoading: true,
  hikeReceived: false,
  hikeReqIsLoading: true,
  hikeReqReceived: false,
  isRegistered: false,
  hikes: null,
  hike: null,
  hikeReq: null,
  // user: false,
  errors: {},
};

export default function hike (state = initialState, action) {
  // console.log(state);
  switch (action.type) {
    case 'HIKE_LOADING':
      return {
        ...state,
        hikeIsLoading: true,
        hikeReceived: false,
        isRegistered: false,
      };

    case 'HIKES_LOADED':
      return {
        ...state,
        hikes: action.hikes,
        hikeIsLoading: false,
        hikeReceived: true,
      };

    case 'HIKE_LOADED':
      return {
        ...state,
        hike: action.hikes,
        hikeIsLoading: false,
        hikeReceived: true,
      };

    case 'HIKES_ERROR':
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
        hikeReq: action.hikes,
        hikeReqIsLoading: false,
        hikeReqReceived: true,
      };

    case 'REQUEST_FAILED':
      return {
        ...state,
        errors: action.hikes,
        hikeReqIsLoading: false,
        hikeReqReceived: true,
        hikeReq: null,
      };

    case 'REGISTER_SUCCESSFUL':
    case 'UNREGISTER_UNSUCCESSFUL':
      return {
        ...state,
        isRegistered: true,
      }

    case 'REGISTER_UNSUCCESSFUL':
    case 'UNREGISTER_SUCCESSFUL':
      return {
        ...state,
        isRegistered: false,
      };

    default:
      return state;
  }
}
