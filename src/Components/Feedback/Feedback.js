import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { main } from "@popperjs/core";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Feedback.css";
import React from 'react';

const Feedback = ({ handleAddSubmit, handleCancelButton }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <Box className='form__agendar' onSubmit={handleAddSubmit}
      component="form"
      
      noValidate
      autoComplete="off">

      <TextField sx={{ m: 1, width: '50%' }} name='schedule_topic' type="text" className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline />

      <TextField sx={{ m: 1, width: '40%' }} name='schedule_date_hour' className="from__input" id="inputGroup-sizing-default" label="Data Hora inicial" type="datetime-local" InputLabelProps={{
        shrink: true,
      }}
        variant="filled" />

      <TextField sx={{ m: 1, width: '50%' }} type="text" name='schedule_name_creator' className="from__input" id="inputGroup-sizing-default" label="Autor" placeholder="autor" multiline />

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_name_receiver' className="from__input" id="inputGroup-sizing-default" label="Destinatário" placeholder="Placeholder" multiline />
      <div>
        <div className="estrela"  >
          <h2>Avaliação</h2>
          {[1, 2, 3, 4, 5].map((value) => (
            <span className="rating"
              key={value}
              onClick={() => handleClick(value)}
              style={{ color: rating >= value ? 'gold' : 'gray', cursor: 'pointer' }}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>

      <TextField sx={{ m: 1, width: '93%' }} type="text" name='schedule_description' className="from__input" id="basic-url" label="Descrição" placeholder="Descrição" multiline rows={4} />

      <div className="butoes_feedback" >
        <button className="btn btn-primary m-1" type='submit'>Salvar</button>
        <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
      </div>
    </Box>
  )

}


export default Feedback;
