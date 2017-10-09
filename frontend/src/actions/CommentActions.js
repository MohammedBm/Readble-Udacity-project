import * as API from '../utils/api'
import * as Types from './index.js';

export const fetchCommentForPost = (parentId) => {
  return (dispatch) => {
    API.fetchComment(parentId).then(comments => {
      dispatch({ type: Types.FETCH_COMMENTS, parentId, comments })
    })
  }
}

export const createComment = (comment, parentId, callback) => {
  return (dispatch) => {
    API.addComment(comment).then(comment => {
      dispatch({ type: Types.ADD_COMMENT, parentId, comment })
    }).then(() => callback())
  }
}
