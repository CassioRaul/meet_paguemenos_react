import { useState, useContext } from 'react';
import { addfeedback, editfeedback, deletefeedback } from '../../../Service/ApiService';
import AdicionarFeedbackC from '../Feedback/AdicionarFeedbackC';
import EditarFeedbackC from '../Feedback/EditarFeedbackC';
import { useGerentes } from "../../../hooks/useGerentes";
import { useFeedbacks } from "../../../hooks/useFeedbacks";
import { UserContext } from "../../../context/UserContext";
import Search from '../../Gerente/Agendar/Search';

const ListarFeedbackC = () => {
    // Estados para controlar a exibição dos formulários de adição e edição de feedbacks
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showEditFeedbackForm, setShowEditFeedbackForm] = useState(false);
    const [selectEditData, setSelectEditData] = useState();
    const [seach, setSearch] = useState("");

    const { gerentes, setGerentes } = useGerentes([]);
    const { feedbacks, setFeedbacks } = useFeedbacks([]);
    const { idGerentes, idColaboradores } = useContext(UserContext);
    // Manipuladores de envio de formulários
    const handleAddSubmit = (e) => {
        e.preventDefault();
        // Adicionar um novo feedback e atualizar a lista de feedbacks
        addfeedback(e.target)
            .then(res => {
                setFeedbacks([res])
            })
    }

    const handleEditSubmit = (e, feedback_id) => {
        e.preventDefault();
        // Editar um feedback existente e atualizar a lista de feedbacks
        editfeedback(feedback_id, e.target)
            .then(res => {
                setFeedbacks([res])
            })
    }
    // Manipulador para abrir o formulário de edição de feedback
    const handleEditButton = (feedback) => {
        setSelectEditData(feedback)
        setShowEditFeedbackForm(true)
    }
    // Manipulador para excluir um feedback
    const handleDeleteButton = (feedback_id) => {
        deletefeedback(feedback_id)
            .then(res => {
                setFeedbacks(feedbacks.filter(c => c.feedback_id !== feedback_id))
            })
    }
    // Manipulador para cancelar a adição ou edição de feedback
    function handleCancelButton(e) {
        e.preventDefault();
        setShowFeedbackForm(false);
        setShowEditFeedbackForm(false);
    }

    return (
        <div className="container_white">
            <div className="button_add_close">
                <div className='container_display_flex'></div>
                <Search seach={seach} setSearch={setSearch} />
            </div>
            <div className="button_add_close">
                {showFeedbackForm && <AdicionarFeedbackC handleAddSubmit={handleAddSubmit} handleCancelButton={handleCancelButton} />}
                {showEditFeedbackForm && <EditarFeedbackC handleEditSubmit={handleEditSubmit} selectEditData={selectEditData} handleCancelButton={handleCancelButton} />}
            </div>

            <br></br><h3>LISTA DE FEEDBACKS</h3>
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
                        <th scope="col">AÇÕES</th>
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
                                <td>
                                    {feedback.feedback_funcionario === "COLABORADOR" ?
                                    <i onClick={() => handleEditButton(feedback)} className="btn btn-warning m-1 bi bi-pencil-square" /> : <i className="btn btn-secondary m-1 bi bi-pencil-square" />}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListarFeedbackC