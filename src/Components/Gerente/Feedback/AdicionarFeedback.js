import { useState, useContext } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useColaboradores } from "../../../hooks/useColaboradores";
import { useSchedules } from "../../../hooks/useSchedules";

const AdicionarFeedback = ({ handleAddSubmit, IdSchedule, handleCancelButton }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const { gerentes } = useGerentes([]);
  const { colaboradores } = useColaboradores([]);
  const { idGerentes } = useContext(UserContext);
  const { schedules, setSchedules } = useSchedules([]);
    
  return (
    <>
    <div className="container_white">
    <Box onSubmit={handleAddSubmit} component="form" noValidate autoComplete="off">
      <h3 className="text-center">FEEDBACK DA REUNIÃO</h3>

      <TextField sx={{ m: 1, width: '92%' }} name='feedback_title' type="text" defaultValue={IdSchedule.schedule_topic} className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline/>

      {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
        return (
          <TextField sx={{ m: 1, width: '10%' }} type="text" name='feedback_manager_id' className="from__input" id="inputGroup-sizing-default" defaultValue={gerente.manager_id}  label="ID do Gerente" placeholder="ID do Gerente" multiline disabled/>
        )
      })}

      {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
        return (
        <TextField key={gerente.manager_id} sx={{ m: 1, width: '39%' }} type="text"  name='feedback_manage' className="from__input" id="inputGroup-sizing-default" defaultValue={gerente.manager_name} label="Gerente" placeholder="Gerente" multiline disabled/>
        )
      })}

      {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
        return (
          <TextField sx={{ m: 1, width: '10%' }} type="text" name='feedback_collaborator_id' className="from__input" id="inputGroup-sizing-default" defaultValue={gerente.manager_id} label="ID do Colaborador" placeholder="ID do Colaborador" multiline disabled/>
        )
      })}

      <TextField sx={{ m: 1, width: '28%' }} type="text" name='feedback_collaborator' id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline select>
        {colaboradores.map(colaborador => {
        return (
          <MenuItem key={colaborador.collaborator_id} value={colaborador.collaborator_name}>{colaborador.collaborator_name}</MenuItem>
          )
        })}
      </TextField>
      
      <TextField sx={{ m: 1, width: '17%' }} type="text" name='feedback_idschedule' className="from__input" defaultValue={IdSchedule.schedule_id} id="inputGroup-sizing-default" label="ID da Reunião" placeholder="ID da Reunião" multiline disabled/>

      <TextField sx={{ m: 1, width: '15%' }} type="date" name='feedback_date' className="from__input" id="inputGroup-sizing-default" label="Data" InputLabelProps={{ shrink: true, }}/>

      <TextField sx={{ m: 1, width: '15%' }} type="time" name='feedback_hour' className="from__input" id="inputGroup-sizing-default" label="Hora" InputLabelProps={{ shrink: true, }}/>

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='feedback_evaluate'  className="from__input" id="inputGroup-sizing-default" label="Avaliação" placeholder="Avaliação" multiline/>

      <TextField sx={{ m: 1, width: '92%' }} type="text" name='feedback_note' className="from__input" id="basic-url" label="Anotações" placeholder="Anotações" multiline rows={4}/>

      <button className="btn btn-primary m-1" type='submit'>Salvar</button>
      <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
    </Box>
    </div>
    </>
  )
}

export default AdicionarFeedback