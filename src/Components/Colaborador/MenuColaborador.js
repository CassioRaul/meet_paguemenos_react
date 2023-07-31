import { useContext } from "react";
import { Link } from "react-router-dom";
import "../../Styles/FotodePerfil.css";
import PerfilColaborador from '../../Assets/Perfils/usuario.jpg';
import { useColaboradores } from "../../hooks/useColaboradores";
import { UserContext } from "../../context/UserContext";
import 'bootstrap/js/dist/dropdown';

function MenuColaborador() {
  const { colaboradores } = useColaboradores([]);
  const { idColaborador } = useContext(UserContext);

  return (
    <div className="gerente__responsivo MenuColacorador">

      <div className="sesaoPerfil">
        <img className="fotoDePerfil" src={PerfilColaborador} alt="Foto perfil gerente" />

        {colaboradores.filter(colaborador => colaborador.collaborator_id == idColaborador).map(colaborador => {
          return (
            <div key={colaborador.collaborator_id}>
              <h4 className="gerente__nome">{colaborador.collaborator_name}</h4>
              <h6 className="gerente__cargo">{colaborador.collaborator_function}</h6>
            </div>
          )
        })}
      </div>

      <div className="accordion accordion-flush " id="accordionFlushExample">
        <Link to="/AColaborador" className="MenuGerente__Link " >
          <button className="accordion-button collapsed MenuGerente_Button btn_home">
            <i className="bi bi-journal-plus"></i>
            <p>Agendar</p>
          </button>
        </Link>
        <Link to="/PColaborador" className="MenuGerente__Link" >
          <button className="accordion-button collapsed MenuGerente_Button btn_home">
            <i className="bi bi-clipboard2-data"></i>
            <p>Pdi</p>
          </button>
        </Link>
        <Link to="/HColaborador" className="MenuGerente__Link">
          <button className="accordion-button collapsed MenuGerente_Button btn_home">
            <i className="bi bi-clock-history"></i>
            <p>Históricos</p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MenuColaborador