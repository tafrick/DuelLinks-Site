import React, { Component } from 'react';
import axios from 'axios';

import './Community.css';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";


class Community extends Component {
    constructor(props) {
        super(props);
        this.fileSelectedHandler.bind(this);
        this.fileUploadHandler.bind(this);
        this.state = {
            loadedPosts: [],
            selectedFile: ""
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
        axios.post('', fd, {onUploadProgress: progressEvent => {
            console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
        }})//api endpoint
        .then(res => {
            console.log(res);
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

    createPost(noteReq) {
        let newPost = {
            title: "TEst",
            description: noteReq.val(),
            username: "John Doe"
        }
        axios.post('http://localhost:9000/posts', newPost)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error.message);
            })
    }


    render() {
        return (
            <div className="Community">

                <header>
                    <h1>Share your deck or duel experiences</h1>
                    <Button variant="contained">Create Post</Button>
                    <h5><a href="https://material-ui.com/components/buttons/" target="_blank">https://material-ui.com/components/buttons/</a></h5>
                </header>

                <form>
                    <label>
                        <textarea rows="15" cols="50" id="new-post"></textarea>
                    </label>
                    <br></br>
                    <input type="file" onChange={this.fileSelectedHandler} />
                    <button onClick={this.fileUploadHandler}>Upload</button> 
                    <input type="submit" value="Submit" onSubmit={() => { }} />
                </form>

                <div className="posts-wrapper">
                    {this.state.loadedPosts.map((post, index) => (
                        <div className="post" key={index * Math.random()}>
                            <div className="post-sidebar">
                                <ArrowUpwardIcon className="upvote" />
                                <span>{post.upvotes}</span>
                                <ArrowDownwardIcon className="downvote" />
                            </div>
                            <div className="post-title">
                                <img src={post.image_src} />
                                {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
                                <span className="post-user">Posted by</span>
                                <span className="post-user underline">u/{post.username}</span>
                                <div className="spacer"></div>

                            </div>
                            <div className="post-body">
                                <span className="title">{post.title}</span>
                                {post.image_src && <img src={post.image_src} />}
                                {post.description && <span className="description">{post.description}</span>}
                            </div>
                            <div className="post-footer">
                                <div className="comments footer-action">
                                    <ModeCommentIcon className="comment-icon" />
                                    <span>{post.comments} Comments</span>
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