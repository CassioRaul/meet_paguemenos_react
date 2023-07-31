import React, { useEffect, useState } from 'react'
import { getgerente, getpdi, addpdi, editpdi, deletepdi } from '../../../Service/ApiService';
import AddPdi from './AddPdi';
import EditarPdiC from './EditarPdiC';

const ListarPdiC = () => {
    const [pdis, setPdis] = useState([]);
    const [showPdiForm, setShowPdiForm] = useState(false);
    const [showEditPdiForm, setShowEditPdiForm] = useState(false);
    const [selectEditData, setSelectEditData] = useState();
    const [gerentes, setGerentes] = useState([])

    useEffect(() => {
        let mount = true
        getgerente()
        .then(res => {console.log(res)
            setGerentes(res)
            return() => mount = false
        })
    }, [])

  useEffect(() => {
    let mount = true
    getpdi()
    .then(res => {
        setPdis(res)
        return () => mount = false
    })
  }, [])

  const handleAddSubmit = (e) => {
    addpdi(e.target)
    .then(res => {
        setPdis([res])
    })
  }

  const handleEditSubmit = (e, planning_id) => {
    editpdi(planning_id, e.target)
    .then(res => {
        setPdis([res])
    })
  }

  const handleEditButton = (pdi) => {
      setSelectEditData(pdi)
      setShowEditPdiForm(true)
  }

  const handleDeleteButton = (e, planning_id, manager_token) => {
    deletepdi(planning_id)
    .then(res => {
          setPdis(pdis.filter(c => c.planning_id !== planning_id))
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
      <div className="button_add_close">
          <button className="btn btn-primary m-1" onClick={() => setShowPdiForm(true)}>ADICIONAR</button>
          {showPdiForm && <AddPdi handleAddSubmit={handleAddSubmit} handleCancelButton={handleCancelButton} />}
          {showEditPdiForm && <EditarPdiC handleEditSubmit={handleEditSubmit} selectEditData={selectEditData} handleCancelButton={handleCancelButton}/>}
      </div>
          <br></br>
          <h3>LISTA DE PDIS</h3>
          <br></br>
                      
      <table className="form-control table table-hover">
          <thead>
              <tr>
                  <th scope="col">ID</th>
                  <th scope="col">TÍTULO</th>
                  <th scope="col">META</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">PROGRESSO</th>
                  <th scope="col">DATA FINAL</th>
                  <th scope="col">RECURSOS</th>
                  <th scope="col">DESCRIÇÃO</th>
                  <th scope="col">GERENTE</th>
                  <th scope="col">COLABORADOR</th>
                  <th scope="col">DATA DE CRIAÇÃO</th>
                  <th scope="col">AÇÕES</th>
              </tr>
          </thead>
          <tbody>
              {pdis.map(pdi => {
                  return (
                      <tr key={pdi.planning_id}>
                          <td>{pdi.planning_id}</td>
                          <td>{pdi.planning_title}</td>
                          <td>{pdi.planning_goals}</td>
                          <td>{pdi.planning_status}</td>
                          <td>{pdi.planning_progess}</td>
                          <td>{pdi.planning_final_date}</td>
                          <td>{pdi.planning_description}</td>
                          <td>{pdi.planning_resource}</td>
                          <td>{pdi.planning_creator}</td>
                          <td>{pdi.planning_contributor_name}</td>
                          <td>{pdi.planning_date}</td>
                          <td>
                              <i className="btn btn-success m-1 bi bi-bookmark-x"/>
                              <i onClick={() => handleEditButton(pdi)} className="btn btn-warning m-1 bi bi-pencil-square" />
                              {gerentes.map(gerente => {
                              return (
                                  <i onClick={() => handleDeleteButton(pdi.planning_id)} className="btn btn-danger m-1 bi bi-trash" />
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

export default ListarPdiC