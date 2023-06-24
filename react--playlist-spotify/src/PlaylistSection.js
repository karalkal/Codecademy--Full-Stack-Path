import styles from "./PlaylistSection.module.css"

export default function PlaylistSection({ playlist }) {
    const truncate = (input, charCount) => input.length > charCount ? `${input.substring(0, charCount)}...` : input;

    const tracksComponents = playlist.map((track, index) => {
        const trackName = truncate(track.name, 62)
        const trackArtist = truncate(track.artists[0].name, 31)
        const trackAlbum = truncate(track.album.name, 31)

        return (
            <div key={track.id}
                id={track.id}
                name={track.name}
                className={styles.foundContainer}>
                <p className={styles.foundTrack}>{index + 1}. {trackName}</p>
                <span><p className={styles.foundArtist}>{trackArtist} </p>
                    <p className={styles.foundAlbum}>{trackAlbum}</p></span>
            </div>)
    });


    return (
        <div className={styles.playlistContainer}>
            <form id={styles.playlistCreateForm}>
                <input type="text" placeholder="Playlist Name" />
                <button>create</button>
            </form>

            <div>
                {tracksComponents}
            </div>
        </div>
    )
}