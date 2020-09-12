import React from 'react';
import slang from './slang.json';
import Button from '@material-ui/core/Button';

import classes from './Beginners.module.css';
import goldGif from '../../assets/images/gold.gif';
import Zexal from '../../assets/images/YuGiOhZexal.jpg';

const beginner = (props) => {
    return (
        <div className={classes.BeginnerList}>
            <h1>Beginners Guide:</h1>
            <ol>
                <li>
                    <p>Gems matter!</p>
                    <p>No kidding. But if you've just started the game you will be getting a lot more gems than usual! Keep this in mind, because it will take a lot longer to make gems once you have exhausted the beginner benefits.</p>
                    <img src="https://i.redd.it/knnlqhoul6u01.png" alt="sad gems graph" />
                </li>
                <li>
                    <p>Gold doesn't matter!</p>
                    <p>That's right it's almost completely useless. Yes in the beginning of the game you might run low on gold when acquiring cards from the card trader, but konami gives out gems as a reward so often you'll soon have more than you will ever need!</p>
                    <img src={goldGif} alt="gold doesnt matter" />
                </li>
                <li>
                    <p> In terms of UR price worth: Mainbox UR > Minibox UR > Structure Deck UR > Event UR</p>
                    <p>Ok not all Mainbox UR's are worth it, but in terms of rarity its harder to pull a UR from a Mainbox than a UR from a minibox. So keep this in mind when spending those rare dream tickets!</p>
                    <img src="https://i.redd.it/xvxezhr8bhg01.png" alt="axeraiduh" />
                </li>
                <li>
                    <p>Focus on one deck as your main deck to invest in, focus on making that the best</p>
                    <p>Yes Just like the show! I know it is tempting to want to build all the decks, but that will add up in price very quickly. So make sure you have one deck that you can call your top deck and invest in making it the most competitive it can be! This doesn't have to be a meta deck, just choose a deck that you have fun with and has at least some future potential.</p>
                    <img src="https://pm1.narvii.com/6728/30a6094d223b89061105306c47b870c9416513afv2_00.jpg" alt="crowrogan" />
                </li>
                <li>
                    <p>There's usually a ban list after every KC Cup, so try not to spend dream tickets until the banlist is released.</p>
                    <p>I know it's tempting to use your Dream ticket UR right away, but make sure you wait for the banlist to pass because you never know which deck might be hit or freed...</p>
                    <img src="https://i.redd.it/nuip4a4yqk931.jpg" alt="banned" />
                </li>
                <li>
                    <p>A new account is the easiest way to get a lot of gems, but then it becomes harder and harder to consistently get gems. Spend gems wisely, always consider future gameplay</p>
                    <p>Duel Links is probably gonna get access to XYZ summoning very soon! Consider what cards might come out which might benefit your strategies and win conditions.</p>
                    <img src="https://de7i3bh7bgh0d.cloudfront.net/2016/11/02/20/55/04/30de93b6-e6a9-416e-86b9-387b63239f27/YuGiOhZexal.jpg" alt="zexal" />
                </li>
            </ol>
            <h3>Some Commonly Used Words within the Duel Links Community</h3>
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