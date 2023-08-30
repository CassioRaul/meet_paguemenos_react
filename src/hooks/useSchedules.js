import { useEffect, useState } from "react";
import { getschedule } from '../Service/ApiService';

export const useSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        getschedule()
        .then(res => {
            setSchedules(res)
        });
    }, []);

    return {
        schedules,
        setSchedules,
    };
}
