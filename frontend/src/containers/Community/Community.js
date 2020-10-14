import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Community.css';
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import moment from "moment";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class Community extends Component {
    constructor(props) {
        super(props);
        this.fileSelectedHandler.bind(this);
        this.fileUploadHandler.bind(this);
        this.state = {
            loadedPosts: [],
            selectedFile: "",
            newPostTitle: '',
            username: '',
            imgURL: '',
            newPostDescription: '',
            selectedPost: null,
            newPostCategory: 'Meme',
            filter: '0',
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
            description: this.state.newPostDescription,
            category: this.state.newPostCategory,
            image_src: this.state.imgURL
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
        if (this.props.isAuth) {
            this.setState({ username: this.props.email })
        }
    }

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.filter !== prevState.filter) {
            if (this.state.filter == "0") {
                this.fetchPosts();
            } else {
                axios.get('http://localhost:9000/posts/category=/' + this.state.filter)
                    .then(response => {
                        const posts = [...response.data];
                        this.setState({ loadedPosts: posts })
                    })
                    .catch(error => {
                        console.error(error.message);
                    })
            }
        }
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

    postSelectedHandler = (post) => {
        const copyPost = { ...post };
        this.setState({ selectedPost: copyPost });
    }

    formatDateAndTime = (dateTime) => {
        dateTime = new Date(dateTime);
        const today = new Date();
        const result = moment(dateTime).fromNow();
        return result;
    }



    render() {
        let selectedPost = null;
        const newPost = (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.newPostTitle} onChange={(event) => this.setState({ newPostTitle: event.target.value })} />
                <label>Desciption</label>
                <textarea rows="4" value={this.state.newPostDescription} onChange={(event) => this.setState({ newPostDescription: event.target.value })} />
                <label>Image URL</label>
                <input type="text" value={this.state.imgURL} onChange={(event) => this.setState({ imgURL: event.target.value })} />
                <label>Category</label>
                <select value={this.state.newPostCategory} onChange={(event) => this.setState({ newPostCategory: event.target.value })}>
                    <option value="KOG_Deck">KOG Deck</option>
                    <option value="Meta_Deck">Meta Deck</option>
                    <option value="Casual_Deck">Casual Deck</option>
                    <option value="Tournament">Tournament</option>
                    <option value="Meme">Meme</option>
                    <option value="KC_Cup">KC Cup</option>
                    <option value="Announcements">Announcements</option>
                    <option value="Gameplay_Tips">Gameplay Tips</option>
                    <option value="Farming_Deck">Farming Deck</option>
                </select>
                <button onClick={this.fileUploadHandler}>Upload</button>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );

        return (
            <div className="Community">

                <header>
                    <h1>Share your deck or duel experiences</h1>
                </header>

                {selectedPost}

                <div>
                    <select value={this.state.filter} onChange={(event) => this.setState({ filter: event.target.value })}>
                        <option value="0">Toggle All</option>
                        <option value="KOG_Deck">KOG Deck</option>
                        <option value="Meta_Deck">Meta Deck</option>
                        <option value="Casual_Deck">Casual Deck</option>
                        <option value="Tournament">Tournament</option>
                        <option value="Meme">Meme</option>
                        <option value="KC_Cup">KC Cup</option>
                        <option value="Announcements">Announcements</option>
                        <option value="Gameplay_Tips">Gameplay Tips</option>
                        <option value="Farming_Deck">Farming Deck</option>
                    </select>
                </div>

                {this.props.isAuth ? newPost : <p>Please login to post!</p>}
                <div className="posts-wrapper">
                    {this.state.loadedPosts.map((post, index) => (
                        <div className="post" key={index * Math.random()}>
                            <div className="post-sidebar">
                                {this.props.isAuth ? <KeyboardArrowUpIcon className="upvote" onClick={() => { this.upvoteHandler(post._id, post.upvotes, post.liked_by, post.disliked_by) }} /> : <KeyboardArrowUpIcon />}
                                <span>{post.upvotes}</span>
                                {this.props.isAuth ? <KeyboardArrowDownIcon className="downvote" onClick={() => { this.downvoteHandler(post._id, post.upvotes, post.liked_by, post.disliked_by) }} /> : <KeyboardArrowDownIcon />}
                            </div>
                            <div className="post-title">
                                <img src={post.image_src} />
                                <span className="post-user">Posted by <Link to={"/users/" + post.username}>{post.username}</Link><br></br>{this.formatDateAndTime(post.date)}</span>
                                <span className="post-category"><em>{post.category}</em></span>
                            </div>

                            <div className="spacer"></div>

                            <div className="post-body">
                                <span className="title"><Link to={this.props.match.url + '/' + post._id}>{post.title}</Link></span>
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
                    ))}
                </div>
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

export default connect(mapStateToProps, null)(Community);