import { useState, useEffect } from "react";
import { CoaiState, stateToImages } from "../coai";

type CoaiImage = {
    url: string;
    description: string;
}

const useCoai = () => {
    const [emotion, setEmotion] = useState<CoaiState>(CoaiState.HAPPY);
    const [image, setImage] = useState<CoaiImage>({url: "", description: ""});

    // Private Functions
    const setImageForState = (state: CoaiState, frame: number = 0) => {
        const {frames, description} = stateToImages[state];
        setImage({url: frames[frame], description});
    }

    const updateState = (state: CoaiState) => {
        setEmotion(state);
        setImageForState(state);
    }

    // State Management
    useEffect(() => {
        var frameIndex = 0;
        const {frames} = stateToImages[emotion];

        const interval = setInterval(() => {
            if (frameIndex >= frames.length) {
                frameIndex = 0;
            }
            setImageForState(emotion, frameIndex);
            frameIndex++;
            
        }, 1 * 1000); // Replace x with the desired number of seconds

        return () => clearInterval(interval);
    }, [emotion]);

    return { image, updateState }
};

export default useCoai;