import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleIDs, flipCard, selectMatchedIDs } from '../../boardSlice';

let cardLogo = "https://static-assets.codecademy.com/Courses/Learn-Redux/matching-game/codecademy_logo.png";

export const Card = ({ id, contents }) => {
    const visibleIDs = useSelector(selectVisibleIDs);
    const matchedIDs = useSelector(selectMatchedIDs);

    const dispatch = useDispatch()

    const flipHandler = (id) => {
        dispatch(flipCard(id))
    };

    let cardStyle = 'resting'
    let click = () => flipHandler(id);

    let cardText = (
        <img src={cardLogo} className="logo-placeholder" alt="Card option" />
    );

    // 1st if statement
    // implement card id array membership check, if card is selected
    if (visibleIDs.includes(id) || matchedIDs.includes(id)) {   // Both visible and matched cards should show their text
        cardText = contents;
        click = () => { };
    }

    // 2nd if statement
    // implement card id array membership check, if card is matched
    if (matchedIDs.includes(id)) {
        cardStyle = 'matched';
    }

    // 3rd if statement
    // implement number of flipped cards check
    if (visibleIDs.length === 2) {
        click = () => { };
    }

    return (
        <button onClick={click} className={`card ${cardStyle}`}>
            {cardText}
        </button>
    );
};
