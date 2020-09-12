import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Community.css';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
//import FullPost from './FullPost';


class Community extends Component {
    constructor(props) {
        super(props);
        this.fileSelectedHandler.bind(this);
        this.fileUploadHandler.bind(this);
        this.state = {
            loadedPosts: [],
            selectedFile: "",
            newPostTitle: '',
            username: 'Weevil',
            newPostDescription: '',
            selectedPost: null,
        }
    }

    fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('', fd, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
            }
        })//api endpoint
            .then(res => {
                console.log(res);
            })
    }

    postDataHandler = () => {
        const newPost = {
            title: this.state.newPostTitle,
            username: this.state.username,
            description: this.state.newPostDescription
        };
        axios.post('http://localhost:9000/posts/', newPost)
            .then(response => {
                console.log(response);
                this.props.history.replace('/');
            })
            .catch(err => {
                console.error({ message: err.message })
            })
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        axios.get('http://localhost:9000/posts')
            .then(response => {
                let posts = [...response.data];
                this.setState({ loadedPosts: posts })
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    upvoteHandler(postId, oldUpvotes) {
        console.log(`upvoteHandler ${postId}`);
        console.log(` old upvotes value ${oldUpvotes}`);
        const newUpvotes = oldUpvotes + 1;
        console.log(` new upvotes value ${newUpvotes}`);
        const updatedPost = {
            upvotes: newUpvotes
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

    downvoteHandler(postId, oldVotes) {
        console.log(` old upvotes value ${oldVotes}`);
        const newVotes = oldVotes - 1;
        console.log(` new upvotes value ${newVotes}`);
        const updatedDownvotedPost = {
            upvotes: newVotes
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

    postSelectedHandler = (post) => {
        const copyPost = { ...post };
        this.setState({ selectedPost: copyPost });
    }


    render() {
        let selectedPost = null;
        // if (this.state.selectedPost) {
        //     selectedPost = <FullPost
        //         title={this.state.selectedPost.title}
        //         username={this.state.selectedPost.username}
        //         description={this.state.selectedPost.description}
        //         comments={this.state.selectedPost.comments} />
        // }
        return (
            <div className="Community">

                <header>
                    <h1>Share your deck or duel experiences</h1>
                    {/* <h5><a href="https://material-ui.com/components/buttons/" target="_blank">https://material-ui.com/components/buttons/</a></h5> */}
                </header>

                {selectedPost}

                <div className="NewPost">
                    <h1>Add a Post</h1>
                    <label>Title</label>
                    <input type="text" value={this.state.newPostTitle} onChange={(event) => this.setState({ newPostTitle: event.target.value })} />
                    <label>Desciption</label>
                    <textarea rows="4" value={this.state.newPostDescription} onChange={(event) => this.setState({ newPostDescription: event.target.value })} />
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
                    <button onClick={this.fileUploadHandler}>Upload</button>
                    <button onClick={this.postDataHandler}>Add Post</button>
                </div>

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
                                <span className="post-user">Posted by</span>
                                <span className="post-user underline">{post.username}</span>
                                <div className="spacer"></div>

                            </div>
                            <div className="post-body">
                                <span className="title"><Link to={this.props.match.url + '/' + post._id}>{post.title}</Link></span>
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



            </div>
        );
    }
}

export default Community;