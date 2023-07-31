import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap';
import './App.css';
import "./Styles/Footer.css"
import Redirect from './Components/Redirect';
import { UserContextProvider } from './context/UserContext';

const App = () => {
  return (
    <>
      <UserContextProvider>
          <Redirect />
      </UserContextProvider>
    </>
  );
}

export default App;


// import React,{useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'
// import 'bootstrap'
// import './App.css';
// import RedirectUser from './Components/Colaborador/RedirectUser';
// import MainGrid from './Components/Gerente/MainGrid';
// import MainColaboradorGrid from './Components/Colaborador/MainColaboradorGrid';
// import "./Styles/Footer.css"
// import { UserContextProvider } from './context/UserContext';

// const  access = [
//   { nivel: 1, name: "RedirectUser" },
//   { nivel: 2, name: "PageGerente" },
//   { nivel: 3, name: "PageColaborador" },
// ]

// function App() {

//   const [ pagina, setPagina ] = useState(access[0].name);
//   const [ idGerente, setIdGerente ] = useState('');

//   const handleGerenteUpdate = (e) => {
//     console.log(e.target.value);
//     setPagina(access[1].name);
//   }

//   const handleColaboradorUpdate = (e) => {
//     console.log(e.target.value);
//     setPagina(access[2].name)
//   }

//   return (
//     <>
//     <UserContextProvider>
//       {pagina === 'RedirectUser' && <RedirectUser handleGerenteUpdate={handleGerenteUpdate} handleColaboradorUpdate={handleColaboradorUpdate}/>}
       
//       {pagina === 'PageGerente' && <MainGrid />}
//       {pagina === 'PageColaborador' && <MainColaboradorGrid />}
//       <footer className='footer__responsivo'>
//         <p className="text-light m-0 footer-txt"></p>
//       </footer>
//     </UserContextProvider>
//     </>
//   );
// }
// export default App;
