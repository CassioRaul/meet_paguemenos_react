import React, { useEffect, useState, useContext } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { useGerentes } from "../../../hooks/useGerentes";
import { UserContext } from "../../../context/UserContext";
import { getcolaboradores } from '../../../Service/ApiService';

const EditarReunioes = ({ handleEditSubmit, selectEditData, handleCancelButton }) => {
  const { gerentes } = useGerentes([]);
  const [colaborador, setColaboradores] = useState([])
  const { idGerentes } = useContext(UserContext);

  useEffect(() => {
    let mount = true
    getcolaboradores()
    .then(res => {
      setColaboradores(res)
        return() => mount = false
    })
  }, [])

  return (
    <>
    <div className="container_white">
    <Box onSubmit={(e) => handleEditSubmit(e, selectEditData.schedule_id)} component="form" noValidate
      autoComplete="off">
        <h3 className="text-center">EDITAR REUNIÃO</h3><br></br>

        <TextField sx={{ m: 1, width: '50%' }} name='schedule_topic' type="text" className="from__input" defaultValue={selectEditData.schedule_topic} id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline />

        <TextField sx={{ m: 1, width: '19%' }} type="date" name='schedule_date' className="from__input" defaultValue={selectEditData.schedule_date} id="inputGroup-sizing-default" label="Data" InputLabelProps={{
          shrink: true,
        }}/>

        <TextField sx={{ m: 1, width: '19%' }} type="time" name='schedule_hour' className="from__input" defaultValue={selectEditData.schedule_hour} id="inputGroup-sizing-default" label="Hora" InputLabelProps={{
          shrink: true,
        }}/>

        {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
          return (
          <TextField key={gerente.manager_id} sx={{ m: 1, width: '50%' }} type="text" name='schedule_name_manager' defaultValue={gerente.manager_name} className="from__input" id="inputGroup-sizing-default" label="Gerente" placeholder="Gerente" disabled multiline/>
          )
        })}

        <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_name_collaborator' className="from__input" id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline select defaultValue={selectEditData.schedule_name_collaborator}>
        {colaborador.map(colaboradores => {
        return (
          <MenuItem key={colaboradores.collaborator_id} value={colaboradores.collaborator_name}>{colaboradores.collaborator_name}</MenuItem>
          )
        })}
        </TextField>

        {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
          return (
          <TextField key={gerente.manager_id} sx={{ m: 1, width: '36%' }} type="text" name='schedule_manager_id' defaultValue={gerente.manager_id} className="from__input" id="inputGroup-sizing-default" label="Id Gerente" placeholder="Id Gerente" disabled multiline/>
          )
        })}

        <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_collaborator_id' defaultValue="1" className="from__input" id="inputGroup-sizing-default" label="Id Colaborador" placeholder="Id Colaborador" multiline/>
        
        <TextField sx={{ m: 1, width: '50%' }} type="text" name='schedule_meet_location' defaultValue={selectEditData.schedule_meet_location} className="from__input" id="basic-url" label="Sala" placeholder="Sala" multiline/>

        <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_duration' className="from__input" id="inputGroup-sizing-default" label="Duração" placeholder="30min" multiline select defaultValue={selectEditData.schedule_duration}>
          <MenuItem value="30">30 min</MenuItem>
          <MenuItem value="45">45 min</MenuItem>
          <MenuItem value="60">60 min</MenuItem>
        </TextField>

        <TextField sx={{ m: 1, width: '92%' }} type="text" name='schedule_description' defaultValue={selectEditData.schedule_description} className="from__input" id="basic-url" label="Descrição" placeholder="Descrição" multiline rows={4}/>

        <button className="btn btn-primary m-1" type='submit'>EDITAR</button>
        <button className="btn btn-danger m-1" onClick={handleCancelButton}>FECHAR</button>
    </Box>
    </div>
    </>
  )
}

export default EditarReunioes