import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Comments from './Comments';
import './FullPost.css';

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModalImage from "react-modal-image";

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import ModeCommentIcon from "@material-ui/icons/ModeComment";

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

    formatDateAndTime = (dateTime) => {
        dateTime = new Date(dateTime);
        console.log("dateTime: ", dateTime)
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = '0' + (today.getMonth() + 1).toString().slice(-2);
        const currentDay = today.getDate().toString().slice(-2);

        const getYear = dateTime.getFullYear();

        const getDay = dateTime.getDate().toString().slice(-2);


        const getHour = dateTime.getHours();
        const getMinute = ('0' + dateTime.getMinutes()).toString().slice(-2);
        const timeStamp = getHour > 11 ?
            (getHour - 12).toString() + ':' + getMinute + 'pm' :
            getHour + ':' + getMinute + 'am';

        // console.log('getYear: ' , getYear);
        // console.log('getMonth: ' , getMonth);
        // console.log('getDay: ' , getDay);
        // console.log('getHour: ' , getHour);
        // console.log('getMinute: ' , getMinute);

        const yearDifference = (currentYear - getYear) * 30;
        const dayDifference = Math.abs(currentDay - getDay) > 30 ? Math.abs(currentDay - getDay) + monthDifference : Math.abs(currentDay - getDay);
        const getMonth = '0' + (dateTime.getMonth() + 1).toString().slice(-2);
        const monthDifference = (currentMonth - getMonth) * 30;


        // console.log('currentDay: ', currentDay);
        // console.log('getDay: ', getDay);
        // console.log('difference: ', dayDifference);

        console.log('timestamp: ', timeStamp);

        const result = dayDifference === 0 ? 'Today' : (dayDifference > 1 ? dayDifference + ' days ago ' : 'Yesterday');
        // console.log('result: ', result);
        return result === 'Today' || result === 'Yesterday' ? result + ' ' + timeStamp : result;
    }

    render() {
        let post = null;
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
                        <div className="post">
                            <div className="post-sidebar">
                                {this.props.isAuth ? <KeyboardArrowUpIcon className="upvote" onClick={() => { this.upvotePostHandler(this.state.loadedPost._id, this.state.loadedPost.upvotes, this.state.loadedPost.liked_by, this.state.loadedPost.disliked_by) }} /> : <KeyboardArrowUpIcon />}
                                <span>{this.state.loadedPost.upvotes}</span>
                                {this.props.isAuth ? <KeyboardArrowDownIcon className="downvote" onClick={() => { this.downvotePostHandler(this.state.loadedPost._id, this.state.loadedPost.upvotes, this.state.loadedPost.liked_by, this.state.loadedPost.disliked_by) }} /> : <KeyboardArrowDownIcon />}
                            </div>
                            <div className="post-title">
                                <img src={this.state.loadedPost.image_src} />
                                {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
                                <span className="post-user">Posted by <Link to={"/users/" + this.state.loadedPost.username}>{this.state.loadedPost.username}</Link><br></br>{this.formatDateAndTime(this.state.loadedPost.date)}</span>
                                <span className="post-category"><em>{this.state.loadedPost.category}</em></span>
                            </div>

                            <div className="spacer"></div>

                            <div className="post-body">
                                <span className="title">{this.state.loadedPost.title}</span>
                                <span className="description">{this.state.loadedPost.description}</span>
                                {this.state.loadedPost.image_src && <img src={this.state.loadedPost.image_src} style={{ width: 200, height: 200 }} />}
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