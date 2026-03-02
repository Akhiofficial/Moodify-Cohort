import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";


export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {

        init({ videoRef, landmarkerRef, setExpression, streamRef });

        return () => {
            // Close model
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            // Stop camera
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    
    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{
                    width: "400px",
                    borderRadius: "12px",
                }}
                playsInline
                autoPlay
            />
            <h2>{expression}</h2>
            <button onClick={() => detect({ videoRef, landmarkerRef, setExpression })}>Detect Expression</button>
        </div>
    );

}