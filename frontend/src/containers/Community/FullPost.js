import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Comments from './Comments';
import './FullPost.css';

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModalImage from "react-modal-image";

class FullPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedPost: null,
            loadedcomments: [],
            username: 'Weevil',
            newCommentBody: '',
            postID: '',
            displayPost: false
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

    toggleAddComment = () => {
        this.setState({
            displayPost: !this.state.displayPost
        })
    }

    render() {
        let post = null;
        let postComments = null;
        if (this.state.loadedPost) {
            post = (
                <>
                <h1 id="title"><u>{this.state.loadedPost.title}</u></h1>
                <div className= "post-wrapper">
                    <div className = "post-sidebar">
                        <ArrowUpwardIcon className="upvote" onClick={this.props.clickedUp} />
                        <p>{this.state.loadedPost.upvotes}</p>
                        <ArrowDownwardIcon className="downvote" onClick={this.props.clickedDown} />
                    </div>
                {/* <span className="Comment-user">Posted By {this.state.loadedPost.username}</span> */}

                    <div className="post-title">
                            {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
                            
                            <h2 className="post-user underline">{this.state.loadedPost.username}</h2>
                            <hr/>
                            <div className="spacer"></div>
                    </div>
                    <div className="post-body">
                        
                        <p>{this.state.loadedPost.description}</p>
                        <ModalImage
                            small={this.state.loadedPost.image_src}
                            large={this.state.loadedPost.image_src}
                            alt={this.state.loadedPost.title}
                            className="modal"
                            />
                        {/* <img src={this.state.loadedPost.image_src}/> */}
                    </div>
                    
                    
                    {/* <img src={this.state.loadedPost.image_src} alt={this.state.loadedPost.title} /> */}
                </div>
                </>
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
            <div style= {{ textAlign: "center"}}>
                {post}
                {postComments}
                <Button variant="contained" color="primary"onClick={this.toggleAddComment}>Add Comment</Button>
                {this.state.displayPost ? (<div className="NewComment">
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
                    <label>Body</label>
                    <textarea rows="4" value={this.state.newCommentBody} onChange={(event) => this.setState({ newCommentBody: event.target.value })} />
                    
                    <Button variant="contained" color="primary" onClick={this.postDataHandler}>Submit Comment </Button>
                </div>) : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, null)(FullPost);