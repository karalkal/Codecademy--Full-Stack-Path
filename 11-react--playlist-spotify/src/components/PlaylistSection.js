import { useRef } from "react";
import styles from "./PlaylistSection.module.css"

export default function PlaylistSection({ playlist, createPlaylist, displayNoPlaylistTitleError, onRemoveTrack }) {
    const playlistName = useRef("");

    const truncate = (input, charCount) => input.length > charCount ? `${input.substring(0, charCount)}...` : input;
    const tracksComponents = playlist.map((myTrack, index) => {
        const trackName = truncate(myTrack.name, 62)
        const trackArtist = truncate(myTrack.artist, 31)
        const trackAlbum = truncate(myTrack.album, 31)

        return (
            <div key={myTrack.myId}     // myId is unique for each ENTRY, id is for each track, i.e. can have same track in playlist more than once
                id={myTrack.id}
                name={myTrack.name}
                className={styles.playlistItemContainer}>
                <h4>{index + 1}. {trackName}</h4>
                <span><p className={styles.playlistArtist}>{trackArtist} </p>
                    <p className={styles.playlistAlbum}>{trackAlbum}</p></span>
                <button
                    className={styles.removeBtn}
                    onClick={() => onRemoveTrack(myTrack.myId)}>del</button>
            </div>)

    });


    function preCreatePlaylist(e) {
        e.preventDefault();
        playlistName.current.value === ""
            ? displayNoPlaylistTitleError()
            : createPlaylist(playlistName.current.value)
    }

    return (
        <div className={styles.resultsContainer} onSubmit={preCreatePlaylist}>
            <form id={styles.playlistCreateForm}>
                <input type="text" placeholder="Playlist Name" ref={playlistName} />
                <button >create</button>
            </form>

            {tracksComponents}
        </div>
    )
}