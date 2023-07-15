import React, { useEffect } from 'react';

export function Thought(props) {
    const { thought, removeThought } = props;

    useEffect(() => {
        const timeRemaining = thought.expiresAt - Date.now();

        const timeoutId = setTimeout(() => {
            // console.log(timeRemaining)
            removeThought(thought.id)
        }
            , timeRemaining);

        return () => clearTimeout(timeoutId)
    }
        , [thought]   //You want to re-run the effect every time the thought is different.
    )

    const handleRemoveClick = () => {
        removeThought(thought.id);
    };

    return (
        <li className="Thought">
            <button
                aria-label="Remove thought"
                className="remove-button"
                onClick={handleRemoveClick}
            >
                &times;
            </button>
            <div className="text">{thought.text}</div>
        </li>
    );
}
