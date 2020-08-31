import React, { Component } from 'react';
import './Community.css';
import posts from "./posts.json";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from '@material-ui/core/Button';
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";


class Community extends Component{
    render () {
        return (
            <div className="Community">
                
                <header>
                    <h1>Share your deck or duel experiences</h1>
                    <Button variant="contained">Create Post</Button>
                    <h5><a href="https://material-ui.com/components/buttons/">https://material-ui.com/components/buttons/</a></h5>
                </header>

                {/* <form>
                    <label>
                        <textarea rows="15" cols="50"></textarea>
                    </label>
                    <br></br>
                    <input type="submit" value="Upload" />
                    <input type="submit" value="Submit" />
                </form> */}

                <div className="posts-wrapper">
                        {posts.map((post, index) => (
                            <div className="post">
                            <div className="post-sidebar">
                                <ArrowUpwardIcon className="upvote" />
                                <span>{post.upvotes}</span>
                                <ArrowDownwardIcon className="downvote" />
                            </div>
                            <div className="post-title">
                                <img src={post.subreddit.image_src} />
                                <span className="subreddit-name">r/{post.subreddit.name}</span>
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