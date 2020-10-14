import React from 'react';
import moment from "moment";
import { Link } from 'react-router-dom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './Comments.css';

const formatDateAndTime = (dateTime) => {
    dateTime = new Date(dateTime);
    const result = moment(dateTime).fromNow();
    return result;
}

const Comment = (props) => {
    return (
        <div className="Comment">
            <div className="Comment-sidebar">
                <KeyboardArrowUpIcon className="upvote" onClick={props.clickedUp} />
                <span>{props.upvotes}</span>
                <KeyboardArrowDownIcon className="downvote" onClick={props.clickedDown} />
            </div>
            <div className="Comment-title">
                <span className="Comment-user underline"><u><Link to={"/users/" + props.username}>{props.username}</Link></u></span>
                <span className="Comment-time">{formatDateAndTime(props.time)} </span>
                <div className="spacer"></div>
            </div>
            <div className="Comment-body">
                <span className="Body">{props.body}</span>
            </div>
        </div>
    );
}

export default Comment;