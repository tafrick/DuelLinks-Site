import React from 'react';

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";


import './Comments.css';

const formatDate = (dateTime) => {
    const time = dateTime;
    dateTime = dateTime.substring(0, dateTime.indexOf('T'));
    console.log('dateTime' , dateTime);
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = '0'+ (today.getMonth()+1).toString().slice(-2);
    const currentDay = today.getDate().toString().slice(-2);

    const getYear = dateTime.substring(0, dateTime.indexOf('-'));
    const getMonth = dateTime.substring(dateTime.indexOf('-')+1, dateTime.indexOf('-')+3);
    const getDay = dateTime.substring(dateTime.lastIndexOf('-')+1, dateTime.length);
    
    const yearDifference = (currentYear - getYear)*30;
    const monthDiffercence = (currentMonth - getMonth)*30;
    const dayDifference = Math.abs(currentDay - getDay);
    const result = dayDifference === 0 ? 'Today' : (dayDifference > 1 ? dayDifference + ' days ago ' : ' Yesterday');

    return result === 'Today' || result === 'Yesterday' ? result + formatTime(time) : result;
}

const formatTime = (dateTime) => {
    let spam = (dateTime.substring(dateTime.lastIndexOf(':'), dateTime.length));
    let timeOfDay = dateTime.substring(dateTime.lastIndexOf('T')+1, dateTime.lastIndexOf('T')+3);
    console.log();
    
    timeOfDay = timeOfDay < 12 ? 'AM': 'PM';
    dateTime = dateTime.replace(spam, timeOfDay).replace('T', ' ');
    dateTime = dateTime.substring(dateTime.lastIndexOf(' ', dateTime.length));
    dateTime = timeOfDay === 'PM' ? dateTime.replace(dateTime.substring(0, 3), dateTime.substring(0,3) - 12) : dateTime;
    return dateTime;
}

// 2020-
//
const Comment = (props) => {
    return (
        <div className="Comment">
            <div className="Comment-sidebar">
                <ArrowUpwardIcon className="upvote" onClick={props.clickedUp} />
                <span>{props.upvotes}</span>
                <ArrowDownwardIcon className="downvote" onClick={props.clickedDown} />
            </div>
            <div className="Comment-title">
                <span className="Comment-user">Posted by </span>
                <span className="Comment-user underline">u/{props.username}</span>
                <span className="Comment-user">{formatDate(props.time)} </span>
                
                <div className="spacer"></div>
            </div>
            <div className="Comment-body">
                <span className="Body">{props.body}</span>
            </div>
        </div>
    );
}

export default Comment;