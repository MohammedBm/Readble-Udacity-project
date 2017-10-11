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
        <div className="nav-header">
          <Link className="home" to="/">
            <p>Readble</p>
          </Link>
          <Link className="new-post" to="/new">
            <p>New Post</p>
          </Link>
        </div>

        <div className="filters">
          <div className="category-changer">
            <p>Choose Category</p>
            {categories && categories.map(category => (
              <Link key={category.name} to={`/${category.path}`}>
                <button>{category.name}</button>
              </Link>
            ))}
          </div>

          <div className="sort-changer">
            <p>Sort By</p>
            <button onClick={() => sortPost("timestamp")}>Time</button>
            <button onClick={() => sortPost("voteScore")}>Vote Score</button>
          </div>
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
