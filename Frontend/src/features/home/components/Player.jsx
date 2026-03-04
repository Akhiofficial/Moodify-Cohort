import React, { useState, useRef, useEffect } from 'react'
import '../styles/player.scss'
import { useSong } from '../hooks/useSongs'

const Player = () => {
    const { song } = useSong()

    const audioRef = useRef(null)
    const progressRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.8)
    const [isMuted, setIsMuted] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false)

    const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

    // Sync audio source when song changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load()
            setIsPlaying(false)
            setCurrentTime(0)
        }
    }, [song?.url])

    // Sync playback speed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed
        }
    }, [playbackSpeed])

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        if (!audioRef.current) return
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return
        setDuration(audioRef.current.duration)
    }

    const handleProgressClick = (e) => {
        const rect = progressRef.current.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        const newTime = ratio * duration
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value)
        setVolume(val)
        audioRef.current.volume = val
        setIsMuted(val === 0)
    }

    const toggleMute = () => {
        const muted = !isMuted
        setIsMuted(muted)
        audioRef.current.muted = muted
    }

    const skipForward = () => {
        if (!audioRef.current) return
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
    }

    const skipBackward = () => {
        if (!audioRef.current) return
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
    }

    const handleEnded = () => setIsPlaying(false)

    const formatTime = (s) => {
        if (isNaN(s)) return '0:00'
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    const progressPercent = duration ? (currentTime / duration) * 100 : 0

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return '🔇'
        if (volume < 0.4) return '🔈'
        if (volume < 0.7) return '🔉'
        return '🔊'
    }

    const getMoodColor = (mood) => {
        const map = {
            happy: '#fbbf24',
            sad: '#60a5fa',
            angry: '#f87171',
            fear: '#a78bfa',
            disgust: '#34d399',
            surprise: '#fb923c',
            neutral: '#94a3b8',
        }
        return map[mood?.toLowerCase()] || '#8b5cf6'
    }

    const moodColor = getMoodColor(song?.mood)

    return (
        <div className="player-glass-card">
            <audio
                ref={audioRef}
                src={song?.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            {/* Poster */}
            <div className="player-poster-wrap">
                <div
                    className={`player-poster-ring ${isPlaying ? 'spinning' : ''}`}
                    style={{ borderColor: moodColor }}
                >
                    <img
                        src={song?.posterUrl}
                        alt={song?.title}
                        className="player-poster"
                    />
                </div>
                <div
                    className="poster-glow"
                    style={{ background: moodColor }}
                />
            </div>

            {/* Song Info */}
            <div className="player-info">
                <span className="player-mood-badge" style={{ background: `${moodColor}22`, color: moodColor, borderColor: `${moodColor}55` }}>
                    {song?.mood || 'Unknown'}
                </span>
                <h2 className="player-title">{song?.title || 'No Song Selected'}</h2>
            </div>

            {/* Progress Bar */}
            <div className="player-progress-section">
                <span className="player-time">{formatTime(currentTime)}</span>
                <div
                    className="player-progress-track"
                    ref={progressRef}
                    onClick={handleProgressClick}
                >
                    <div
                        className="player-progress-fill"
                        style={{ width: `${progressPercent}%`, background: moodColor }}
                    />
                    <div
                        className="player-progress-thumb"
                        style={{ left: `${progressPercent}%`, background: moodColor }}
                    />
                </div>
                <span className="player-time">{formatTime(duration)}</span>
            </div>

            {/* Main Controls */}
            <div className="player-controls">
                {/* Skip Back 10s */}
                <button
                    className="ctrl-btn secondary"
                    onClick={skipBackward}
                    title="Rewind 10s"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                    <span className="ctrl-label">10</span>
                </button>

                {/* Play / Pause */}
                <button
                    className="ctrl-btn play-btn"
                    onClick={togglePlay}
                    style={{ background: moodColor, boxShadow: `0 0 24px ${moodColor}80` }}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Skip Forward 10s */}
                <button
                    className="ctrl-btn secondary"
                    onClick={skipForward}
                    title="Forward 10s"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                    </svg>
                    <span className="ctrl-label">10</span>
                </button>
            </div>

            {/* Volume + Speed Row */}
            <div className="player-extra-row">
                {/* Volume */}
                <div className="volume-group">
                    <button className="icon-btn" onClick={toggleMute}>
                        {getVolumeIcon()}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        style={{ '--thumb-color': moodColor }}
                    />
                </div>

                {/* Speed */}
                <div className="speed-group">
                    <button
                        className="speed-btn"
                        onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                        style={{ color: moodColor, borderColor: `${moodColor}55` }}
                    >
                        {playbackSpeed}x
                    </button>
                    {isSpeedMenuOpen && (
                        <div className="speed-menu">
                            {speedOptions.map((s) => (
                                <button
                                    key={s}
                                    className={`speed-option ${playbackSpeed === s ? 'active' : ''}`}
                                    style={playbackSpeed === s ? { color: moodColor } : {}}
                                    onClick={() => {
                                        setPlaybackSpeed(s)
                                        setIsSpeedMenuOpen(false)
                                    }}
                                >
                                    {s}x
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Player