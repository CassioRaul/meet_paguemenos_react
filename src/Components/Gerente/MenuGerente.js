import { useContext } from "react";
import { Link } from "react-router-dom";
import PerfilGerente from "../../Assets/Perfils/usuario.jpg";
import "../../Styles/MenuGerente.css"
import "../../Styles/FotodePerfil.css";
import { useGerentes } from "../../hooks/useGerentes";
import { UserContext } from "../../context/UserContext";
import 'bootstrap/js/dist/dropdown';

const MenuGerente = () => {
  const { gerentes } = useGerentes([]);
  const { idGerentes } = useContext(UserContext);

  return (
    <div className="gerente__responsivo MeuGerente">

      <div className="sesaoPerfil">
        <img className="fotoDePerfil" src={PerfilGerente} alt="Foto perfil gerente"/>
        {gerentes.filter(gerente => gerente.manager_id == idGerentes).map(gerente => {
          return (
            <div key={gerente.manager_id}>
              <h4 className="gerente__nome">{gerente.manager_name}</h4>
              <h6 className="gerente__cargo">{gerente.manager_function}</h6>
            </div>
          )
        })}
      </div>
      <div className="accordion accordion-flush " id="accordionFlushExample">
        <Link to="/AGerente" className="MenuGerente__Link " >
          <button className="accordion-button collapsed MenuGerente__Button btn__home">
            <i className="bi bi-journal-plus"></i>
            <p>Agendar</p> 
          </button>
        </Link>
        <Link to="/PGerente" className="MenuGerente__Link" >
          <button className="accordion-button collapsed MenuGerente__Button btn__home">
            <i className="bi bi-clipboard2-data"></i>
            <p>Pdi</p>
          </button>
        </Link>
        <Link to="/HGerente" className="MenuGerente__Link">
          <button className="accordion-button collapsed MenuGerente__Button btn__home">
            <i className="bi bi-clock-history"></i>
            <p>Históricos</p> 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuGerente;