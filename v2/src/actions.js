import fetch from "cross-fetch";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_DATADIR = "SELECT_DATADIR";
export const INVALIDATE_DATADIR = "INVALIDATE_DATADIR";

export function selectDatadir(datadir) {
  return {
    type: SELECT_DATADIR,
    datadir
  };
}

export function invalidateDatadir(datadir) {
  return {
    type: INVALIDATE_DATADIR,
    datadir
  };
}

function requestPosts(datadir) {
  return {
    type: REQUEST_POSTS,
    datadir
  };
}

function receivePosts(datadir, json) {
  return {
    type: RECEIVE_POSTS,
    datadir,
    posts: json.map(child => child),
    receivedAt: Date.now()
  };
}

function fetchPosts(datadir) {
  return dispatch => {
    dispatch(requestPosts(datadir));
    return fetch(
      "https://api.github.com/repos/stormasm/checkbox-file-selector/contents/src/data/repos"
    )
      .then(response => response.json())
      .then(json => dispatch(receivePosts(datadir, json)));
  };
}

function shouldFetchPosts(state, datadir) {
  const posts = state.postsByDatadir[datadir];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(datadir) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), datadir)) {
      return dispatch(fetchPosts(datadir));
    }
  };
}
