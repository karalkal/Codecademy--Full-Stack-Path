import styles from "./FoundSection.module.css";

export default function FoundSection({ tracks, onAddTrack }) {
    const truncate = (input, charCount) => input.length > charCount ? `${input.substring(0, charCount)}...` : input;

    const tracksComponents = tracks.map((track, index) => {
        const trackName = truncate(track.name, 62)
        const trackArtist = truncate(track.artists[0].name, 31)
        const trackAlbum = truncate(track.album.name, 31)
        return (
            <div key={track.id}
                id={track.id}
                name={track.name}
                className={styles.foundItemContainer}>
                <h4 className={styles.foundTrack}>{index + 1}. {trackName}</h4>
                <p className={styles.foundArtist}>{trackArtist} </p>
                <p className={styles.foundAlbum}>{trackAlbum}</p>
                <button
                    className={styles.addBtn}
                    onClick={() => onAddTrack(track.id)}>add</button>
            </div>)
    });

    return (
        <div className={styles.resultsContainer}>
            <h1 className={styles.sectionTitle}>Results: </h1>
            {tracksComponents}
        </div>
    )
}