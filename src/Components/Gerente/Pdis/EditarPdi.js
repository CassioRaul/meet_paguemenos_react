import { Box, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getcolaboradores, getgerente } from '../../../Service/ApiService'

const EditarPdi = ({ handleEditSubmit, selectEditData, handleCancelButton }) => {
  const [gerentes, setGerentes] = useState([])
  const [colaborador, setColaboradores] = useState([])
  const [meta, setMeta] = useState([])

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

  const addMetaButton = (e) => {
    e.preventDefault()
    setMeta([ ...meta, ""]);
  };

  const delMetaButton = (position) => {
    setMeta([ ...meta.filter((_, index) => index !== position)]);
  };

  return (
    <div className="container_white">
      <Box onSubmit={(e)=>handleEditSubmit(e,selectEditData.planning_id)} component="form" noValidate
      autoComplete="off">
        <br></br><h3 className="text-center">EDITAR PDI</h3>

        <TextField sx={{ m: 1, width: '50%' }} name='planning_title' type="text" className="from__input" defaultValue={selectEditData.planning_title} id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo"/>

        <TextField sx={{ m: 1, width: '40%' }} name='planning_date' className="from__input" defaultValue={selectEditData.planning_date} id="inputGroup-sizing-default" label="Data Hora inicial" type="datetime-local"
        InputLabelProps={{
        shrink: true,
        }}/>

        {gerentes.map(gerente => {
        return (
          <TextField key={gerente.manager_id} sx={{ m: 1, width: '50%' }} type="text" name='planning_creator' defaultValue={gerente.manager_name} className="from__input" id="inputGroup-sizing-default" label="Gerente" placeholder="Gerente" disabled multiline/>
        )
        })}

        <TextField sx={{ m: 1, width: '40%' }} type="text" name='planning_contributor_name' className="from__input" id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline select defaultValue={selectEditData.planning_contributor_name}>
        {colaborador.map(colaboradores => {
        return (
          <MenuItem key={colaboradores.collaborator_id} value={colaboradores.collaborator_name}>{colaboradores.collaborator_name}</MenuItem>
        )
        })}
        </TextField>

        <TextField sx={{ m: 1, width: '50%' }} type="text" name='planning_goals' className="from__input" id="inputGroup-sizing-default" defaultValue={selectEditData.planning_goals} label="Meta" placeholder="Meta"/>

        <TextField sx={{ m: 1, width: '40%' }} type="text" name='planning_status' className="from__input" id="inputGroup-sizing-default" defaultValue={selectEditData.planning_status} label="Status" placeholder="Status" multiline select>
          <MenuItem value="Em Andamento">Em Andamento</MenuItem>
          <MenuItem value="Concluído">Concluído</MenuItem>
          <MenuItem value="Em Atraso">Em Atraso</MenuItem>
        </TextField>

        <TextField sx={{ m: 1, width: '50%' }} type="text" name='planning_progess' className="from__input" defaultValue={selectEditData.planning_progess} id="inputGroup-sizing-default" label="Progresso" placeholder="Progresso"/>

        <TextField sx={{ m: 1, width: '40%' }} name='planning_final_date' className="from__input" defaultValue={selectEditData.planning_final_date} id="inputGroup-sizing-default" label="Data Hora Final" type="datetime-local" InputLabelProps={{
        shrink: true,
        }}/>

        <TextField sx={{ m: 1, width: '92%' }} type="text" name='planning_resource' className="from__input" defaultValue={selectEditData.planning_resource} id="inputGroup-sizing-default" label="Recursos" placeholder="Recursos" multiline />

        <TextField sx={{ m: 1, width: '92%' }} type="text" name='planning_description' className="from__input" defaultValue={selectEditData.planning_description} id="inputGroup-sizing-default" label="Descrição" placeholder="Descrição" multiline rows={4} />

        <button className="btn btn-primary m-1" type='submit'>EDITAR</button>
        <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
    </Box>
  </div>
  )
}

export default EditarPdi;