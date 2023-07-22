import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadCommentsForArticleId,
    postCommentForArticleId,
    selectComments,
    isLoadingComments,
} from './commentsSlice'
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

const Comments = () => {
    const dispatch = useDispatch();
    const article = useSelector(selectCurrentArticle);
    // Declare additional selected data here.
    const comments = useSelector(selectComments);
    const commentsAreLoading = useSelector(isLoadingComments);

    // Dispatch loadCommentsForArticleId with useEffect here.
    useEffect(() => {
        if (article !== undefined) {
            dispatch(loadCommentsForArticleId(article.id))
        }
    },
        [article])


    if (commentsAreLoading) return <div>Loading Comments</div>;
    if (!article) return null;      // probably not necessary, see check in useEffect
    const commentsForArticleId = article === undefined
        ? []
        : comments[article.id]

    console.log(commentsForArticleId)

    return (
        <div className='comments-container'>
            <h3 className='comments-title'>Comments</h3>
            <CommentList comments={commentsForArticleId} />
            <CommentForm articleId={article.id} />
        </div>
    );
};

export default Comments;
