import '../../../assets/stylesheets/body.css'

import { useState, useEffect } from 'react';


function Cuerpo() {

  

  const [conjunto, setConjunto] = useState("");
  const [valorTrue, setValorTrue] = useState("");
  const [parti, setParti] = useState([]);
  const [error, setError] = useState("");
  const [resolver, setResolver] = useState("");
  const [resolve, setPartcion] = useState("");

  const [alert, setAlert] = useState("");
  const [valores, setValores] = useState([]);
  const [resultado, setResultado] = useState([]);

  const validar = async (val) => {


    if (valorTrue === val) {
      alert("La respuesta es correcta")
      setTimeout(() => {
        setError("");
      }, 5000)
    } else {
      alert("La respuesta es incorrecta")
      setTimeout(() => {
        setError("");
      }, 5000)
    }

  };

  const particiones = async () => {
    let res = await fetch('http://localhost:8000/particion', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await res.json();
    setParti(data.falso);
    setValorTrue(data.verdadero)

    console.log(parti);
    console.log(data.verdadero);


  }

  const arregloAPi = async () => {
    let res = await fetch('http://localhost:8000/conjunto', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await res.json();
    setConjunto(data)
    particiones();
    console.log(data);
  }

  const send = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "conjuntos": resolver
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let res = fetch("http://localhost:8000/addConjunto", requestOptions)
      .then(response => response.json())
      .then(result => setValores(result),
      )
      .catch(error => console.log('error', error));
    
      console.log("h", valores)
    
  }

  const enviar = async () => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "particion": resolve
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/addparticiones", requestOptions)
  .then(response => response.text())
  .then(result => setResultado(result))
  .catch(error => console.log('error', error));
      console.log("h", resultado)
    
  }
  return (
    <>
      <form >
        <div className="container">
          <div className="lado-izquierdo">
            <div className="pregunta-numero">
              <p>MODO TUTOR</p>
              <div className="titulo-pregunta">Ingrese un conjunto a resolver</div>
            </div>
          </div>
          <div className="lado-derecho">
            <input className='input' type="text" id='conjunto' onChange={(e) => setResolver(e.target.value)} />
            <button type="button" className='quiz' onClick={() => send()} data-bs-toggle="modal" data-bs-target="#exampleModal">Enviar respuesta</button>
          </div>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Resultados</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {valores.map((valor, index)=>(
                    <li key={index}>{valor}</li>
                ))}
                
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </form>
      {/* fin de modo tutor */}

      <div className="container">
        <p>{error}</p>
        <div className="lado-izquierdo">
          <div className="pregunta-numero">
          <p>MODO ALUMNO</p>
            <button className='exam' onClick={(() => arregloAPi())}>Generar conjunto aleatorio</button>
            <div className="titulo-pregunta">Del conjunto A:  {conjunto} Las siguientes particiones no pertenecen al conjunto A excepto...</div>
          </div>
        </div>
        <div className="lado-derecho">
          {
            parti.map((item, index) =>
              <button key={index} className="quiz" onClick={() => validar(item)} >
                {item}
              </button>
            )

          }
          <button className="quiz" onClick={() => validar(valorTrue)}>
            {valorTrue}
          </button>
        </div>
      </div>

      

      



      <div className="container">
        <div className="lado-izquierdo">
        <div className="pregunta-numero">
        <p>MODO DOC</p>
            <button className='exam' onClick={(() => arregloAPi())}>Generar conjunto aleatorio</button>
            <div className="titulo-pregunta">Realiza las particiones del siguiente conjunto:  {conjunto} </div>
          </div>
        </div>
        <div className="lado-derecho">
          <input className='input' type="text" onChange={(e) => setPartcion(e.target.value)}/>
          <button type="button" className='quiz' onClick={() => enviar()} data-bs-toggle="modal" data-bs-target="#exampleModal1">Enviar respuesta</button>
        </div>

        {/* Modal */}
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Resultados</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                {resultado}
                 
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  )
}

export default Cuerpo