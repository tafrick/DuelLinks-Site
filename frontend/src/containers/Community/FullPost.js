import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Comments from './Comments';
import './FullPost.css';

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModalImage from "react-modal-image";

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class FullPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedPost: null,
            loadedcomments: [],
            newCommentBody: '',
            postID: '',
            displayPost: false,
            toggleFullPost: true,
            displayButton: false
        }
    }

    displayButton = () => {
        this.setState({ displayButton: !this.state.displayButton })
    }
    toggleFullPost = () => {
        this.setState({
            // this.toggleFullPost: !this.state.toggleFullPost
            toggleFullPost: !this.state.toggleFullPost
        })
        console.log(this.state.toggleFullPost)
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
            username: this.props.email,
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

    upvoteHandler(commentID, oldUpvotes, likeList, dislikeList) {
        if (this.props.isAuth) {
            let newUpvotes = 0;
            let updatedComment = {};
            let newLikedList = [];
            //case 1
            if (!dislikeList.includes(this.props.email) && !likeList.includes(this.props.email)) {
                newUpvotes = oldUpvotes + 1;
                newLikedList = [...likeList];
                newLikedList.push(this.props.email);
                updatedComment = {
                    upvotes: newUpvotes,
                    liked_by: newLikedList
                }
                axios.patch('http://localhost:9000/comments/' + commentID, updatedComment)
                    .then(response => {
                        console.log("Update Successful!");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err.message);
                    })
            } else if (likeList.includes(this.props.email)) {
                newUpvotes = oldUpvotes - 1;
                newLikedList = [...likeList];
                newLikedList = newLikedList.filter(e => e !== this.props.email);
                updatedComment = {
                    upvotes: newUpvotes,
                    liked_by: newLikedList
                }
                axios.patch('http://localhost:9000/comments/' + commentID, updatedComment)
                    .then(response => {
                        console.log("Update Successful!");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err.message);
                    })
            } else if (dislikeList.includes(this.props.email)) {
                newUpvotes = oldUpvotes + 1;
                let newDislikeList = [...dislikeList];
                newDislikeList = newDislikeList.filter(e => e !== this.props.email);
                newLikedList = [...likeList];
                newLikedList.push(this.props.email);
                updatedComment = {
                    upvotes: newUpvotes,
                    disliked_by: newDislikeList,
                    liked_by: newLikedList
                }
                axios.patch('http://localhost:9000/comments/' + commentID, updatedComment)
                    .then(response => {
                        console.log("Update Successful!");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err.message);
                    })
            }
        } else {
            return 0;
        }
    }

    downvoteHandler(commentID, oldUpvotes, likeList, dislikeList) {
        if (this.props.isAuth) {
            let newDownvotes = 0;
            let updatedDownComment = {};
            let newDislikeList = [];
            //case1
            if (!dislikeList.includes(this.props.email) && !likeList.includes(this.props.email)) {
                newDownvotes = oldUpvotes - 1;
                newDislikeList = [...dislikeList];
                newDislikeList.push(this.props.email);
                updatedDownComment = {
                    upvotes: newDownvotes,
                    disliked_by: newDislikeList
                }
                axios.patch('http://localhost:9000/comments/' + commentID, updatedDownComment)
                    .then(response => {
                        console.log("Update Successful!");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err.message);
                    })
            } else if (dislikeList.includes(this.props.email)) {
                newDownvotes = oldUpvotes + 1;
                newDislikeList = [...dislikeList];
                newDislikeList = newDislikeList.filter(e => e !== this.props.email);
                updatedDownComment = {
                    upvotes: newDownvotes,
                    disliked_by: newDislikeList
                }
                axios.patch('http://localhost:9000/comments/' + commentID, updatedDownComment)
                    .then(response => {
                        console.log("Update Successful!");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err.message);
                    })
            } else if (likeList.includes(this.props.email)) {
                newDownvotes = oldUpvotes - 1;
                let newLikedList = [...likeList];
                newLikedList = newLikedList.filter(e => e !== this.props.email);
                newDislikeList = [...dislikeList];
                newDislikeList.push(this.props.email);
                updatedDownComment = {
                    upvotes: newDownvotes,
                    disliked_by: newDislikeList,
                    liked_by: newLikedList
                }
                axios.patch('http://localhost:9000/comments/' + commentID, updatedDownComment)
                    .then(response => {
                        console.log("Update Successful!");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err.message);
                    })
            }
        } else {
            return 0;
        }
    }

    render() {
        let post = null;
        let postComments = null;
        if (this.state.loadedPost) {
            post = (
                <>
                    <h1 id="title">{this.state.loadedPost.title}</h1>
                    <div className="post-wrapper">
                        <div className="post-sidebar">
                            <KeyboardArrowUpIcon className="upvote" onClick={this.props.clickedUp} />
                            <span>{this.state.loadedPost.upvotes}</span>
                            <KeyboardArrowDownIcon className="downvote" onClick={this.props.clickedDown} />
                        </div>
                        {/* <span className="Comment-user">Posted By {this.state.loadedPost.username}</span> */}

                        <div className="post-title">
                            <span>Posted by </span>
                            {/* <span>Posted by </span> */}
                            <h2 className="post-user underline" style={{ color: "steelblue" }}>{this.state.loadedPost.username}</h2>

                            <hr />
                            <div className="spacer"></div>
                        </div>
                        <div className="post-body">

                            {this.state.loadedPost.description.length > 3000 && this.state.toggleFullPost ? (
                                <div>
                                    {this.state.loadedPost.description.substring(0, 3000)} ...
                                    <br></br>
                                    <br></br>
                                    <span style={{ display: 'flex', justifyContent: 'center' }}><button onClick={this.toggleFullPost}>Show more</button></span>
                                </div>
                            ) : (
                                    <div>
                                        {this.state.loadedPost.description}
                                        {this.state.loadedPost.description.length < 2500 ? '' : <span style={{ display: 'flex', justifyContent: 'center' }}><button onClick={this.toggleFullPost}>Show less</button></span>}
                                        {this.state.loadedPost.image_src === undefined ? ''
                                            : this.state.loadedPost.image_src === '' ? null
                                                : <ModalImage
                                                    small={this.state.loadedPost.image_src}
                                                    large={this.state.loadedPost.image_src}
                                                    alt={this.state.loadedPost.title}
                                                    className="modal"
                                                />}</div>
                                )
                            }

                            {/* <img src={this.state.loadedPost.image_src}/> */}
                        </div>


                        {/* <img src={this.state.loadedPost.image_src} alt={this.state.loadedPost.title} /> */}
                    </div>
                </>
            );
            postComments = this.state.loadedcomments.map((comment, index) => (
                <Comments
                    key={comment._id}
                    upvotes={comment.upvotes}
                    username={comment.username}
                    body={comment.body}
                    time={comment.date}
                    clickedUp={() => { this.upvoteHandler(comment._id, comment.upvotes, comment.liked_by, comment.disliked_by) }}
                    clickedDown={() => { this.downvoteHandler(comment._id, comment.upvotes, comment.liked_by, comment.disliked_by) }}
                />
            ))
        }
        return (
            <div style={{ textAlign: "center" }}>
                {post}
                {postComments}
                <Button variant="contained" color="primary" disabled={!this.props.isAuth} onClick={this.toggleAddComment}>Add Comment</Button>
                {this.state.displayPost ? (<div className="NewComment">
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
        token: state.token,
        isAuth: state.token !== null,
        email: state.userEmail
    }
}

export default connect(mapStateToProps, null)(FullPost);