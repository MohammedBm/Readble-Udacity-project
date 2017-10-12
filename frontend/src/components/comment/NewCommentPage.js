import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createComment } from '../../actions/CommentActions'
import { getid } from '../../utils/helpers'

class NewCommentPage extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const postId = this.props.match.params.postId
    const commendBody = e.target.body.value
    const author = e.target.author.value

    console.log(commendBody)
    if (commendBody === "" || author === "") {
      alert("Both fields are mandatory");
    } else {
      const submitComment = {
        id: getid(),
        parentId: postId,
        timestamp: Date.now(),
        body: commendBody,
        author: author
      }
      this.props.createComment(submitComment, postId,
        () => this.props.history.push(`/post/${postId}`))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="form-style">
          <li className='form-group'>
            <label>Name <span className="required">*</span></label>
            <input type="text" name="author" className=" form-control" />
          </li>
          <li className='form-group'>
            <label>Comment <span className="required">*</span></label>
            <textarea name="body" id="field5" className="form-control textarea-height"></textarea>
          </li>
          <button className='btn btn-outline-primary'>Submit</button>
        </ul>
      </form>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  console.log("state", this.state)
  return {
    posts: posts,
  }
}

export default connect(mapStateToProps, { createComment })(NewCommentPage)
