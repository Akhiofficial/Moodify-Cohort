import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSongs'
import '../styles/home.scss'

const Home = () => {
    const { handleGetSong } = useSong();

    return (
        <div className="home-page">
            {/* Ambient bg blobs */}
            <div className="home-bg-shape shape-1" />
            <div className="home-bg-shape shape-2" />
            <div className="home-bg-shape shape-3" />

            <div className="home-cards">
                <FaceExpression
                    onClick={(expression) => { handleGetSong({ mood: expression }) }}
                />
                <Player />
            </div>
        </div>
    )
}

export default Home
