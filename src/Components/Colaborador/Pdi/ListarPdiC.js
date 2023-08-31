import React, { useState, useContext } from 'react';
import { addpdi, editpdi, deletepdi } from '../../../Service/ApiService';

import { UserContext } from "../../../context/UserContext";
import { usePdi } from "../../../hooks/usePdi";

import EditarPdi from './EditarPdiC';
import AdicionarPdi from './AddPdi';
import Search from '../../Gerente/Agendar/Search';

const ListarPdiC = () => {
    const [showPdiForm, setShowPdiForm] = useState(false);
    const [showEditPdiForm, setShowEditPdiForm] = useState(false);
    const [selectEditData, setSelectEditData] = useState();
    const [seach, setSearch] = useState("");

    const { pdis, setPdi } = usePdi([]);
    const { idColaboradores } = useContext(UserContext);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addpdi(e.target)
        .then(res => {
            setPdi([res])
        })
        setShowPdiForm(false)
    }

    const handleEditSubmit = (e, planning_id) => {
        e.preventDefault();
        editpdi(planning_id, e.target)
            .then(res => {
                setPdi([res])
            })
        setShowEditPdiForm(false)
    }

    const handleEditButton = (pdi) => {
        setSelectEditData(pdi)
        setShowEditPdiForm(true)
    }

    const handleDeleteButton = (planning_id) => {
        deletepdi(planning_id)
        .then(res => {
            setPdi(pdis.filter(c => c.planning_id !== planning_id))
        })
    }

    function handleCancelButton(e) {
        e.preventDefault();
        setShowPdiForm(false)
        setShowEditPdiForm(false)
    }

    return (
        <>
            <div className="container_white">
                <Search seach={seach} setSearch={setSearch} />
                <div className="button_add_close">
                    {showEditPdiForm && <EditarPdi handleEditSubmit={handleEditSubmit} selectEditData={selectEditData} handleCancelButton={handleCancelButton} />}
                </div>
                <br></br>
                <br></br><h3>LISTA DE PDIS</h3>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">GERENTE</th>
                            <th scope="col">TÍTULO</th>
                            <th scope="col">META</th>
                            <th scope="col">DESCRIÇÃO</th>
                            <th scope="col">RECURSOS</th>
                            <th scope="col">DATA DE ENTREGA</th>
                            <th scope="col">PROGRESSO</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pdis.filter(pdi => pdi.planning_collaborator_id == idColaboradores && pdi.planning_status === "EM ANDAMENTO" || pdi.planning_status === "EM ATRASO").filter(filterPdi => filterPdi.planning_name_manager.toLowerCase().includes(seach.toLowerCase())).map(pdi => {
                            return (
                                <tr key={pdi.planning_id}>
                                    <td>{pdi.planning_id}</td>
                                    <td>{pdi.planning_name_manager}</td>
                                    <td>{pdi.planning_title}</td>
                                    <td>{pdi.planning_goals}</td>
                                    <td>{pdi.planning_description}</td>
                                    <td>{pdi.planning_resource}</td>
                                    <td>{pdi.planning_final_date}<br></br>{pdi.planning_final_hour}</td>
                                    <td><i class="bi bi-bar-chart-line"/>{pdi.planning_progess}%</td>
                                    <td>
                                        {pdi.planning_status === "EM ANDAMENTO" ?
                                        <i class="bi bi-person-up"></i> : ""}
                                        {pdi.planning_status === "EM ATRASO" ?
                                        <i class="bi bi-person-down"></i> : ""}
                                    </td>
                                    <td>
                                        <i onClick={() => handleEditButton(pdi)} className="btn btn-warning m-1 bi bi-pencil-square" />
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

export default ListarPdiC