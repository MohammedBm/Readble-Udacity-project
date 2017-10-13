import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as commentActions from '../../actions/CommentActions'

class EditCommentPage extends Component {

  componentDidMount() {
    this.props.fetchCommentForPost(this.props.match.params.postId)
  }

  updateComment = (e) => {
    e.preventDefault()
    const commentId = this.props.comment.id
    const postId = this.props.comment.parentId
    const timestamp = Date.now()
    const body = e.target.body.value

    body === undefined ? alert('Comment cannot be empty') :       this.props.updateComment(commentId, postId, timestamp, body,
            () => this.props.history.push(`/post/${postId}`))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.updateComment}>
          <h2>Edit Comment</h2>
          <ul className="form-style">
            <li className='form-group'>
              <label>Comment <span className="required">*</span></label>
              <textarea defaultValue={this.props.comment.body} name="body" id="field5" className="form-control textarea-height"></textarea>
            </li>
            <button className='btn btn-outline-primary'>Update</button>
            <Link to={`/post/${this.props.comment.parentId}`}>
              <button className='btn btn-outline-danger'>Cancel</button>
            </Link>
          </ul>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    comment: _.find(comments[match.params.postId], { id: match.params.commentId })
  }
}

export default connect(mapStateToProps, commentActions)(EditCommentPage)
