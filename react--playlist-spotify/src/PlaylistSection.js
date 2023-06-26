import { useRef } from "react";
import styles from "./PlaylistSection.module.css"

export default function PlaylistSection({ playlist, createPlaylist, displayNoPlaylistTitleError, onRemoveTrack }) {
    const playlistName = useRef("");
    const truncate = (input, charCount) => input.length > charCount ? `${input.substring(0, charCount)}...` : input;

    const tracksComponents = playlist.map((track, index) => {
        const trackName = truncate(track.name, 62)
        const trackArtist = truncate(track.artists[0].name, 31)
        const trackAlbum = truncate(track.album.name, 31)

        return (
            <div key={track.id}
                id={track.id}
                name={track.name}
                className={styles.playlistContainer}>
                <p className={styles.playlistTrack}>{index + 1}. {trackName}</p>
                <span><p className={styles.playlistArtist}>{trackArtist} </p>
                    <p className={styles.playlistAlbum}>{trackAlbum}</p></span>
                <button
                    className={styles.removeBtn}
                    onClick={() => onRemoveTrack(track.id)}>del</button>
            </div>)

    });


    function preCreatePlaylist(e) {
        e.preventDefault();
        playlistName.current.value === ""
            ? displayNoPlaylistTitleError()
            : createPlaylist(playlistName.current.value)
    }

    // onClick={createPlaylist}
    return (
        <div className={styles.resultsContainer} onSubmit={preCreatePlaylist}>
            <form id={styles.playlistCreateForm}>
                <input type="text" placeholder="Playlist Name" ref={playlistName} />
                <button >create</button>
            </form>

            <div>
                {tracksComponents}
            </div>
        </div>
    )
}