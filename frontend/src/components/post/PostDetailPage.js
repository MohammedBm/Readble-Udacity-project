import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { formatTimestamp } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import { fetchCommentForPost } from '../../actions/CommentActions'
import { fetchAllPosts, votePost, deletePost } from '../../actions/PostActions'
import PostCommentPage from '../comment/PostCommentPage'

class PostDetailPage extends Component {

  componentDidMount() {
    this.props.fetchAllPosts()
    this.props.fetchCommentForPost(this.props.match.params.postId)
  }

  onPostDelete = () => {
    const id = this.props.match.params.postId
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { post, comments, votePost, fetchAllPosts } = this.props
    if(!post) {
      return <div>Not Found</div>
    }
    return (
      <div>
        {post && (
          <div className="card" key={post.id}>
            <div className='card-body'>
              <Link to={`/${post.category}/${post.id}`}>
                <div><h3>{post.title}</h3></div>
              </Link>
              <div className="card-text"><p>{post.body}</p></div>
              <div>
                <button className='btn btn-outline-success' onClick={() => {
                  votePost(post.id, "upVote")
                  fetchAllPosts()
                }}>Like</button>
                <button className='btn btn-outline-danger' onClick={() => {
                  votePost(post.id, "downVote")
                  fetchAllPosts()
                }}>Dislike</button>
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
        <div>
          <Link to={`/${post.category}/${post.id}/edit`}>
            <button className='btn btn-outline-primary'>Edit</button>
          </Link>
          <Link to={`/${post.category}/${post.id}/comment`}>
            <button className='btn btn-outline-success'>Add Comment</button>
          </Link>
          <button className='btn btn-outline-danger'onClick={(e) => this.onPostDelete(e)}>Delete</button>
        </div>
        <h2>
          Comments
        </h2>
        {post && comments && <PostCommentPage category={post.category} comments={comments} history={this.props.history}/>}
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  const post = _.find(posts, { id: match.params.postId })
  return {
    post: post,
    comments: comments[match.params.postId]
  }
}

export default connect(mapStateToProps, {fetchAllPosts, votePost, deletePost, fetchCommentForPost})(PostDetailPage)
