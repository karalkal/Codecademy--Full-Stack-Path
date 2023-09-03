import { nanoid } from "nanoid"
import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX
import styles from "./SubredditLinks.module.css"
import { Link } from "react-router-dom"
import { PiPencilLineLight } from "react-icons/pi";
import { IoLogoReddit } from "react-icons/io";
import { BsArrowDownUp } from "react-icons/bs";


export default function SRLink({ result }) {
    const redditLink = "https://www.reddit.com" + result.permalink

    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = result.created_utc * 1000

    // if thumbnail is "self" (no idea what this is) or we have video (video has thumbnail attached too)
    // check for extension too as articles with no img also have "url_overridden_by_dest"
    let imageSrc = null
    if (result.img_thumbnail && !result.media
        && (result.img_thumbnail.slice(-4) === ".png" || result.img_thumbnail.slice(-4) === ".jpg")) {
        imageSrc = result.img_thumbnail
    }


    return (
        <Link to="">
            
        </Link>
    )
}
