export const getHikes = () => {
  return (dispatch, getState) => {
    dispatch({type: "HIKE_LOADING"});

    let headers = {
      "Content-type": "application/json"
    };

    return fetch("/api/hikes/", {headers,})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.error("Server error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          dispatch({type: 'HIKE_LOADED', hikes: res.data});
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "HIKE_ERROR", hikes: res.data});
          throw res.data
        }
      })
  }
};
