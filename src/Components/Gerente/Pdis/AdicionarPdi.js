import { useContext } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useColaboradores } from "../../../hooks/useColaboradores";

const AdicionarPdi = ({ handleAddSubmit, handleCancelButton }) => {
  const { gerentes } = useGerentes([]);
  const { colaboradores } = useColaboradores([]);
  const { idGerentes } = useContext(UserContext);

  return (
    <div className="container_white">
    <Box onSubmit={handleAddSubmit} component="form" noValidate autoComplete="off">
      <h3 className="text-center">CRIAR PDI</h3><br></br>

      {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
          return (
          <TextField sx={{ m: 1, width: '50%' }} type="text" name='planning_name_manager' key={gerente.manager_id} defaultValue={gerente.manager_name} className="from__input" id="inputGroup-sizing-default" label="Gerente" placeholder="Gerente" disabled multiline/>
          )
      })}

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='planning_name_collaborator' className="from__input" id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline select>
      {colaboradores.map(colaborador => {
        return (
          <MenuItem key={colaborador.collaborator_id} value={colaborador.collaborator_name}>{colaborador.collaborator_name}</MenuItem>
        )
      })}
      </TextField>

      {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
        return (
        <TextField sx={{ m: 1, width: '36%' }} type="text" name='planning_manager_id' key={gerente.manager_id} defaultValue={gerente.manager_id} className="from__input" id="inputGroup-sizing-default" label="Id Gerente" placeholder="Id Gerente" disabled multiline/>
        )
      })}

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='planning_collaborator_id' defaultValue="1" className="from__input" id="inputGroup-sizing-default" label="Id Colaborador" placeholder="Id Colaborador" disabled multiline/>

      <TextField sx={{ m: 1, width: '92%' }} type="text" name='planning_title'  className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline />

      <TextField sx={{ m: 1, width: '50%' }} type="text" name='planning_goals' className="from__input" id="inputGroup-sizing-default" label="Meta" placeholder="Meta" multiline />

      <TextField sx={{ m: 1, width: '40%' }} type="text" name='planning_status' className="from__input" id="inputGroup-sizing-default" label="Status" placeholder="Status" multiline select>
        <MenuItem value="CONCLUÍDO">CONCLUÍDO</MenuItem>
        <MenuItem value="EM ATRASO">EM ATRASO</MenuItem>
        <MenuItem value="EM ANDAMENTO">EM ANDAMENTO</MenuItem>
      </TextField>
      
      <TextField sx={{ m: 1, width: '17%' }} type="text" name='planning_progess' className="from__input" id="inputGroup-sizing-default" label="Progresso" placeholder="Progresso" multiline />
      
      <TextField sx={{ m: 1, width: '15%' }} type="date" name='planning_date' className="from__input" id="inputGroup-sizing-default" label="DATA" InputLabelProps={{ shrink: true, }} variant="filled" />

      <TextField sx={{ m: 1, width: '15%' }} type="time" name='planning_hour' className="from__input" id="inputGroup-sizing-default" label="HORA" InputLabelProps={{ shrink: true, }} variant="filled" />

      <TextField sx={{ m: 1, width: '19%' }} type="date" name='planning_final_date' className="from__input" id="inputGroup-sizing-default" label="DATA FINAL" InputLabelProps={{ shrink: true, }} variant="filled" />

      <TextField sx={{ m: 1, width: '19%' }} type="time" name='planning_final_hour' className="from__input" id="inputGroup-sizing-default" label="HORA FINAL" InputLabelProps={{ shrink: true, }} variant="filled" />

      <TextField sx={{ m: 1, width: '92%' }} type="text" name='planning_resource' className="from__input" id="inputGroup-sizing-default" label="Recursos" placeholder="Recursos" multiline />

      <TextField sx={{ m: 1, width: '92%' }} type="text" name='planning_description' className="from__input" id="inputGroup-sizing-default" label="Descrição" placeholder="Descrição" multiline rows={4} />

      <button className="btn btn-primary m-1" type='submit'>Salvar</button>
      <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
    </Box>
    </div>
  )
}

export default AdicionarPdi