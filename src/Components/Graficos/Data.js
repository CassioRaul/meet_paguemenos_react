// import { useState, useEffect } from 'react';
// import { UserData } from './EntityUser';
// import { getgerente } from '../../Service/ApiService';

// export function MyUserData() {
// const [gerentes, setGerentes] = useState([])
// const [ listUserData, setListUserData ] = useState([]);

//     useEffect(() => {
//         getgerente()
//         .then(res => {
//             setGerentes(res.data)
//         })
//     }, []);

//     return {
//         gerentes
//     }

// }
import React, { useState, useContext } from 'react';
import { useGerentes } from "../../hooks/useGerentes";
import { UserContext } from "../../context/UserContext";

export const UserData1 = () => {
    const { gerentes, setGerentes } = useGerentes([]);
    const { idGerentes } = useContext(UserContext);

    return (
    <>
    {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
        return (
            <>{gerente.manager_id}</>
        )
    })}
    </>
    )
}

export const UserData = [
    {
        id: 1,
        name: "Cássio",
        year: "2016",
        month: "JANEIRO",
        userGain: 80000,
        userLost: 60,
    },{
        id: 2,
        name: "Ursula",
        year: 2017,
        month: "FEVEREIRO",
        userGain: 45677,
        userLost: 34,
    }
]

//,
//     {
//         id: 2,
//         name: "Ursula",
//         year: 2017,
//         month: "FEVEREIRO",
//         userGain: 45677,
//         userLost: 34,
//     },
//     {
//         id: 3,
//         name: "Icaro",
//         year: 2018,
//         month: "MARÇO",
//         userGain: 78888,
//         userLost: 55,
//     },
//     {
//         id: 4,
//         name: "Sara",
//         year: 2019,
//         month: "ABRIL",
//         userGain: 90000,
//         userLost: 45,
//     },
//     {
//         id: 5,
//         name: "Gabriel",
//         year: 2020,
//         month: "MAIO",
//         userGain: 4300,
//         userLost: 23,
//     },
//     {
//         id: 6,
//         name: "Leonado",
//         year: 2020,
//         month: "JUNHO",
//         userGain: 4300,
//         userLost: 15,
//     },
//     {
//         id: 7,
//         name: "Felipe",
//         year: 2020,
//         month: "JULHO",
//         userGain: 4300,
//         userLost: 50,
//     },    