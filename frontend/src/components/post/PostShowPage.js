import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatTimestamp } from '../../utils/helpers'
import * as actions from '../../actions/CommentActions'

class PostShowPage extends Component {
  componentDidMount() {
    this.props.fetchCommentForPost(this.props.post.id)
  }

  render() {
    const { post, comments, votePost, fetchAllPosts } = this.props

    return (
      <div>

        {post && (
          <div className="card">
            <div className="card-body">
              <Link to={`/${post.category}/${post.id}`}>
                <div className="card-title"><h3>{post.title}</h3></div>
              </Link>
              <div className="card-text"><p>{post.body}</p></div>

              <div>
                <button className='btn btn-outline-success' onClick={() => {
                  votePost(post.id, "upVote")
                  fetchAllPosts()
                }} >
                  Like
                </button>
                <button className='btn btn-outline-danger' onClick={() => {
                  votePost(post.id, "downVote")
                  fetchAllPosts()
                }}>
                  Dislike
                </button>
              </div>
              <div>
                {post.voteScore} votes {comments && comments ? comments.length : 0} comments
              </div>
            </div>
            <div>
              <div><p><b>Category: </b> {post.category}</p></div>
              <div><p><b>Author: </b> {post.author}</p></div>
              <div><p><b>Time: </b> {formatTimestamp(post.timestamp)}</p></div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments }, { post }) {
  return {
    comments: comments[post.id]
  }
}

export default connect(mapStateToProps, actions)(PostShowPage)
