import { Box, MenuItem, TextField } from '@mui/material'
import { useEffect, useState, useContext } from 'react'

import { getschedule } from '../../../Service/ApiService';
import handleAddFeedback from '../Feedback/ListarFeedback';
import ListarFeedback from '../Feedback/ListarFeedback';

import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useColaboradores } from "../../../hooks/useColaboradores";

const AdicionarFeedback = ({ handleAddSubmit, handleCancelButton }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
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
    <Box onSubmit={ handleAddSubmit } component="form" noValidate autoComplete="off">
      <br></br>
      <h3 className="text-center">FEEDBACK DA REUNIÃO</h3><br></br>

      <TextField sx={{ m: 1, width: '92%' }} name='feedback_title' type="text" className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline />

      <TextField sx={{ m: 1, width: '17%' }} type="text" name='feedback_idschedule' className="from__input" id="inputGroup-sizing-default" label="ID DA REUNIÃO" placeholder="ID DA REUNIÃO" multiline select>
      {schedule.map(schedules => {
        return (
        <MenuItem value={schedules.schedule_id}>{schedules.schedule_id}</MenuItem>
        )
      })}
      </TextField>

      <TextField sx={{ m: 1, width: '15%' }} type="date" name='feedback_date' className="from__input" id="inputGroup-sizing-default" label="DATA" InputLabelProps={{ shrink: true, }} variant="filled" />

      <TextField sx={{ m: 1, width: '15%' }} type="time" name='feedback_hour' className="from__input" id="inputGroup-sizing-default" label="HORA" InputLabelProps={{ shrink: true, }} variant="filled" />

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='feedback_evaluate'  className="from__input" id="inputGroup-sizing-default" label="Avaliação" placeholder="Avaliação" multiline />

      {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
        return (
        <TextField sx={{ m: 1, width: '50%' }} type="text" name='feedback_manage' defaultValue={gerente.manager_name} className="from__input" id="inputGroup-sizing-default" label="Gerente" placeholder="Gerente" disabled multiline/>
        )
      })}

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='feedback_collaborator' className="from__input" id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline select>
      {colaboradores.map(colaborador => {
      return (
        <MenuItem value={colaborador.collaborator_name}>{colaborador.collaborator_name}</MenuItem>
        )
      })}
      </TextField>

      <TextField sx={{ m: 1, width: '92%' }} type="text" name='feedback_note' className="from__input" id="basic-url" label="Anotações" placeholder="Anotações" multiline rows={4}/>

      <button className="btn btn-primary m-1" type='submit'>Salvar</button>
      <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
    </Box>
    </div>
    </>
  )
}

export default AdicionarFeedback