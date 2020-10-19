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
            formValid: true
        }
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files
        })
    }

    inputCheckValidity = () => {
        let postIsValid = false;
        const newPost = {
            title: this.state.newPostTitle,
            description: this.state.newPostDescription,
            image_src: this.state.imgURL
        };

        if ((newPost.title.length > 0) && (newPost.description.length > 0)) {
            postIsValid = true;
        }

        if (newPost.title.trim() !== '') {
            postIsValid = ((newPost.title.length > 0) && (newPost.title.length < 60)) && postIsValid;
        }

        if (newPost.description.trim() !== '') {
            postIsValid = ((newPost.description.length > 0) && (newPost.description.length < 2000)) && postIsValid;
        }

        if (newPost.image_src.trim() === '') {
            postIsValid = true && postIsValid;
        } else {
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            postIsValid = pattern.test(newPost.image_src) && postIsValid;
        }

        // alert(postIsValid);
        this.setState({ formValid: postIsValid });
        if (postIsValid) {
            return this.postDataHandler();
        } else {
            return postIsValid;
        }
    }

    postDataHandler = () => {
        const newPost = {
            title: this.state.newPostTitle,
            username: this.props.email,
            description: this.state.newPostDescription,
            category: this.state.newPostCategory,
            image_src: this.state.imgURL
        };
        axios.post('https://duellinksacademy.xyz/api/posts/', newPost)
            .then(response => {
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
            if (this.state.filter === "0") {
                this.fetchPosts();
            } else {
                axios.get('https://duellinksacademy.xyz/api/posts/category=/' + this.state.filter)
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
        axios.get('https://duellinksacademy.xyz/api/posts')
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
            newUpvotes = oldUpvotes + 1;
            newLikedList = [...likeList];
            newLikedList.push(this.props.email);
            updatedPost = {
                upvotes: newUpvotes,
                liked_by: newLikedList
            }
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedPost)
                .then(response => {
                    this.props.history.go('/community');
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
                    this.props.history.go('/community');
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
            newDownvotes = oldVotes - 1;
            newDislikeList = [...dislikeList];
            newDislikeList.push(this.props.email);
            updatedDownvotedPost = {
                upvotes: newDownvotes,
                disliked_by: newDislikeList
            }
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedDownvotedPost)
                .then(response => {
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
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedDownvotedPost)
                .then(response => {
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
            axios.patch('https://duellinksacademy.xyz/api/posts/' + postId, updatedDownvotedPost)
                .then(response => {
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
        const result = moment(dateTime).fromNow();
        return result;
    }

    render() {
        let selectedPost = null;
        let newPostClass = "NewPost"
        let titplaceholder = "Post Title";
        let desplaceholder = "what do you want to talk about?";
        if (!this.state.formValid) {
            newPostClass += "Invalid";
            titplaceholder = "Title is required!"
            desplaceholder = "Desciption is Required!"
        }
        const newPost = (
            <div className={newPostClass}>
                <h1>Add a Post</h1>
                <p>* is required</p>
                <label>Title*</label>
                <input placeholder={titplaceholder} type="text" value={this.state.newPostTitle} onChange={(event) => this.setState({ newPostTitle: event.target.value })} />
                <label>Desciption*</label>
                <textarea placeholder={desplaceholder} rows="4" value={this.state.newPostDescription} onChange={(event) => this.setState({ newPostDescription: event.target.value })} />
                <label>Image URL</label>
                <input placeholder="please enter image url (such as imgur)..." type="text" value={this.state.imgURL} onChange={(event) => this.setState({ imgURL: event.target.value })} />
                <label>Category*</label>
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
                <button onClick={this.inputCheckValidity}>Add Post</button>
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
                                <img src={post.image_src} alt={post.image_src} />
                                <span className="post-user">Posted by <Link to={"/users/" + post.username}>{post.username}</Link><br></br>{this.formatDateAndTime(post.date)}</span>
                                <span className="post-category"><em>{post.category}</em></span>
                            </div>

                            <div className="spacer"></div>

                            <div className="post-body">
                                <span className="title"><Link to={this.props.match.url + '/' + post._id}>{post.title}</Link></span>
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