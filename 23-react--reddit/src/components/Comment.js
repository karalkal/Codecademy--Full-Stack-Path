import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX
import { PiArrowsDownUpLight } from "react-icons/pi";
import { BsReddit } from "react-icons/bs";

import styles from "./Comment.module.css"
import formatUTCToDateAndTime from "../utils/formatUTCToDateAndTime";


export default function Comment({ comment }) {
    const { formattedTime, formattedDate } = formatUTCToDateAndTime(comment);

    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentTopSection}>
                <div className={styles.upDownDiv}>
                    <PiArrowsDownUpLight />
                    <span>{comment.ups}</span>
                </div>

                <p>On&nbsp;<b>{formattedDate}</b> at&nbsp;<b>{formattedTime}</b>
                    <span className={styles.commentAuthor}>
                        <BsReddit className={styles.redditIcon} />
                        {comment.author}</span>&nbsp;wrote:
                </p>
            </div>

            <div className={styles.commentText}>
                <p>{htmlDecode(comment.body)}</p>
            </div>

        </div >
    )
}
