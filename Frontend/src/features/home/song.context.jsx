import { createContext, useState } from "react";


export const SongContext = createContext();

export const SongProvider = ({ children }) => {

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/akhi/cohort-2/moodify/songs/Brother__Hindi__zQTI55m_B.mp3",
        "posterUrl": "https://ik.imagekit.io/akhi/cohort-2/moodify/posters/Brother__Hindi_-poster_1cz9TTWkJ.jpeg",
        "title": "Brother (Hindi)",
        "mood": "happy"
    });

    const [loading, setLoading] = useState(false);

    

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    );
};
