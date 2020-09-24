import React from 'react';

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";


import './Comments.css';

const Comment = (props) => {
    return (
        <div className="Comment">
            <div className="Comment-sidebar">
                <ArrowUpwardIcon className="upvote" onClick={props.clickedUp} />
                <span>{props.upvotes}</span>
                <ArrowDownwardIcon className="downvote" onClick={props.clickedDown} />
            </div>
            <div className="Comment-title">
                <span className="Comment-user">Posted By </span>
                <span className="Comment-user underline">u/{props.username}</span>
                <span className="Comment-user">at {props.time} </span>
                <div className="spacer"></div>
            </div>
            <div className="Comment-body">
                <span className="Body">{props.body}</span>
            </div>
        </div>
    );
}

export default Comment;