import React from 'react'
// MY CSS
import "../../Styles/MeuGerenteColaborador.css"

const MeuGerenteColaborador = () => {
  return (
    <section className="MeuTime__responsivo col-3">
      <h2 className="meuTime__titulo">Meu Gerente</h2>
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-root-margin="0px 0px  -40%"
        data-bs-smooth-scroll="true"
        className="scrollspy-example bg-light p-3 rounded-2 meutime__scroll meuGerente"
        tabIndex="0">
        <div className="meuTime bg-time pt-2">
            
          <div className="meuTime__borda d-flex justify-content-end">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a className="breadcrumb__ancora" href="##">
                    FEEDBACK
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a className="breadcrumb__ancora" href="##">
                     AGENDAR
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MeuGerenteColaborador