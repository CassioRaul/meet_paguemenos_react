// Importação de componentes e funções necessárias do Material UI, React e contexto personalizado
import { Box, MenuItem, TextField } from '@mui/material';
import { useState, useContext } from 'react';
// Importação do contexto de usuário e hooks personalizados
import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useColaboradores } from "../../../hooks/useColaboradores";

const EditarFeedbackC = ({ handleEditSubmit, selectEditData, handleCancelButton }) => {
  // Obtendo a lista de gerentes usando o hook useGerentes
  const { gerentes } = useGerentes([]);
  // Obtendo a lista de colaboradores usando o hook useColaboradores
  const { colaboradores } = useColaboradores([]);
  // Obtendo o ID do gerente atual do contexto do usuário
  const { idGerentes } = useContext(UserContext);
  // Inicializando o estado para as agendas (schedules)
  const [schedules, setSchedule] = useState([])

  return (

    <div className="container_white">
      <Box onSubmit={(e) => handleEditSubmit(e, selectEditData.feedback_id)} component="form" noValidateautoComplete="off">
        <h3 className="text-center">EDITAR FEEDBACK</h3>

        <TextField sx={{ m: 1, width: '92%' }} name='feedback_title' type="text" className="from__input" id="inputGroup-sizing-default" label="Titulo" placeholder="Titulo" multiline defaultValue={selectEditData.feedback_title} disabled />

        <TextField sx={{ m: 1, width: '10%' }} type="text" name='feedback_manager_id' className="from__input" id="inputGroup-sizing-default" defaultValue={selectEditData.feedback_manager_id} label="ID do Gerente" placeholder="ID do Gerente" multiline disabled />

        <TextField sx={{ m: 1, width: '39%' }} type="text" name='feedback_manage' className="from__input" id="inputGroup-sizing-default" defaultValue={selectEditData.feedback_manage} label="Gerente" placeholder="Gerente" multiline disabled />

        <TextField sx={{ m: 1, width: '10%' }} type="text" name='feedback_collaborator_id' className="from__input" id="inputGroup-sizing-default" defaultValue={selectEditData.feedback_collaborator_id} label="ID do Colaborador" placeholder="ID do Colaborador" multiline disabled />

        <TextField sx={{ m: 1, width: '28%' }} type="text" name='feedback_collaborator' id="inputGroup-sizing-default" label="Colaborador" placeholder="Colaborador" multiline defaultValue={selectEditData.feedback_collaborator} disabled />

        <TextField sx={{ m: 1, width: '17%' }} type="text" name='feedback_idschedule' defaultValue={selectEditData.feedback_idschedule} className="from__input" id="inputGroup-sizing-default" label="ID da Reunião" placeholder="ID da Reunião" multiline disabled />

        <TextField sx={{ m: 1, width: '15%' }} name='feedback_date' type="text" defaultValue={selectEditData.feedback_date} className="from__input" id="inputGroup-sizing-default" label="Data" InputLabelProps={{
          shrink: true,
        }} disabled />

        <TextField sx={{ m: 1, width: '15%' }} name='feedback_hour' type="text" defaultValue={selectEditData.feedback_hour} className="from__input" id="inputGroup-sizing-default" label="Hora" InputLabelProps={{
          shrink: true,
        }} disabled />

        <TextField sx={{ m: 1, width: '40%' }} type="text" name='feedback_evaluate' className="from__input" id="inputGroup-sizing-default" label="Avaliação" placeholder="Avaliação" defaultValue={selectEditData.feedback_evaluate} multiline select>
          <MenuItem value={1}> <i class="bi bi-star-fill"></i></MenuItem>
          <MenuItem value={2}><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></MenuItem>
          <MenuItem value={3}><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></MenuItem>
          <MenuItem value={4}><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></MenuItem>
          <MenuItem value={5}><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></MenuItem>
        </TextField>

        <TextField sx={{ m: 1, width: '92%' }} type="text" name='feedback_note' defaultValue={selectEditData.feedback_note} className="from__input" id="basic-url" label="Anotações" placeholder="Anotações" multiline rows={4} />

        <button className="btn btn-primary m-1" type='submit'>EDITAR</button>
        <button className="btn btn-danger m-1" onClick={handleCancelButton}>Fechar</button>
      </Box>
    </div>
  )
}

export default EditarFeedbackC