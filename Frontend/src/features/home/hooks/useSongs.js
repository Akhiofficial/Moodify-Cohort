import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../service/song.api";


export const useSong = () => {

    const context = useContext(SongContext);

    if (!context) {
        throw new Error("useSong must be used within a SongProvider");
    }

    const { song, setSong, loading, setLoading } = context;

    async function handleGetSong({ mood }) {
        setLoading(true);
        const data = await getSong({ mood });
        setSong(data.song);
        setLoading(false);
    }


    return ({ song, loading, handleGetSong });
}

