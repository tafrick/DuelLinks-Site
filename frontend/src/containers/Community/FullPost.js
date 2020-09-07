import React, { Component } from 'react';
import axios from 'axios';

class FullPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedPost: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const postId = this.props.match.params.postId;
        axios.get('http://localhost:9000/posts/' + postId)
            .then(response => {
                const post = { ...response.data };
                this.setState({ loadedPost: post });
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    render() {
        let post = null;
        if (this.state.loadedPost) {
            post = (
                <div>
                    <h4>{this.state.loadedPost.title}</h4>
                    <p>{this.state.loadedPost.description}</p>
                    <p>{this.state.loadedPost.username}</p>
                    <p>{this.state.loadedPost.upvotes}</p>
                    <p>{this.state.loadedPost.comments}</p>
                </div>
            );
        }
        return (
            <div>
                {post}
            </div>
        );
    }
}

export default FullPost;