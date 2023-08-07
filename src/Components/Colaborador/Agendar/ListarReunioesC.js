import React, { useState, useContext } from 'react';
import { addschedule, editschedule, deleteschedule } from '../../../Service/ApiService';

import { UserContext } from "../../../context/UserContext";
import { useGerentes } from "../../../hooks/useGerentes";
import { useColaboradores } from "../../../hooks/useColaboradores";
import { useSchedules } from "../../../hooks/useSchedules";
import { useFeedbacks } from "../../../hooks/useFeedbacks";

import EditarReunioes from './EditarReunioesC';
import AdicionarReunioes from './AddReunioes';
import Search from '../../Gerente/Agendar/Search';

// import AdicionarFeedback from '../Feedback/AdicionarFeedback';
// import ListarFeedback from '../Feedback/ListarFeedback';
import GraficoGeral from '../../Gerente/Graficos/GraficoGeral';
import '../../Gerente/Agendar/Agendar.css';
import AdicionarFeedbackC from '../Feedback/AdicionarFeedbackC';
import ListarFeedbackC from '../Feedback/ListarFeedbackC';

const ListarReunioesC = () => {
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [showEditScheduleForm, setShowEditScheduleForm] = useState(false);
    const [selectEditData, setSelectEditData] = useState();
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [IdSchedule, setIdSchedule] = useState();
    const [seach, setSearch] = useState("");

    const { gerentes, setGerentes } = useGerentes([]);
    const { colaboradores, setColaboradores } = useColaboradores([]);
    const { schedules, setSchedules } = useSchedules([]);
    const { feedbacks, setFeedbacks } = useFeedbacks([]);
    const { idGerentes, idColaboradores } = useContext(UserContext);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addschedule(e.target)
        .then(res => {
            setSchedules([res])
        })
        setShowScheduleForm(false)
    }

    // const handleEditSubmitFeedback = (e, schedule_id) => {
    //     e.preventDefault();
    //     editschedule(schedule_id, e.target)
    //     .then(res => {
    //         setSchedules([res])
    //     })
    //     setShowEditScheduleForm(false)
    // }

    const handleEditSubmit = (e, schedule_id) => {
        e.preventDefault();
        editschedule(schedule_id, e.target)
        .then(res => {
            setSchedules([res])
        })
        setShowEditScheduleForm(false)
    }

    const handleEditButton = (schedule) => {
        setSelectEditData(schedule)
        setShowEditScheduleForm(true)
    }

    // const handleIdScheduleSubmit = (e, schedule_id) => {
    //     e.preventDefault();
    //     addfeedback(schedule_id, e.target)
    //     .then(res => {
    //         setFeedbacks([res])
    //     })
    //     setShowFeedbackForm(false)
    // }

    const handleIdScheduleButton = (schedule_id) => {
        setIdSchedule(schedule_id)
        setShowFeedbackForm(true)
    }

    const handleDeleteButton = (schedule_id, manager_token) => {
        // e.preventDefault();
        const token = prompt("TOKEN DE SEGURANÇA NECESSÁRIO:")
        if (token === manager_token) {
            deleteschedule(schedule_id).then(res => {
                setSchedules(schedules.filter(c => c.schedule_id !== schedule_id))
            })
        } else {
            alert("TOKEN INVÁLIDO!")
        }
    }

    function handleCancelButton(e) {
        e.preventDefault();
        setShowScheduleForm(false)
        setShowEditScheduleForm(false)
        setShowFeedbackForm(false)
    }

    return (
        <>
            <div className="container_white container-fluid">
                <div className="button_add_close">
                    <div className='container_display_flex'>
                        <button className="btn btn-primary m-0 i bi-plus-circle " onClick={() => setShowScheduleForm(true)}> ADICIONAR</button>&nbsp;&nbsp;&nbsp;
                        <Search seach={seach} setSearch={setSearch} />
                    </div>
                </div>
                <br></br>
                <div className="button_add_close">
                    {showScheduleForm && <AdicionarReunioes handleAddSubmit={handleAddSubmit} handleCancelButton={handleCancelButton} />}

                    {showEditScheduleForm && <EditarReunioes handleEditSubmit={handleEditSubmit} selectEditData={selectEditData} handleCancelButton={handleCancelButton} />}

                    {showFeedbackForm && <AdicionarFeedbackC handleIdScheduleButton={handleIdScheduleButton} IdSchedule={IdSchedule} handleCancelButton={handleCancelButton}/>}
                </div>
                <br></br>
                <h3>LISTA DE REUNIÕES</h3>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TÍTULO</th>
                            <th scope="col">DESCRIÇÃO</th>
                            <th scope="col">DATA</th>
                            <th scope="col">HORA</th>
                            <th scope="col">GERENTE</th>
                            <th scope="col">LOCAL</th>
                            <th scope="col">DURAÇÃO</th>
                            {/* <th scope="col">STATUS</th> */}
                            <th scope="col">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.filter(schedule => schedule.schedule_collaborator_id == idColaboradores).filter(filterSchedule => filterSchedule.schedule_name_manager.toLowerCase().includes(seach.toLowerCase())).map(schedule => {
                            return (
                                <tr key={schedule.schedule_id}>
                                    <td>{schedule.schedule_id}</td>
                                    <td>{schedule.schedule_topic}</td>
                                    <td>{schedule.schedule_description}</td>
                                    <td>{schedule.schedule_date}</td>
                                    <td>{schedule.schedule_hour}</td>
                                    <td>{schedule.schedule_name_manager}</td>
                                    <td>{schedule.schedule_meet_location}</td>
                                    <td>{schedule.schedule_duration}</td>
                                    {/* <td>{schedule.schedule_status}</td> */}
                                    <td>
                                        <div>
                                            <i onClick={() => handleIdScheduleButton(schedule)} className="btn btn-success m-1 bi bi-calendar2-check" />

                                            <i onClick={() => handleEditButton(schedule)} className="btn btn-warning m-1 bi bi-pencil-square" />
                                            {colaboradores.filter(colaborador => colaborador.collaborator_id == idColaboradores).map(colaborador => {
                                            return (
                                                <i key={colaborador.collaborator_id} onClick={() => handleDeleteButton(schedule.schedule_id, colaborador.collaborator)} className="btn btn-danger m-1 bi bi-trash" />
                                                )
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
            </div>
            <br></br>
            <ListarFeedbackC/>
        </>
    )
}

export default ListarReunioesC


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