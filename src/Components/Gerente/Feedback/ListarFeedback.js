import React, { useState, useEffect } from 'react';
import { getgerente, getfeedback, addfeedback, editfeedback, deletefeedback } from '../../../Service/ApiService';
import './Feedback.css';
import AdicionarFeedback from './AdicionarFeedback';
import EditarFeedback from './EditarFeedback';

const ListarFeedback = () => {
    const [feedbacks, setFeedback] = useState([]);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showEditFeedbackForm, setShowEditFeedbackForm] = useState(false);
    const [selectEditData, setSelectEditData] = useState();
    const [gerentes, setGerentes] = useState([])

    useEffect(() => {
        let mount = true
        getgerente()
        .then(res => {
            setGerentes(res)
            return() => mount = false
        })
    }, [])

    useEffect(() => {
        let mount = true
        getfeedback()
            .then(res => {
                setFeedback(res)
                return () => mount = false
            })
    }, [])

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addfeedback(e.target)
        .then(res => {
            setFeedback([res])
        })
    }

    const handleEditSubmit = (e, feedback_iduser) => {
        e.preventDefault();
        editfeedback(feedback_iduser, e.target)
        .then(res => {
            setFeedback([res])
        })
    }

    const handleEditButton = (feedback) => {
        setSelectEditData(feedback)
        setShowEditFeedbackForm(true)
    }

    const handleDeleteButton = (feedback_iduser) => {
        // e.preventDefault();
        // const token = prompt("TOKEN DE SEGURANÇA NECESSÁRIO:")
        // if (token === manager_token){
        deletefeedback(feedback_iduser)
        .then(res => {
            setFeedback(feedbacks.filter(c => c.feedback_iduser !== feedback_iduser))
        })
        // } else{
        //     alert("TOKEN INVÁLIDO, DIGITE NOVAMENTE!")
        // }
    }

    function handleCancelButton(e) {
        e.preventDefault();
        setShowFeedbackForm(false);
        setShowEditFeedbackForm(false);
    }
    
  return (
    <>
    <div className="container_white">
        <div className="button_add_close">
            <button className="btn btn-primary m-1" onClick={() => setShowFeedbackForm(true)}>ADICIONAR</button>
            <button className="btn btn-danger" onClick={() => setShowFeedbackForm(false)}>X</button>
            {showFeedbackForm && <AdicionarFeedback handleAddSubmit={handleAddSubmit} handleCancelButton={handleCancelButton} />}
            {showEditFeedbackForm && <EditarFeedback handleEditSubmit={handleEditSubmit} selectEditData={selectEditData} handleCancelButton={handleCancelButton}/>}
        </div>
        <h3>LISTA DE FEEDBACKS</h3><br></br>
        <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ID REUNIÃO</th>
                        <th scope="col">TÍTULO</th>
                        <th scope="col">GERENTE</th>
                        <th scope="col">COLABORADOR</th>
                        <th scope="col">DATA/HORA</th>
                        <th scope="col">ANOTAÇÕES</th>
                        <th scope="col">AVALIAÇÃO</th>
                        <th scope="col">AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(feedback => {
                        return (
                            <tr key={feedback.feedback_iduser}>
                                <td>{feedback.feedback_iduser}</td>
                                <td>{feedback.feedback_idschedule}</td>
                                <td>{feedback.feedback_title}</td>
                                <td>{feedback.feedback_manage}</td>
                                <td>{feedback.feedback_collaborator}</td>
                                <td>{feedback.feedback_date}</td>
                                <td>{feedback.feedback_note}</td>
                                <td>{feedback.feedback_evaluate}</td>
                                <td>
                                    {/* <i className="btn btn-primary m-1 bi bi-bookmark-x"/> */}
                                    {/* <i className="btn btn-primary m-1 bi bi-person-up"></i> */}
                                    <i onClick={() => handleEditButton(feedback)} className="btn btn-warning m-1 bi bi-pencil-square"/>
                                    {gerentes.map(gerente => {
                                        return (
                                            <i onClick={() => handleDeleteButton(feedback.feedback_iduser, gerente.manager_token)} className="btn btn-danger m-1 bi bi-trash"/>
                                        )
                                    })}    
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

export default ListarFeedback