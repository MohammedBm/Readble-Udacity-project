import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import '../App.css';
import { connect } from 'react-redux'
import { sortPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryActions'
import Home from './main/Home'
import NewPostPage from './post/NewPostPage'
import PostDetailPage from './post/PostDetailPage'
import EditPostPage from './post/EditPostPage'
import NewCommentPage from './comment/NewCommentPage'
import EditCommentPage from './comment/EditCommentPage'

class Index extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, sortPost } = this.props

    return (
      <div className="App">
        <nav className=" navbar-expand-lg navbar navbar-dark bg-dark justify-content-between">
          <a className="navbar-brand" href="#">Readble</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Link className="link-to-home navbar-item" to="/">
              <a className="link-to-home">Home</a>
            </Link>
          </div>
          <Link to="/new">
            <button className="btn btn-outline-success submit-Post" type="button">New Post</button>
          </Link>
          </nav>

        <div className='container'>
        <div>
          <div className="categorey">
            <h5>Choose Category</h5>
            {categories && categories.map(category => (
              <Link key={category.name} to={`/${category.path}`}>
                <button className='btn btn-outline-primary'>{category.name}</button>
              </Link>
            ))}
          </div>

          <div className="sort-changer">
            <h5>Sort By</h5>
            <button className='btn btn-outline-primary' onClick={() => sortPost("timestamp")}>Time</button>
            <button className='btn btn-outline-primary' onClick={() => sortPost("voteScore")}>Vote Score</button>
          </div>
        </div>
        <h2>Posts</h2>
      </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewPostPage} />
          <Route exact path="/:category" component={Home} />
          <Route exact path=  "/:category/:postId" component={PostDetailPage} />
          <Route path="/:category/:postId/edit" component={EditPostPage} />
          <Route path="/:category/:postId/comment" component={NewCommentPage} />
          <Route path="/:category/:postId/:commentId/edit" component={EditCommentPage} />
        </Switch>

      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

export default withRouter(connect(mapStateToProps, {
  sortPost,
  fetchCategories
})(Index))
