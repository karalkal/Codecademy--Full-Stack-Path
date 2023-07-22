import React from 'react';
import Comment from './Comment';

export default function CommentList({ comments }) {
    if (!comments) {
        return null;
    }
    // assign key here only to stop it complaining, in child comp we use comment.id
    return (
        <ul className='comments-list'>
            {comments.map((cmnt, idx) =>
                <Comment comment={cmnt} key={idx} />
            )}

        </ul>
    );
}
