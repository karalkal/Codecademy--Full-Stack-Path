import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"


const Top = (props) => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const topPosts = useLoaderData();
    const resultsArr = (topPosts.data.children).map(obj => {
        return {
            id: obj.data.id,
            title: obj.data.title,
            text: obj.data.selftext,
            author: obj.data.author,
            subreddit: obj.data.subreddit,
            permalink: obj.data.permalink,
            url: obj.data.url,
            resized_icons: (obj.data.all_awardings).map(award => award.resized_icons[3].url),
            main_icons: (obj.data.all_awardings).map(award => {
                return {
                    icon_url: award.icon_url,
                    icon_description: award.description,
                    icon_name: award.name,
                }
            }),
            upvotes: obj.data.ups,
            created_utc: obj.data.created_utc,
            img_thumbnail: obj.data.url_overridden_by_dest,
            img_url: obj.data.preview === undefined
                ? null
                : obj.data.preview.images[0].source.url,
            media: obj.data.secure_media === null
                ? null
                : obj.data.secure_media.reddit_video.fallback_url
        }
    })

    return (
        <main className={styles.mainContainer}>
            <h1><span className={styles.galleryTitle}>Top</span>
                <span className={styles.gallerySubtitle}> (like the raw score, upvotes minus downvotes.)</span></h1>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );
};

export default Top;
