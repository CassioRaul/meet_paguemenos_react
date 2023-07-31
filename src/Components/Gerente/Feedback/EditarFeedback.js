import { Box, MenuItem, TextField } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { getschedule } from '../../../Service/ApiService';

import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useColaboradores } from "../../../hooks/useColaboradores";

const EditarFeedback = ({ handleEditSubmit, selectEditData, handleCancelButton }) => {
  const { gerentes } = useGerentes([]);
  const { colaboradores } = useColaboradores([]);
  const { idGerentes } = useContext(UserContext);
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    let mount = true
    getschedule()
    .then(res => {
      setSchedule(res)
        return() => mount = false
    })
  }, [])

  return (
    <>
    <div className="container_white">
    <Box onSubmit={(e)=>handleEditSubmit(e,selectEditData.feedback_iduser)} component="form" noValidateautoComplete="off">
      <h3 className="text-center">EDITAR FEEDBACK</h3><br></br>

      <TextField sx={{ m: 1, width: '20%' }} type="text" name='feedback_idschedule' className="from__input" id="inputGroup-sizing-default" label="ID DA REUNIÃO" placeholder="ID DA REUNIÃO" multiline select>
      {schedule.map(schedules => {
        return (
        <MenuItem value={schedules.schedule_id}>{schedules.schedule_id}</MenuItem>
        )
      })}
      </TextField>

      <TextField sx={{ m: 1, width: '40%' }} name='feedback_date' type="datetime-local" defaultValue={selectEditData.feedback_date} className="from__input" id="inputGroup-sizing-default" label="Data/Hora inicial" InputLabelProps={{
        shrink: true,
      }}
      variant="filled" />

      <TextField sx={{ m: 1, width: '28.5%' }} name='feedback_evaluate' type="text" defaultValue={selectEditData.feedback_evaluate} className="from__input" id="inputGroup-sizing-default" label="Avaliação" placeholder="Avaliação" multiline />

      <TextField sx={{ m: 1, width: '91.5%' }} name='feedback_title' type="text"  defaultValue={selectEditData.feedback_title} className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline />
      
      {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
          return (
          <TextField sx={{ m: 1, width: '50%' }} type="text" name='schedule_name_creator' defaultValue={gerente.manager_name} className="from__input" id="inputGroup-sizing-default" label="Gerente" placeholder="Gerente" disabled multiline/>
          )
        })}

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_name_receiver' className="" id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline select defaultValue={selectEditData.feedback_collaborator}>
        {colaboradores.map(colaborador => {
        return (
          <MenuItem value={colaborador.collaborator_name}>{colaborador.collaborator_name}</MenuItem>
          )
        })}
        </TextField>

      <TextField sx={{ m: 1, width: '91.5%' }} type="text" name='feedback_note' defaultValue={selectEditData.feedback_note} className="from__input" id="basic-url" label="Anotações" placeholder="Anotações" multiline rows={4} />

        <button className="btn btn-primary m-1" type='submit'>EDITAR</button>
        <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
    </Box>
    </div>
    </>
  )
}

export default EditarFeedback