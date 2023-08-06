import React, { useState, useEffect } from 'react'
import { UserData } from "./Data";
import { useGerentes } from "../../../hooks/useGerentes";

// import { UserData } from "./DataBase";
import { getcolaboradores } from '../../../Service/ApiService';
import BarChart from './BarChart';
// import LineChart from './components/LineChart';
// import PieChart from './components/PieChart';

const GraficoGeral = () => {
    const [colaboradores, setColaboradores] = useState([])

    useEffect(() => {
    let mount = true
    getcolaboradores()
    .then(res => {console.log(res)
        setColaboradores(res)
        return() => mount = false
    })
    }, [])
    
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.name), //collaborator_name
        datasets: [{
          label: "",
          data: UserData.map((data) => data.userLost),
          backgroundColor: [
            "rgab(75, 192, 192, 1)",
            // "red",
            // "#0079c2",
            "#ecf0f1",
            "#50af95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 0.6,
        }],
    })
  return (
    <div class="container_white">
        <br></br><h2>Gráfico Geral</h2><br></br>
            <div class="row">
                <div style={{width: 850 }} class="col-2">
                    {/* {colaboradores.map(colaborador => {
                        return (
                            <h6 key={colaborador.collaborator_id}>{colaborador.collaborator_name}</h6>
                        )
                    })} */}
                    <BarChart chartData={userData}/>
                    <br></br>
                </div>
                
                {/* <div style={{width: 400 }} class="col-2">
                <BarChart chartData={userData}/>
                </div>
                <div style={{width: 400 }} class="col-2">
                <BarChart chartData={userData}/>
                </div> */}
            </div>
    </div>    
  )
}

export default GraficoGeral;