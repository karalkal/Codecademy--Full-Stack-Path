import React, { useState } from 'react';
import { generateId, getNewExpirationTime } from './utilities';

export function AddThoughtForm(props) {

    const [textInput, setTextInput] = useState('');

    function handleTextChange(event) {
        // console.log(event.target.value)
        setTextInput(event.target.value)
    }


    function handleSubmit(event) {
        event.preventDefault();
        if (textInput === "") {     // ensure no blank inputs are added
            console.log("F### ##F")
            return
        }
        const newThought = {
            id: generateId(),
            expiresAt: getNewExpirationTime(),
            text: textInput,
        }

        props.addThought(newThought)
        setTextInput('')

    }
    return (
        <form className="AddThoughtForm" onSubmit={handleSubmit}>
            <input
                type="text"
                aria-label="What's on your mind?"
                placeholder="What's on your mind?"
                value={textInput}
                onChange={handleTextChange}
            />
            <input type="submit" />
        </form>
    );
}
