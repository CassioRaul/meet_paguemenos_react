import React, { useContext, useState } from 'react'
import { useSchedules } from '../../../hooks/useSchedules';
import { UserContext } from '../../../context/UserContext';
import { useColaboradores } from '../../../hooks/useColaboradores';
import Search from '../../Gerente/Agendar/Search';
import { useFeedbacks } from '../../../hooks/useFeedbacks';
import { usePdi } from '../../../hooks/usePdi';

const Historico = () => {
    const [seach, setSearch] = useState("");
    const { colaboradores } = useColaboradores([]);
    const { idColaboradores } = useContext(UserContext);
    const { schedules, setSchedules } = useSchedules([]);
    const { pdis, setPdi } = usePdi([]);
    const { feedbacks, setFeedbacks } = useFeedbacks([]);

    return (
        <>
            <div className="container_white">
                <Search seach={seach} setSearch={setSearch} /><br></br>
                <h3>LISTA DE REUNIÕES</h3><br></br>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">GERENTE</th>
                            <th scope="col">TÍTULO</th>
                            <th scope="col">DATA / HORA</th>
                            <th scope="col">LOCAL / LINK</th>
                            <th scope="col">DESCRIÇÃO</th>
                            <th scope="col">DURAÇÃO</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {schedules.filter(schedule => schedule.schedule_collaborator_id == idColaboradores && schedule.schedule_status_manager === "FINALIZADA" && schedule.schedule_status_collaborator === "FINALIZADA").filter(filterSchedule => filterSchedule.schedule_name_manager.toLowerCase().includes(seach.toLowerCase()) || filterSchedule.schedule_topic.toLowerCase().includes(seach.toLowerCase()) || String(filterSchedule.schedule_id).toLowerCase().includes(seach.toLowerCase())).map(schedule => {
                            return (
                                <tr key={schedule.schedule_id}>
                                    <td>{schedule.schedule_id}</td>
                                    <td>{schedule.schedule_name_manager}</td>
                                    <td>{schedule.schedule_topic}</td>
                                    <td>{schedule.schedule_date} | {schedule.schedule_hour}</td>
                                    <td>{schedule.schedule_meet_location}</td>
                                    <td>{schedule.schedule_description}</td>
                                    <td>{schedule.schedule_duration}</td>
                                    <td>
                                        {schedule.schedule_status_manager === "FINALIZADA" ? <i class="bi bi-check-circle"></i> : <i class="bi bi-x-circle"/>}
                                        {schedule.schedule_status_collaborator === "FINALIZADA" ? <i class="bi bi-check-circle"></i> : <i class="bi bi-x-circle"/>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <br></br>
            <div class="container_white">
                <h3>LISTA DE FEEDBACKS</h3><br></br>
                <div className='listaDeReunioes'>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">REUNIÃO</th>
                                <th scope="col">FUNCIONÁRIO</th>
                                <th scope="col">TÍTULO</th>
                                <th scope="col">DATA</th>
                                <th scope="col">HORA</th>
                                <th scope="col">ANOTAÇÕES</th>
                                <th scope="col">AVALIAÇÃO</th>
                                <th scope="col">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                        {feedbacks.filter(feedback => feedback.feedback_collaborator_id == idColaboradores).filter(filterFeedbacks => filterFeedbacks.feedback_manage.toLowerCase().includes(seach.toLowerCase())).map(feedback => {
                        return (
                            <tr key={feedback.feedback_id}>
                                <td>{feedback.feedback_id}</td>
                                <td>ID {feedback.feedback_idschedule}</td>
                                <td>
                                    {feedback.feedback_funcionario === "GERENTE" ? feedback.feedback_manage : feedback.feedback_collaborator}
                                </td>
                                <td>{feedback.feedback_title}</td>
                                <td>{feedback.feedback_date}</td>
                                <td>{feedback.feedback_hour}</td>
                                <td>{feedback.feedback_note}</td>
                                <td>{feedback.feedback_evaluate} <i class="bi bi-star"/></td>
                                <td><i class="bi bi-check-circle"></i></td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br></br>
            <div class="container_white">
                <h3>LISTA DE PDIS</h3><br></br>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">COLABORADOR</th>
                            <th scope="col">TÍTULO</th>
                            <th scope="col">META</th>
                            <th scope="col">DESCRIÇÃO</th>
                            <th scope="col">RECURSOS</th>
                            <th scope="col">DATA DE CRIAÇÃO</th>
                            <th scope="col">DATA DE ENTREGA</th>
                            <th scope="col">PROGRESSO</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pdis.filter(pdi => pdi.planning_collaborator_id == idColaboradores && pdi.planning_status === "CONCLUÍDO").filter(filterpdis => filterpdis.planning_name_collaborator.toLowerCase().includes(seach.toLowerCase()) || filterpdis.planning_title.toLowerCase().includes(seach.toLowerCase()) || String(filterpdis.planning_id).toLowerCase().includes(seach.toLowerCase())).map(pdi => {
                            return (
                                <tr key={pdi.planning_id}>
                                    <td>{pdi.planning_id}</td>
                                    <td>{pdi.planning_name_collaborator}</td>
                                    <td>{pdi.planning_title}</td>
                                    <td>{pdi.planning_goals}</td>
                                    <td>{pdi.planning_description}</td>
                                    <td>{pdi.planning_resource}</td>
                                    <td>{pdi.planning_date} | {pdi.planning_hour}</td>
                                    <td>{pdi.planning_final_date} | {pdi.planning_final_hour}</td>
                                    <td>{pdi.planning_progess}</td>
                                    <td>
                                        {pdi.planning_status === "CONCLUÍDO" ?
                                        <i class="bi bi-clipboard2-check"></i> : <i class="bi bi-x-circle"/>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Historico
