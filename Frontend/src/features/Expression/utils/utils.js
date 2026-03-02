import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


export const init = async ({videoRef, landmarkerRef, setExpression, streamRef}) => {
        try {
            // Load MediaPipe WASM files
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );

            // Create Face Landmarker
            landmarkerRef.current = await FaceLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    },
                    outputFaceBlendshapes: true,
                    runningMode: "VIDEO",
                    numFaces: 1,
                }
            );

            // Start Camera
            streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = streamRef.current;
            await videoRef.current.play();
        } catch (error) {
            console.error("Initialization error:", error);
        }

    };

export const detect = ({landmarkerRef, videoRef, setExpression}) => {
        if (!landmarkerRef.current || !videoRef.current) return;

        const results = landmarkerRef.current.detectForVideo(
            videoRef.current,
            performance.now()
        );

        if (results.faceBlendshapes?.length > 0) {
            const blendshapes = results.faceBlendshapes[0].categories;

            const getScore = (name) =>
                blendshapes.find((b) => b.categoryName === name)?.score || 0;

            const smileLeft = getScore("mouthSmileLeft");
            const smileRight = getScore("mouthSmileRight");
            const jawOpen = getScore("jawOpen");
            const browUp = getScore("browInnerUp");
            const frownLeft = getScore("mouthFrownLeft");
            const frownRight = getScore("mouthFrownRight");

            let detectedExpression = "Neutral 😐";

            if (smileLeft > 0.5 && smileRight > 0.5) {
                detectedExpression = "Happy 😄";
            } else if (jawOpen > 0.01 && browUp > 0.01) {
                detectedExpression = "Surprised 😲";
            } else if (frownLeft > 0.01 && frownRight > 0.01) {
                detectedExpression = "Sad 😢";
            }
            
            

            setExpression(detectedExpression);
        }   
    };