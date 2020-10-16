import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import './FullPost.css';
import Button from '@material-ui/core/Button';
import ModalImage from "react-modal-image";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import moment from "moment";

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
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const postId = this.props.match.params.postId;
        axios.get('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/posts/' + postId)
            .then(response => {
                const post = { ...response.data };
                this.setState({ loadedPost: post, postID: postId });
            })
            .catch(err => {
                console.error(err.message);
            })
        axios.get('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments/postId=/' + postId)
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
        axios.post('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments', newComment)
            .then(response => {
                this.updatePostComments(this.state.postID)
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    updatePostComments(postId) {
        let updatedComments = [...this.state.loadedcomments];
        const updatedPost = { comments: updatedComments };
        axios.patch('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/posts/' + postId, updatedPost)
            .then(response => {
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
                axios.patch('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments/' + commentID, updatedComment)
                    .then(response => {
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
                axios.patch('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments/' + commentID, updatedComment)
                    .then(response => {
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
                axios.patch('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments/' + commentID, updatedComment)
                    .then(response => {
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
                axios.patch('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments/' + commentID, updatedDownComment)
                    .then(response => {
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
                axios.patch('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments/' + commentID, updatedDownComment)
                    .then(response => {
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
                axios.patch('http://ec2-3-219-83-187.compute-1.amazonaws.com:5000/comments/' + commentID, updatedDownComment)
                    .then(response => {
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

    formatDateAndTime = (dateTime) => {
        dateTime = new Date(dateTime);
        const result = moment(dateTime).fromNow();
        return result;
    }

    render() {
        let postComments = null;
        if (this.state.loadedPost) {
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
            <div className="Page-wrapper" style={{ textAlign: "center" }}>
                {this.state.loadedPost ?
                    <div className="posts-wrapper">
                        <h1>{this.state.loadedPost.title}</h1>
                        <div className="post">
                            <div className="post-sidebar">
                                {this.props.isAuth ? <KeyboardArrowUpIcon className="upvote" onClick={() => { this.upvotePostHandler(this.state.loadedPost._id, this.state.loadedPost.upvotes, this.state.loadedPost.liked_by, this.state.loadedPost.disliked_by) }} /> : <KeyboardArrowUpIcon />}
                                <span>{this.state.loadedPost.upvotes}</span>
                                {this.props.isAuth ? <KeyboardArrowDownIcon className="downvote" onClick={() => { this.downvotePostHandler(this.state.loadedPost._id, this.state.loadedPost.upvotes, this.state.loadedPost.liked_by, this.state.loadedPost.disliked_by) }} /> : <KeyboardArrowDownIcon />}
                            </div>
                            <div className="post-title">
                                {/* <img src={this.state.loadedPost.image_src} alt={this.state.loadedPost.image_src}/> */}
                                {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
                                <span className="post-username"><Link to={"/users/" + this.state.loadedPost.username}>{this.state.loadedPost.username}</Link></span>

                                <span className="post-category"><em>{this.state.loadedPost.category}</em></span>

                            </div>

                            <div className="spacer"></div>
                            <div className="post-body">
                                <span className="post-user">{this.formatDateAndTime(this.state.loadedPost.date)}</span>
                                <br /><hr />
                                <span className="fullpost-description">{this.state.loadedPost.description}</span>
                                <br />
                                {this.state.loadedPost.image_src && <ModalImage small={this.state.loadedPost.image_src} large={this.state.loadedPost.image_src} alt={""} className="modal" />}
                            </div>
                        </div>
                    </div>
                    : null}
                <div className="comment-list">
                    <ul>
                        {postComments}
                    </ul>
                </div>
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