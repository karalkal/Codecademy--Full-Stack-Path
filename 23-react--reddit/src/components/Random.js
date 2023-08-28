import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';


const Random = (props) => {
    // Get random subreddit as prop from App.js which is gonna be loaded before it is rendered 
    const randomSubreddit = useLoaderData();
    console.log(randomSubreddit);

    return (
        <main>
            <h1>Random</h1>
            <div className='results'>
                {/* {randomSubreddit.map(subrdt => {
                    <Link to="/">
                        {subrdt}
                    </Link>
                })} */}

            </div>
        </main>
    );
};

export default Random;
