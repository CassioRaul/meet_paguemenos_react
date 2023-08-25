import { useEffect, useState } from "react";
import { getschedule } from '../Service/ApiService';
import { useCallback } from "react";

export const useSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    
    const innerSchedule = useCallback(() => {
        getschedule()
        .then(res => {
            setSchedules(res)
        })
    })
    
    useEffect(() => {
        innerSchedule();
    }, [innerSchedule]);

    return {
        schedules,
        setSchedules,
    };
}
