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
          <div className="card" key={comment.id}>
            <div className='card-header'>
              By <strong>{comment.author}</strong>
            </div>
            <div className='card-body'>
              <p>{comment.body}</p>
              <div><p>at {formatTimestamp(comment.timestamp)}</p></div>

              <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
                <button className='btn btn-outline-success'>Edit</button>
              </Link>
            <button className='btn btn-outline-danger' onClick={() => this.onCommentDelete(comment)}>Delete</button>
            </div>
            <div className="card-footer">
              <div>
                <button className='btn btn-outline-success' onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "upVote")
                }}>
                  Like
                </button>
                {comment.voteScore} votes
                <button className='btn btn-outline-danger' onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "downVote")
                }}>Dislike</button>
                </div>
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
