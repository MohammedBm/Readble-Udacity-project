import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTimestamp } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import * as commentActions from '../../actions/CommentActions'

class PostCommentPage extends Component {

  onCommentDelete = (comment) => {
    let parentId = comment.parentId
    this.props.deleteComment(comment.id, () => {
      this.props.history.push(`/post/${parentId}`)
      this.props.fetchCommentForPost(comment.parentId)
    })
  }

  render() {
    return (
      <div>
        {this.props.comments.map(comment => (
          <div className="comment" key={comment.id}>
            <div>
              <p>{comment.body}</p>
              <div className="comment-author"><p> by <b>{comment.author}</b> at {formatTimestamp(comment.timestamp)}</p></div>
              <div className="post-likes">
                <button onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "upVote")
                }}>
                  Like
                </button>
                <button onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "downVote")
                }}>Dislike</button>
                {comment.voteScore} votes
                </div>
            </div>
            <div className="button-action">
              <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.onCommentDelete(comment)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, commentActions)(PostCommentPage)
