import styles from "./FoundSection.module.css"

export default function FoundSection({ tracks }) {
    const tracksComponents = tracks.map((track) =>
    (<div key={track.id}
        id={track.id}
        name={track.name}>
        <div className={styles.foundTrack}>{track.name}</div>
        <div className={styles.foundArtist}>BY: {track.artists[0].name} </div>
        <div className={styles.foundAlbum}>FROM: {track.album.name}</div>
    </div>)
    );

    return (
        <div className={styles.resultsContainer}>
            <h1>Results: </h1>
            {tracksComponents}
        </div>
    )
}