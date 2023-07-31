import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useState, useContext } from 'react';

import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useColaboradores } from "../../../hooks/useColaboradores";
import '../../Gerente/Agendar/Agendar.css';
import ModalColaborador from '../../ModalColaborador';

const AdicionarReunioes = ({ handleAddSubmit, handleCancelButton }) => {
  const { gerentes } = useGerentes([]);
  const { colaboradores } = useColaboradores([]);
  const { idColaborador } = useContext(UserContext);
  const [idGerentes, SetIdGerente] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleIdColaborador = (e) => {
    e.preventDefault();
    SetIdGerente(e.target.value);
  }

  const handleSelectColaborador = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  return (
    <>
      <div className="container_white">
        <Box onSubmit={handleAddSubmit} component="form" noValidate autoComplete="off">
          <h3 className="text-center">AGENDAR REUNIÃO</h3><br></br>
          a
          {colaboradores.filter(colaborador => colaborador.collaborator_id == idColaborador).map(colaborador => {
            return (
              <TextField sx={{ m: 1, width: '92%' }} type="text" name='schedule_name_receiver' key={colaborador.collaborator_id} defaultValue={colaborador.collaborator_name} className="from__input" id="inputGroup-sizing-default" label="Colaborador" placeholder="Coladorador" disabled multiline />
            )
          })}

          <button className="btn btn-primary m-1" onClick={handleSelectColaborador}>SELECIONAR<br></br>COLABORADOR</button>

          {/* <ModalColaborador isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
          <Box onSubmit={handleIdColaborador} component="form" noValidate autoComplete="off"> */}
          <TextField sx={{ width: '100%' }} type="text" name='schedule_name_creator' id="inputGroup-sizing-default" label="Gerente" placeholder="Gerente" multiline select>
            {gerentes.map(gerente => {
              return (
                <MenuItem key={gerente.manager_id} value={gerente.manager_name}>{gerente.manager_name}</MenuItem>
              )
            })}
          </TextField>
          {/* {colaboradores.map(colaborador => {
              return (
                <input type="text" value={colaborador.collaborator_id}/>
              )
            })}
            <button className="btn btn-primary m-1" type="submit">Salvar</button>
          </Box>
        </ModalColaborador> */}

          {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
            return (
              <TextField sx={{ m: 1, width: '36%' }} type="text" name='schedule_manager_id' key={gerente.manager_id} defaultValue={gerente.manager_id} className="from__input" id="inputGroup-sizing-default" label="Id Gerente" placeholder="Id Gerente" disabled multiline />
            )
          })}

          <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_collaborator_id' defaultValue="1" className="from__input" id="inputGroup-sizing-default" label="Id Colaborador" placeholder="Id Colaborador" disabled multiline />

          <TextField sx={{ m: 1, width: '50%' }} name='schedule_topic' type="text" className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline />

          <TextField sx={{ m: 1, width: '40%' }} type="datetime-local" name='schedule_date_hour' className="from__input" id="inputGroup-sizing-default" label="Data/Hora inicial" InputLabelProps={{
            shrink: true,
          }}
            variant="filled" />

          <TextField sx={{ m: 1, width: '50%' }} type="text" name='schedule_meet_location' className="from__input" id="inputGroup-sizing-default" label="Local" placeholder="Local" multiline />

          <TextField sx={{ m: 1, width: '40%' }} type="text" name='schedule_duration' className="from__input" id="inputGroup-sizing-default" label="Duração" placeholder="30min" multiline select>
            <MenuItem value="30">30</MenuItem>
            <MenuItem value="45">45</MenuItem>
            <MenuItem value="60">60</MenuItem>
          </TextField>

          <TextField sx={{ m: 1, width: '92%' }} type="text" name='schedule_description' className="from__input" id="inputGroup-sizing-default" label="Descrição" placeholder="Descrição" multiline rows={4} />

          <button className="btn btn-primary m-1" type='submit'>Salvar</button>
          <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
          <br></br>
        </Box>
      </div>
    </>
  )
}

export default AdicionarReunioes;