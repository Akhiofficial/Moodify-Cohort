import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import "../styles/faceExpression.scss";

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("detecting...");

    useEffect(() => {
        init({ videoRef, landmarkerRef, setExpression, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const detectedExpression = detect({ videoRef, landmarkerRef, setExpression });
        console.log(detectedExpression);
        onClick(detectedExpression);
    }

    return (
        <div className="face-glass-card">
            {/* Header */}
            <div className="face-header">
                <h1>Mood Scanner</h1>
                <p>Let your face choose the music 🎵</p>
            </div>

            {/* Live camera feed */}
            <div className="face-video-wrap">
                <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                />
            </div>

            {/* Detected expression badge */}
            <div className="face-expression-badge">
                <span className="badge-dot" />
                <span className="badge-text">{expression}</span>
            </div>

            {/* Action button */}
            <button className="face-detect-btn" onClick={handleClick}>
                ✦ Detect My Mood
            </button>
        </div>
    );
}
