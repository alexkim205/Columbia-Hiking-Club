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


export const request = (
  date_of_hike,
  destination,
  description,
  difficulty,
  want_to_lead,
) => {
  return (dispatch, getState) => {
    dispatch({type: "HIKE_LOADING"});

    let headers = {
      "Content-type": "application/json"
    };
    let body = JSON.stringify({
      date_of_hike,
      destination,
      description,
      difficulty,
      want_to_lead,
    });

    return fetch("/api/hike-reqs/register", {headers, body, method: 'POST'})
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
          dispatch({type: 'REQUEST_SUCCESSFUL', hikes: res.data});
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "REQUEST_FAILED", hikes: res.data});
          throw res.data
        }
      })
  }
};
