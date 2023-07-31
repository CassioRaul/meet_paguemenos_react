import { Box, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getcolaboradores, getgerente, getschedule } from '../../../Service/ApiService';
import handleAddFeedback from '../Feedback/ListarFeedback';

const AdicionarFeedback = ({ handleAddSubmit }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [gerentes, setGerentes] = useState([])
  const [colaborador, setColaboradores] = useState([])
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    let mount = true
    getschedule()
    .then(res => {
      setSchedule(res)
        return() => mount = false
    })
  }, [])

  useEffect(() => {
    let mount = true
    getcolaboradores()
    .then(res => {
      setColaboradores(res)
        return() => mount = false
    })
  }, [])

  useEffect(() => {
    let mount = true
    getgerente()
    .then(res => {
        setGerentes(res)
        return() => mount = false
    })
  }, [])

  function handleCancelButton(e) {
    e.preventDefault();
    setShowFeedbackForm(false)
  }
  
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
      setRating(value);
  };
    
  return (
    <>
    <div className="container_white">
    <Box onSubmit={ handleAddSubmit } component="form" noValidate autoComplete="off">
      <br></br>
      <h3 className="text-center">FEEDBACK DA REUNIÃO</h3><br></br>

      <TextField sx={{ m: 1, width: '20%' }} type="text" name='feedback_idschedule' className="from__input" id="inputGroup-sizing-default" label="ID DA REUNIÃO" placeholder="ID DA REUNIÃO" multiline select>
      {schedule.map(schedules => {
        return (
        <MenuItem value={schedules.schedule_id}>{schedules.schedule_id}</MenuItem>
        )
      })}
      </TextField>

      <TextField sx={{ m: 1, width: '40%' }} name='feedback_date' type="datetime-local" className="from__input" id="inputGroup-sizing-default" label="Data/Hora inicial" InputLabelProps={{
        shrink: true,
      }}
      variant="filled" />

      <TextField sx={{ m: 1, width: '28.5%' }} name='feedback_evaluate' type="text" className="from__input" id="inputGroup-sizing-default" label="Avaliação" placeholder="Avaliação" multiline />

      <TextField sx={{ m: 1, width: '91.5%' }} name='feedback_title' type="text" className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline />

      {gerentes.map(gerente => {
        return (
        <TextField sx={{ m: 1, width: '50%' }} type="text" name='feedback_manage' defaultValue={gerente.manager_name} className="from__input" id="inputGroup-sizing-default" label="Gerente" placeholder="Gerente" disabled multiline/>
        )
      })}

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='feedback_collaborator' className="from__input" id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline select>
      {colaborador.map(colaboradores => {
      return (
        <MenuItem value={colaboradores.collaborator_name}>{colaboradores.collaborator_name}</MenuItem>
        )
      })}
      </TextField>

      <TextField sx={{ m: 1, width: '91.5%' }} type="text" name='feedback_note' className="from__input" id="basic-url" label="Anotações" placeholder="Anotações" multiline rows={4}/>

      <div className="butoes_feedback">
        <button className="btn btn-primary m-1" type='submit'>Salvar</button>
        
      </div>
    </Box>    
    </div>
    </>
  )
}

export default AdicionarFeedback