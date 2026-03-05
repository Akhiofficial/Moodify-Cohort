import { createContext, useState } from "react";


export const SongContext = createContext();

export const SongProvider = ({ children }) => {

    const [playlist, setPlaylist] = useState([{
        "url": "https://ik.imagekit.io/akhi/cohort-2/moodify/songs/Brother__Hindi__zQTI55m_B.mp3",
        "posterUrl": "https://ik.imagekit.io/akhi/cohort-2/moodify/posters/Brother__Hindi_-poster_1cz9TTWkJ.jpeg",
        "title": "Brother (Hindi)",
        "mood": "happy"
    }]);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const [loading, setLoading] = useState(false);

    const playNext = () => {
        if (currentSongIndex < playlist.length - 1) {
            setCurrentSongIndex(prev => prev + 1);
        }
    }

    const playPrevious = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(prev => prev - 1);
        }
    }

    return (
        <SongContext.Provider value={{
            playlist,
            setPlaylist,
            currentSongIndex,
            setCurrentSongIndex,
            playNext,
            playPrevious,
            currentSong: playlist[currentSongIndex],
            loading,
            setLoading
        }}>
            {children}
        </SongContext.Provider>
    );
};
