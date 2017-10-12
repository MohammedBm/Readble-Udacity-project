import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createPost } from '../../actions/PostActions'
import { getid } from '../../utils/helpers'

class NewPostPage extends Component {

  addNewPost = (e) => {
    e.preventDefault()
    const title = e.target.title.value;
    const body = e.target.body.value;
    const author = e.target.author.value;
    const category = e.target.category.value;

    const submitPost = {
      id: getid(),
      timestamp: Date.now(),
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      category: e.target.category.value,
    }
    this.props.createPost(submitPost, () => this.props.history.push('/'))
  }

  render() {
    return (
      <form onSubmit={this.addNewPost}>
        <h2>New Post</h2>
        <ul className="form-style">
          <li className='form-group'>
            <label>Name <span className="required">*</span></label>
            <input type="text" name="author" className=" form-control" />
          </li>
          <li className="form-group">
            <label>Title <span className="required">*</span></label>
            <input type="text" name="title" className=" form-control" />
          </li>
          <li className='form-group'>
            <label>Category </label>
            <select name="category" className="form-control">
              {this.props.categories && this.props.categories.map((category) => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </li>
          <li className='form-group'>
            <label>Post <span className="required">*</span></label>
            <textarea name="body" id="field5" className="form-control textarea-height"></textarea>
          </li>
          <button className='btn btn-outline-primary'>Submit </button>
        </ul>
      </form>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts: posts,
    categories: categories
  }
}

export default connect(mapStateToProps, { createPost })(NewPostPage)
