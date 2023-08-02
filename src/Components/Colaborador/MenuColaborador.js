import { useContext } from "react";
import { Link } from "react-router-dom";
import "../../Styles/FotodePerfil.css";
import "../../Styles/MenuGerente.css";
import PerfilColaborador from '../../Assets/Perfils/usuario.jpg';
import { useColaboradores } from "../../hooks/useColaboradores";
import { UserContext } from "../../context/UserContext";
import 'bootstrap/js/dist/dropdown';


function MenuColaborador() {
  const { colaboradores } = useColaboradores([]);
  const { idColaborador } = useContext(UserContext);

  return (
    <div className="gerente__responsivo MeuGerente">

      <div className="sesaoPerfil">
        <img className="fotoDePerfil" src={PerfilColaborador} alt="Foto perfil colaborador" />

        {colaboradores.filter(colaborador => colaborador.collaborator_id == idColaborador).map(colaborador => {
          return (
            <div key={colaborador.collaborator_id}>
              
            </div>
          )
        })}
      </div>
      <div className="accordion accordion-flush " id="accordionFlushExample">
        <Link to="/AColaborador" className="MenuGerente__Link " >
          <button className="accordion-button collapsed MenuGerente__Button btn__home">
            <i className="bi bi-journal-plus" />Agendar
          </button>
        </Link>
        <Link to="/PColaborador" className="MenuGerente__Link" >
          <button className="accordion-button collapsed MenuGerente__Button btn__home">
            <i className="bi bi-clipboard2-data"></i>
            <p>Pdi</p>
          </button>
        </Link>
        <Link to="/HColaborador" className="MenuGerente__Link">
          <button className="accordion-button collapsed MenuGerente__Button btn__home">
            <i className="bi bi-clock-history"></i>
            <p>Históricos</p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MenuColaborador