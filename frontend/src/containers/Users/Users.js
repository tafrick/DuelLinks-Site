import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModeCommentIcon from "@material-ui/icons/ModeComment";

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPosts: null
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const username = this.props.match.params.user;
        axios.get('http://localhost:9000/posts/username=/' + username)
            .then(response => {
                const posts = [...response.data];
                this.setState({ loadedPosts: posts })
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    upvoteHandler(postId, oldUpvotes, likeList, dislikeList) {
        let newUpvotes = 0;
        let updatedPost = {};
        let newLikedList = [];
        //case 1: not in like or dislike
        if (!dislikeList.includes(this.props.email) && !likeList.includes(this.props.email)) {
            console.log("not in like or dislike");
            newUpvotes = oldUpvotes + 1;
            newLikedList = [...likeList];
            newLikedList.push(this.props.email);
            console.log(newLikedList);
            updatedPost = {
                upvotes: newUpvotes,
                liked_by: newLikedList
            }
            axios.patch('http://localhost:9000/posts/' + postId, updatedPost)
                .then(response => {
                    console.log("Update Successful!");
                    this.props.history.go('/community');
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else if (likeList.includes(this.props.email)) {
            console.log("in like not dislike");
            newUpvotes = oldUpvotes - 1;
            newLikedList = [...likeList];
            newLikedList = newLikedList.filter(e => e !== this.props.email);
            console.log(newLikedList);
            updatedPost = {
                upvotes: newUpvotes,
                liked_by: newLikedList
            }
            axios.patch('http://localhost:9000/posts/' + postId, updatedPost)
                .then(response => {
                    console.log("Update Successful!");
                    this.props.history.go('/community');
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else if (dislikeList.includes(this.props.email)) {
            console.log("in dilsikelike not like");
            newUpvotes = oldUpvotes + 1;
            let newDislikeList = [...dislikeList];
            newDislikeList = newDislikeList.filter(e => e !== this.props.email);
            newLikedList = [...likeList];
            newLikedList.push(this.props.email);
            updatedPost = {
                upvotes: newUpvotes,
                disliked_by: newDislikeList,
                liked_by: newLikedList
            }
            axios.patch('http://localhost:9000/posts/' + postId, updatedPost)
                .then(response => {
                    console.log("Update Successful!");
                    this.props.history.go('/community');
                })
                .catch(err => {
                    console.error(err.message);
                })
        }
    }

    downvoteHandler(postId, oldVotes, likeList, dislikeList) {
        let newDownvotes = 0;
        let updatedDownvotedPost = {};
        let newDislikeList = [];
        //case 1
        if (!dislikeList.includes(this.props.email) && !likeList.includes(this.props.email)) {
            console.log("not on any list");
            newDownvotes = oldVotes - 1;
            newDislikeList = [...dislikeList];
            newDislikeList.push(this.props.email);
            console.log(newDislikeList);
            updatedDownvotedPost = {
                upvotes: newDownvotes,
                disliked_by: newDislikeList
            }
            axios.patch('http://localhost:9000/posts/' + postId, updatedDownvotedPost)
                .then(response => {
                    console.log("Update Successful!");
                    this.props.history.go('/community');
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else if (dislikeList.includes(this.props.email)) {
            newDownvotes = oldVotes + 1;
            newDislikeList = [...dislikeList];
            newDislikeList = newDislikeList.filter(e => e !== this.props.email);
            updatedDownvotedPost = {
                upvotes: newDownvotes,
                disliked_by: newDislikeList
            }
            axios.patch('http://localhost:9000/posts/' + postId, updatedDownvotedPost)
                .then(response => {
                    console.log("Update Successful!");
                    this.props.history.go('/community');
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else if (likeList.includes(this.props.email)) {
            newDownvotes = oldVotes - 1;
            let newLikeList = [...likeList];
            newLikeList = newLikeList.filter(e => e !== this.props.email);
            newDislikeList = [...dislikeList];
            newDislikeList.push(this.props.email);
            updatedDownvotedPost = {
                upvotes: newDownvotes,
                disliked_by: newDislikeList,
                liked_by: newLikeList
            }
            axios.patch('http://localhost:9000/posts/' + postId, updatedDownvotedPost)
                .then(response => {
                    console.log("Update Successful!");
                    this.props.history.go('/community');
                })
                .catch(err => {
                    console.error(err.message);
                })
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
        let posts = [];
        if (this.state.loadedPosts) {
            posts = this.state.loadedPosts.map((post, index) => (
                <div className="posts-wrapper">
                    <div className="post" key={index * Math.random()}>
                        <div className="post-sidebar">
                            {this.props.isAuth ? <KeyboardArrowUpIcon className="upvote" onClick={() => { this.upvoteHandler(post._id, post.upvotes, post.liked_by, post.disliked_by) }} /> : <KeyboardArrowUpIcon />}
                            <span>{post.upvotes}</span>
                            {this.props.isAuth ? <KeyboardArrowDownIcon className="downvote" onClick={() => { this.downvoteHandler(post._id, post.upvotes, post.liked_by, post.disliked_by) }} /> : <KeyboardArrowDownIcon />}
                        </div>
                        <div className="post-title">
                            <img src={post.image_src} />
                            {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
                            <span className="post-user">Posted by <Link to={"/users/" + post.username}>{post.username}</Link><br></br>{this.formatDateAndTime(post.date)}</span>
                            <span className="post-category"><em>{post.category}</em></span>
                        </div>

                        <div className="spacer"></div>

                        <div className="post-body">
                            <span className="title"><Link to={'/community/' + post._id}>{post.title}</Link></span>
                            {post.description.length < 50 ? <span className="description">{post.description}</span> : <span className="description">{post.description.substring(0, 50) + '...'}</span>}
                            {post.image_src && <img src={post.image_src} style={{ width: 200, height: 200 }} />}
                        </div>
                        <div className="post-footer">
                            <div className="comments footer-action">
                                <ModeCommentIcon className="comment-icon" />
                                <span><Link to={this.props.match.url + '/' + post._id}>{(post.comments.length === 0) ? (post.comments.length) : (post.comments.length + 1)} Replies</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
        return (
            <div>
                <p>{this.props.match.params.user}'s posts:</p>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        isAuth: state.token !== null,
        email: state.userEmail
    }
}

export default connect(mapStateToProps, null)(Users);