import { Box, TextField } from '@mui/material';
import React from 'react';

const EditarReunioesC = ({ handleEditSubmit, selectEditData, handleCancelButton }) => {
    return (
      <>
      <div className="container_white">
      <Box onSubmit={(e)=>handleEditSubmit(e,selectEditData.schedule_id)} component="form" noValidate
        autoComplete="off">
          <h3 className="text-center">EDITAR REUNIÃO a</h3><br></br>
  
          <TextField sx={{ m: 1, width: '50%' }} name='schedule_topic' type="text" className="from__input" defaultValue={selectEditData.schedule_topic} id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline/>
  
          <TextField sx={{ m: 1, width: '40%' }} name='schedule_date_hour' defaultValue={selectEditData.schedule_date_hour} className="from__input" id="inputGroup-sizing-default" label="Data Hora inicial" type="datetime-local"/>
  
          <TextField sx={{ m: 1, width: '50%' }} type="text" name='schedule_name_creator' defaultValue={selectEditData.schedule_name_creator} className="from__input" id="inputGroup-sizing-default" label="Gerente" placeholder="Placeholder" multiline/>
  
          <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_name_receiver' defaultValue={selectEditData.schedule_name_receiver} className="from__input" id="inputGroup-sizing-default" label="Colaborador" placeholder="Placeholder" multiline/>
  
          <TextField sx={{ m: 1, width: '92%' }} type="url" name='schedule_meet_link' defaultValue={selectEditData.schedule_meet_link} className="from__input" id="basic-url" label="Link" placeholder="Link" multiline/>
          
          <TextField sx={{ m: 1, width: '50%' }} type="text" name='schedule_meet_location' defaultValue={selectEditData.schedule_meet_location} className="from__input" id="basic-url" label="Sala" placeholder="Sala" multiline/>
  
          <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_duration' defaultValue={selectEditData.schedule_duration} className="from__input" id="filled-number" label="Duração" placeholder="30 min" multiline/>
  
          <TextField sx={{ m: 1, width: '92%' }} type="text" name='schedule_description' defaultValue={selectEditData.schedule_description} className="from__input" id="basic-url" label="Descrição" placeholder="Descrição" multiline rows={4}/>
  
          <button className="btn btn-primary m-1" type='submit'>EDITAR</button>
          <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
      </Box>
      </div>
      </>
    )
  }
  
  export default EditarReunioesC