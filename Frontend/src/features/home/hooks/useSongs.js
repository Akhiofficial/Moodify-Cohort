import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../service/song.api";


export const useSong = () => {

    const context = useContext(SongContext);

    if (!context) {
        throw new Error("useSong must be used within a SongProvider");
    }

    const { playlist, setPlaylist, currentSongIndex, setCurrentSongIndex, playNext, playPrevious, currentSong, loading, setLoading } = context;

    async function handleGetSong({ mood }) {
        setLoading(true);
        try {
            const data = await getSong({ mood });
            if (data && data.songs && data.songs.length > 0) {
                setPlaylist(data.songs);
                setCurrentSongIndex(0);
            } else {
                setPlaylist([]);
                setCurrentSongIndex(0);
            }
        } catch (error) {
            console.error("Failed to fetch songs:", error);
            setPlaylist([]);
            setCurrentSongIndex(0);
        } finally {
            setLoading(false);
        }
    }


    return ({ playlist, currentSongIndex, currentSong, playNext, playPrevious, loading, handleGetSong });
}

