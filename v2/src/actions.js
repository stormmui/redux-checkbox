import fetch from "cross-fetch";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_DATADIR = "ADD_DATADIR";
export const SELECT_DATADIR = "SELECT_DATADIR";
export const INVALIDATE_DATADIR = "INVALIDATE_DATADIR";

const dataMap = {
  data1: "data1",
  data2: "data2",
  data3: "data3",
  data4: "data4",
  data5: "data5"
};

export const addDatadir = datadir => {
  return {
    type: ADD_DATADIR,
    datadir
  }
}

export const selectDatadir = datadir => {
  return {
    type: SELECT_DATADIR,
    datadir
  };
};

export const invalidateDatadir = datadir => {
  return {
    type: INVALIDATE_DATADIR,
    datadir
  };
};

export const requestPosts = datadir => {
  return {
    type: REQUEST_POSTS,
    datadir
  };
};

export const receivePosts = (datadir, json) => {
  return {
    type: RECEIVE_POSTS,
    datadir,
    files: json.map(child => child),
    receivedAt: Date.now()
  };
};

export const fetchPosts = datadir => {
  // this template can be eventually pushed up into the datamap
  // when you are pulling data from different github repos
  const template = "https://api.github.com/repos/stormasm/ghdata/contents/";
  const dir = template + dataMap[datadir];

  return dispatch => {
    dispatch(requestPosts(datadir));
    return fetch(dir)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(datadir, json)));
  };
};

export const shouldFetchPosts = (state, datadir) => {
  const files = state.filesByDatadir[datadir];
  if (!files) {
    return true;
  } else if (files.isFetching) {
    return false;
  } else {
    return files.didInvalidate;
  }
};

export const fetchPostsIfNeeded = datadir => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), datadir)) {
      return dispatch(fetchPosts(datadir));
    }
  };
};
