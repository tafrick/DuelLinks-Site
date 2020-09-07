import React from 'react';
import slang from './slang.json';
import Button from '@material-ui/core/Button';

const beginner = (props) => {
    return (
        <div>
            <h1>Beginners Guide:</h1>
            <ol>
                <li><p>Gems matter!</p></li>
                <li><p>Gold doesn't matter!</p></li>
                <li><p> In terms of price: Mainbox UR >> Minibox UR >> Structure Deck UR >> Event UR</p></li>
                <li><p>Focus on one deck as your main deck to invest in, focus on making that the best</p></li>
                <li><p>There's usually a ban list after every KC Cup, so try not to spend dream tickets until the banlist is released.</p></li>
                <li><p>A new account is the easiest way to get a lot of gems, but then it becomes harder and harder to consistently get gems. Spend gems wisely, always consider future gameplay</p></li>
            </ol>
            <div className="slangWrapper">
                <h2>Dictionary</h2>
                {slang.map((term, index) => (
                    <div>
                        <ul>
                            <li><p>{term.name}: {term.definition}</p></li>
                        </ul>
                    </div>
                ))}
            </div>
            <Button variant="contained">Add new term</Button>
        </div>
    );
};

export default beginner;