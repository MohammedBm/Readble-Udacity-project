import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import PostShowPage from '../post/PostShowPage'
import * as actions from '../../actions/PostActions';

class Home extends Component {
  static propTypes = {
    posts: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchAllPosts()
  }

  render() {
    const { posts } = this.props
    return <div>
      {posts.map(post => (
        <PostShowPage key={post.id} post={post} />
      ))}
    </div>
  }
}

function mapStateToProps({ posts }, { match }) {
  const category = match.params.category
  return {
    posts: category ? posts.filter(post => post.category === category) : posts
  }
}

export default connect(mapStateToProps, actions)(Home)
