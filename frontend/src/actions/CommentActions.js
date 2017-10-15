import * as API from '../utils/api'
import * as Types from './type';

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

export const updateComment = (commentId, parentId, timestamp, body, callback) => {
  return (dispatch) => {
    API.updateComment(commentId, timestamp, body)
      .then(updatedComment => {
        dispatch({ type: Types.UPDATE_COMMENT, updatedComment, commentId, parentId })
      }).then(() => callback())
  }
}

export const deleteComment = (commentId, callback) => {
  return (dispatch) => {
    API.deleteComment(commentId).then(() => callback())
    dispatch({ type: Types.DELETE_COMMENT, commentId })
  }
}

export const voteComment = (commentId, parentId, option) => {
  return (dispatch) => {
    API.voteComment(commentId, option).then(updatedComment => {
      dispatch({ type: Types.VOTE_COMMENT, updatedComment, commentId, parentId })
    })
  }
}

export const votePost = (postId, option) => {
  return (dispatch) => {
    API.votePost(postId, option).then(post => {
      dispatch({ type: Types.VOTE_POST, postId, option })
    })
  }
}

export const fetchAllPosts = () => {
  return (dispatch) => {
    API.fetchPosts().then(posts => {
      dispatch({ type: Types.FETCH_POSTS, posts })
    })
  }
}

export const deletePost = (postId, callback) => {
  return dispatch => {
    API.deletePost(postId).then(() => callback())
    dispatch({ type: Types.DELETE_POST, postId })
  }
}
