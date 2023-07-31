import React, { useState, useContext } from 'react';
import { addschedule, editschedule, deleteschedule } from '../../../Service/ApiService';

import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useSchedules } from "../../../hooks/useSchedules";

import EditarReunioes from './EditarReunioes';
import AdicionarReunioes from './AdicionarReunioes';
import Search from './Search';
import './Agendar.css';
import AdicionarFeedback from '../Feedback/AdicionarFeedback';

const ListarReunioes = () => {
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showEditScheduleForm, setShowEditScheduleForm] = useState(false);
    const [selectEditData, setSelectEditData] = useState();
    const [seach, setSearch] = useState("");

    const { gerentes, setGerentes } = useGerentes([]);
    const { schedules, setSchedules } = useSchedules([]);
    const { idGerentes } = useContext(UserContext);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addschedule(e.target)
            .then(res => {
                setSchedules([res])
            })
    }

    const handleEditSubmit = (e, schedule_id) => {
        e.preventDefault();
        editschedule(schedule_id, e.target)
            .then(res => {
                setSchedules([res])
            })
    }

    const handleEditButton = (schedule) => {
        setSelectEditData(schedule)
        setShowEditScheduleForm(true)
    }

    const handleDeleteButton = (schedule_id) => {
        // e.preventDefault();
        // const token = prompt("TOKEN DE SEGURANÇA NECESSÁRIO:")
        // if (token === manager_token) {
            deleteschedule(schedule_id)
                .then(res => {
                    setSchedules(schedules.filter(c => c.schedule_id !== schedule_id))
                })
        // } else {
        //     alert("TOKEN INVÁLIDO, DIGITE NOVAMENTE!")
        // }
    }

    function handleCancelButton(e) {
        e.preventDefault();
        setShowScheduleForm(false)
        setShowEditScheduleForm(false)
        setShowFeedbackForm(false)
    }

    const handleAddFeedbackButton = (schedule) => {
        // e.preventDefault();
        setSelectEditData(schedule)
        setShowFeedbackForm(true)
    }

    return (
    <>
        <div className="container_white container-fluid">
        <div className="button_add_close">
            {/* <button className="btn btn-primary m-1" onClick={() => setShowScheduleForm(true)}>+</button> */}
            <i class="btn btn-primary m-1 bi bi-plus-circle" onClick={() => setShowScheduleForm(true)}/>
            <Search seach={seach} setSearch={setSearch}/>
        </div>

            <div className="button_add_close">
                {showScheduleForm && <AdicionarReunioes handleAddSubmit={handleAddSubmit} handleCancelButton={handleCancelButton}/>}

                {showEditScheduleForm && <EditarReunioes handleEditSubmit={handleEditSubmit} selectEditData={selectEditData} handleCancelButton={handleCancelButton}/>}

                {showFeedbackForm && <AdicionarFeedback handleAddFeedbackButton={handleAddFeedbackButton} handleCancelButton={handleCancelButton}/>}
            </div>

            <div className='listaDeReunioes'>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">TÍTULO</th>
                        <th scope="col">DESCRIÇÃO</th>
                        <th scope="col">DATA</th>
                        <th scope="col">HORÁRIO</th>
                        <th scope="col">COLABORADOR</th>
                        <th scope="col">SALA</th>
                        <th scope="col">DURAÇÃO</th>
                        {/* <th scope="col">STATUS</th> */}
                        <th scope="col">AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.filter(schedule => schedule.schedule_manager_id == idGerentes).filter(filterSchedule => filterSchedule.schedule_name_collaborator.toLowerCase().includes(seach.toLowerCase())).map(schedule => {
                        return (
                            <tr key={schedule.schedule_id}>
                                <td>{schedule.schedule_id}</td>
                                <td>{schedule.schedule_topic}</td>
                                <td>{schedule.schedule_description}</td>
                                <td>{schedule.schedule_date}</td>
                                <td>{schedule.schedule_hour}</td>
                                <td>{schedule.schedule_name_collaborator}</td>
                                <td>{schedule.schedule_meet_location}</td>
                                <td>{schedule.schedule_duration}</td>
                                {/* <td>{schedule.schedule_status}</td> */}
                                <td>
                                    <div>
                                    <i onClick={() => handleAddFeedbackButton(schedule.schedule_id)} className="btn btn-success m-1 bi bi-calendar2-check" />
                                    <i onClick={() => handleEditButton(schedule)} className="btn btn-warning m-1 bi bi-pencil-square" />
                                    <i onClick={() => handleDeleteButton(schedule.schedule_id)} className="btn btn-danger m-1 bi bi-trash" />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> 
            </div>
        </div>
    </>
    )
}

export default ListarReunioes


//  <br></br>
//                 <h3>LISTA DE REUNIÕES</h3>
//                 <br></br>
//                 <div className='listaDeReunioes'>
//                 <table className="table table-striped table-hover">
//                 <thead>
//                     <tr>
//                         <th scope="col">ID</th>
//                         <th scope="col">TÍTULO</th>
//                         <th scope="col">DATA/HORA</th>
//                         <th scope="col">GERENTE</th>
//                         <th scope="col">COLABORADOR</th>
//                         <th scope="col">LINK</th>
//                         <th scope="col">SALA</th>
//                         <th scope="col">DESCRIÇÃO</th>
//                         <th scope="col">DURAÇÃO</th>
//                         <th scope="col">AÇÕES</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {schedules.map(schedule => {
//                         return (
//                             <tr key={schedule.schedule_id}>
//                                 <td>{schedule.schedule_id}</td>
//                                 <td>{schedule.schedule_topic}</td>
//                                 <td>{schedule.schedule_date_hour}</td>
//                                 <td>{schedule.schedule_name_creator}</td>
//                                 <td>{schedule.schedule_name_receiver}</td>
//                                 <td>{schedule.schedule_meet_link}</td>
//                                 <td>{schedule.schedule_meet_location}</td>
//                                 <td>{schedule.schedule_description}</td>
//                                 <td>{schedule.schedule_duration}</td>
//                                 <td>{/* <i onClick={() => setShowScheduleForm(true)} class="btn btn-primary m-1 bi bi-plus-square"/> */}
//                                     {/* <i onClick={ ()=>handleEditButton(schedule)} class="btn btn-success m-1 bi bi-bell"></i> */}
//                                     <i class="btn btn-primary m-1 bi bi-bookmark-x"/>
//                                     {/* <i class="btn btn-primary m-1 bi bi-person-up"></i> */}
//                                     <i onClick={() => handleEditButton(schedule)} class="btn btn-warning m-1 bi bi-pencil-square"/>
//                                     {gerentes.map(gerente => {
//                                         return (
//                                             <i onClick={() => handleDeleteButton(schedule.schedule_id, gerente.manager_token)} class="btn btn-danger m-1 bi bi-trash"/>
//                                         )
//                                     })}
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//                 </table>
//                 </div>