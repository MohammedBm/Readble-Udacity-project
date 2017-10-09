import * as API from '../utils/api'
import * as Types from './index.js';

export const fetchAllPosts = () => {
  return (dispatch) => {
    API.fetchPosts().then(posts => {
      dispatch({ type: Types.FETCH_POSTS, posts })
    })
  }
}

export const createPost = (post, callback) => {
  return (dispatch) => {
    API.addPost(post).then(() => callback())
    dispatch({ type: Types.ADD_POST, post })
  }
}
