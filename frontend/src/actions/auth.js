export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: 'USER_LOADING'});

    const token = getState().auth.token;

    let headers = {
      'Content-type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
      // headers["Authorization"] = `Token
      // 5991cce5b9af77999f31eb85a1347aff7d9321062e572a34ac9311aa0e3f2de6`
    }
    return fetch('/api/hikers/me/', {headers}).then(res => {
      if (res.status < 500) {
        return res.json().then(data => {
          return {status: res.status, data};
        });
      } else {
        console.error('Server error!');
        throw res;
      }
    }).then(res => {
      if (res.status === 201 || res.status === 200) {
        dispatch({type: 'USER_LOADED', user: res.data});
        return res.data;
      } else if (res.status >= 400 && res.status < 500) {
        dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
        throw res.data;
      }
    });
  };
};

export const login = (email, password) => {
  return (dispatch, getState) => {
    let headers = {'Content-Type': 'application/json'};
    let body = JSON.stringify({email, password});

    return fetch('/api/auth/login/', {headers, body, method: 'POST'}).
      then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log('Server Error!');
          throw res;
        }
      }).
      then(res => {
        if (res.status === 201 || res.status === 200) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
          throw res.data;
        } else {
          dispatch({type: 'LOGIN_FAILED', data: res.data});
          throw res.data;
        }
      });
  };
};

export const register = (first_name, last_name, email, password) => {
  return (dispatch, getState) => {
    let headers = {'Content-Type': 'application/json'};
    let body = JSON.stringify({first_name, last_name, email, password});

    return fetch('/api/auth/register/', {headers, body, method: 'POST'}).
      then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log('Server Error!');
          throw res;
        }
      }).
      then(res => {
        if (res.status === 201 || res.status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
          throw res.data;
        } else {
          dispatch({type: 'REGISTRATION_FAILED', data: res.data});
          throw res.data;
        }
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    let headers = {'Content-Type': 'application/json'};

    return fetch('/api/auth/logout/', {headers, body: '', method: 'POST'}).
      then(res => {
        if (res.status === 201 || res.status === 200) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log('Server Error!');
          throw res;
        }
      }).
      then(res => {
        if (res.status === 201 || res.status === 200) {
          dispatch({type: 'LOGOUT_SUCCESSFUL'});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
          throw res.data;
        }
      });
  };
};
