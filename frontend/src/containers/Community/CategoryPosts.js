import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import './CategoryPosts.css';

class CategoryPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPosts: []
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        const postsCategory = this.props.match.params.category;
        axios.get('http://localhost:9000/posts/category=/' + postsCategory)
            .then(response => {
                const posts = [...response.data];
                this.setState({ loadedPosts: posts })
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    render() {
        return (
            <div className="posts-wrapper">
                {this.state.loadedPosts.map((post, index) => (
                    <div className="post" key={index * Math.random()}>
                        <div className="post-sidebar">
                            <ArrowUpwardIcon className="upvote" onClick={() => { this.upvoteHandler(post._id, post.upvotes) }} />
                            <span>{post.upvotes}</span>
                            <ArrowDownwardIcon className="downvote" onClick={() => { this.downvoteHandler(post._id, post.upvotes) }} />
                        </div>
                        <div className="post-title">
                            <img src={post.image_src} />
                            {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
                            <span className="post-user">Posted by {post.username}</span>
                            <div className="spacer"></div>
                            <span className="post-category">{post.category}</span>

                        </div>
                        <div className="post-body">
                            <span className="title"><Link to={`community/${post._id}`} replace>{post.title}</Link></span>
                            {post.image_src && <img src={post.image_src} />}
                            {post.description.length < 50 ? <span className="description">{post.description}</span> : <span className="description">{post.description.substring(0, 50) + '...'}</span>}
                        </div>
                        <div className="post-footer">
                            <div className="comments footer-action">
                                <ModeCommentIcon className="comment-icon" />
                                <span>{(post.comments.length === 0) ? (post.comments.length) : (post.comments.length + 1)} Comments</span>
                            </div>
                            <div className="share footer-action">
                                <ShareIcon />
                                <span>Share</span>
                            </div>
                            <div className="save footer-action">
                                <BookmarkIcon />
                                <span>Save</span>
                            </div>
                            <MoreHorizIcon className="more-icon footer-action" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default CategoryPosts;