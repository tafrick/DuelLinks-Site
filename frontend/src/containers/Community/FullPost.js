import React, { Component } from 'react';
import axios from 'axios';

import Comments from './Comments';
import './FullPost.css';

class FullPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedPost: null,
            loadedcomments: [],
            username: 'Weevil',
            newCommentBody: '',
            postID: ''
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
                this.setState({ loadedPost: post, postID: postId });
            })
            .catch(err => {
                console.error(err.message);
            })
        axios.get('http://localhost:9000/comments/postId=/' + postId)
            .then(response => {
                const comments = [...response.data];
                this.setState({ loadedcomments: comments });
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    postDataHandler = () => {
        const newComment = {
            username: this.state.username,
            body: this.state.newCommentBody,
            postId: this.state.postID
        };
        axios.post('http://localhost:9000/comments', newComment)
            .then(response => {
                console.log(response);
                this.updatePostComments(this.state.postID)
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    updatePostComments(postId) {
        let updatedComments = [...this.state.loadedcomments];
        const updatedPost = { comments: updatedComments };
        axios.patch('http://localhost:9000/posts/' + postId, updatedPost)
            .then(response => {
                console.log(response.data);
                this.props.history.go('/community' + this.state.postID);
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    render() {
        let post = null;
        let postComments = null;
        if (this.state.loadedPost) {
            post = (
                <div>
                    <h4>{this.state.loadedPost.title}</h4>
                    <p>{this.state.loadedPost.description}</p>
                    <p>{this.state.loadedPost.username}</p>
                    <p>{this.state.loadedPost.upvotes}</p>
                    <img src={this.state.loadedPost.image_src} alt={this.state.loadedPost.title} />
                </div>
            );
            postComments = this.state.loadedcomments.map((comment, index) => (
                <Comments
                    upvotes={comment.upvotes}
                    username={comment.username}
                    body={comment.body}
                    time={comment.date} />
            ))
        }
        return (
            <div>
                {post}

                <div className="NewComment">
                    <h1>Add a Comment</h1>
                    <label>Body</label>
                    <textarea rows="4" value={this.state.newCommentBody} onChange={(event) => this.setState({ newCommentBody: event.target.value })} />
                    <label>Username</label>
                    <select value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })}>
                        <option value="Weevil">Weevil</option>
                        <option value="Rex">Rex</option>
                        <option value="Benny">Benny</option>
                        <option value="Tyler">Tyler</option>
                        <option value="Jasko">Jasko</option>
                        <option value="Joey">Joey</option>
                        <option value="Kaiba">Kaiba</option>
                        <option value="Tristan">Tristan</option>
                    </select>
                    <button onClick={this.postDataHandler}>Add Comment</button>
                </div>

                {postComments}
            </div>
        );
    }
}

export default FullPost;