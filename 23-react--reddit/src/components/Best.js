import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"


const Best = (props) => {
    // Get random subreddit as prop from App.js which is gonna be loaded before it is rendered 
    const randomSubreddit = useLoaderData();
    const resultsArr = (randomSubreddit.data.children).map(obj => {
        return {
            id: obj.data.id,
            title: obj.data.title,
            text: obj.data.selftext,
            author: obj.data.author,
            subreddit: obj.data.subreddit,
            permalink: obj.data.permalink,
            url: obj.data.url,
            icons: (obj.data.all_awardings).map(award => award.resized_icons[3]),
            main_icon: (obj.data.all_awardings).map(award => award.static_icon_url),
            upvotes: obj.data.ups,
            created_utc: obj.data.created_utc,
            media_metadata: obj.data.media_metadata,
            secure_media: obj.data.secure_media === null
                ? null
                : obj.data.secure_media.reddit_video.scrubber_media_url
        }
    })
    console.log(resultsArr);

    return (
        <main>
            <h1>Best</h1>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );
};

export default Best;
