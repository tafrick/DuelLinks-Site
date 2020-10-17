import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";

class MyPosts extends Component {
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
        axios.get('https://duellinksacademy.xyz/api/posts/username=/' + this.props.email)
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
            newUpvotes = oldUpvotes + 1;
            newLikedList = [...likeList];
            newLikedList.push(this.props.email);
            updatedPost = {
                upvotes: newUpvotes,
                liked_by: newLikedList
            }
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedPost)
                .then(response => {
                    this.props.history.go('/my_posts');
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else if (likeList.includes(this.props.email)) {
            newUpvotes = oldUpvotes - 1;
            newLikedList = [...likeList];
            newLikedList = newLikedList.filter(e => e !== this.props.email);
            updatedPost = {
                upvotes: newUpvotes,
                liked_by: newLikedList
            }
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedPost)
                .then(response => {
                    this.props.history.go('/my_posts');
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
            updatedPost = {
                upvotes: newUpvotes,
                disliked_by: newDislikeList,
                liked_by: newLikedList
            }
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedPost)
                .then(response => {
                    this.props.history.go('/my_posts');
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
            newDownvotes = oldVotes - 1;
            newDislikeList = [...dislikeList];
            newDislikeList.push(this.props.email);
            updatedDownvotedPost = {
                upvotes: newDownvotes,
                disliked_by: newDislikeList
            }
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedDownvotedPost)
                .then(response => {
                    this.props.history.go('/my_posts');
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
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedDownvotedPost)
                .then(response => {
                    this.props.history.go('/my_posts');
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
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedDownvotedPost)
                .then(response => {
                    this.props.history.go('/my_posts');
                })
                .catch(err => {
                    console.error(err.message);
                })
        }
    }

    formatDateAndTime = (dateTime) => {
        dateTime = new Date(dateTime);
        const result = moment(dateTime).fromNow();
        return result;
    }

    deletePostHandler(postId) {
        axios.delete('https://duellinksacademy.xyz/api/posts/' + postId)
            .then(response => {
                this.props.history.go('/my_posts');
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    render() {
        let posts = <p>no posts</p>;
        if (this.state.loadedPosts) {
            posts = this.state.loadedPosts.map((post, index) => (
                <div className="posts-wrapper">
                    <div className="post" key={index * Math.random()}>
                        <div className="post-sidebar">
                            {this.props.isAuth ? <ArrowUpwardIcon className="upvote" onClick={() => { this.upvoteHandler(post._id, post.upvotes, post.liked_by, post.disliked_by) }} /> : <ArrowUpwardIcon />}
                            <span>{post.upvotes}</span>
                            {this.props.isAuth ? <ArrowDownwardIcon className="downvote" onClick={() => { this.downvoteHandler(post._id, post.upvotes, post.liked_by, post.disliked_by) }} /> : <ArrowDownwardIcon />}
                        </div>
                        <div className="post-title">
                            <img src={post.image_src} alt={post.image_src} />
                            {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
                            <span className="post-user">Posted by <Link to={"/users/" + post.username}>{post.username}</Link><br></br>{this.formatDateAndTime(post.date)}</span>
                            <span className="post-category"><em>{post.category}</em></span>
                            <DeleteIcon onClick={() => { this.deletePostHandler(post._id) }} style={{ "fill": "rgb(134, 40, 40)" }} />
                        </div>
                        <div className="spacer"></div>
                        <div className="post-body">
                            <span className="title"><Link to={'/community/' + post._id}>{post.title}</Link></span>
                            {post.description.length < 50 ? <span className="description">{post.description}</span> : <span className="description">{post.description.substring(0, 50) + '...'}</span>}
                            {post.image_src && <img src={post.image_src} alt={post.image_src} style={{ width: 200, height: 200 }} />}
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
                <p>My posts:</p>
                {posts}
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

export default connect(mapStateToProps, null)(MyPosts);