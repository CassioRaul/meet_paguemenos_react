import { useEffect, useState } from "react";
import { getfeedback } from '../Service/ApiService';

export const usePdi = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        getfeedback()
        .then(res => {
            setFeedback(res)
        })
    }, []);

    return {
        feedback,
        setFeedback,
    };
}
