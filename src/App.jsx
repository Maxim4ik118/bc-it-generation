import React from 'react';
import axios from 'axios';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';
// import Details from 'components/Details/Details';

import { fetchPostComments, fetchPosts } from 'services/api';

import css from './App.module.scss';

const styles = {
  color: '#010101',
};

// const productData = [
//   {
//     id: 1,
//     img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
//     price: 10.99,
//     title: 'Taco XXL',
//     discount: {
//       value: 17,
//     },
//   },
//   {
//     id: 2,
//     img: 'https://images.unsplash.com/photo-1668534576765-d9fa656e26c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
//     price: 11.99,
//     title: 'Taco 2XXL',
//     discount: {
//       value: 23,
//     },
//   },
//   {
//     id: 3,
//     img: 'https://plus.unsplash.com/premium_photo-1663924749013-7259f695b183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
//     price: 7.77,
//     title: 'Taco XS',
//   },
//   {
//     id: 4,
//     img: 'https://images.unsplash.com/photo-1667684550432-35d19dd88940?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8cVBZc0R6dkpPWWN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
//     price: 6.66,
//     title: 'Taco M',
//   },
// ];

export class App extends React.Component {
  state = {
    posts: [],
    comments: [],
    isLoading: false,
    error: '',
    selectedPostId: null,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const posts = await fetchPosts();

      this.setState({ posts: posts });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { selectedPostId } = this.state;

    if (selectedPostId !== prevState.selectedPostId) {
      try {
        this.setState({ isLoading: true });
        const comments = await fetchPostComments(selectedPostId);

        this.setState({ comments: comments });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSelectPostId = postId => {
    this.setState({ selectedPostId: postId });
  };

  render() {
    const { isLoading, posts, comments } = this.state;

    const hasError = this.state.error.length > 0;
    return (
      <div style={styles}>
        {hasError && <ErrorIndicator error={this.state.error} />}
        <div className={css.mainWrapper}>
          <div className={css.list}>
            <h2>Posts</h2>
            {isLoading && <Loader />}
            {Array.isArray(posts) &&
              posts.map(post => {
                return (
                  <div
                    key={post.id}
                    className={css.postItem}
                    onClick={() => this.onSelectPostId(post.id)}
                  >
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
                );
              })}
          </div>
          <div className={css.details}>
            <h3>Comments</h3>
            <p>PostId: {this.state.selectedPostId}</p>
            {comments?.length === 0 && (
              <p>
                There are no comments for current post. Please selecte another
                one.
              </p>
            )}
            {Array.isArray(comments) &&
              comments.map(({ id, name, email, body }) => {
                return (
                  <div key={id} className={css.comment}>
                    <h4>Name: {name}</h4>
                    <p>
                      <b>Email:</b> {email}
                    </p>
                    <p>
                      <b>Body:</b> {body}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        {/* <div className={css.productContainer}>
          {productData.map(product => {
            return (
              <Product
                key={product.img}
                image={product.img}
                title={product.title}
                price={product.price}
                discount={product.discount}
              />
            );
          })}
        </div> */}
      </div>
    );
  }
}
