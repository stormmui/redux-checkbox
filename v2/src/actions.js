import fetch from "cross-fetch";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export function selectSubreddit(datadir) {
  return {
    type: SELECT_SUBREDDIT,
    datadir
  };
}

export function invalidateSubreddit(datadir) {
  return {
    type: INVALIDATE_SUBREDDIT,
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
  const posts = state.postsBySubreddit[datadir];
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
