import React, {useEffect, useState} from 'react';
import "bootswatch/dist/vapor/bootstrap.min.css";
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App(){
  const baseUrl="https://localhost:44376/api/Cliente";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [gestorSeleccionado, setGestorSeleccionado]=useState({
    codigo : '',
    nombre : '',
    telefono : '',
    email : ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar)
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar)
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar)
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error)
    })
  }

  const peticionPost=async()=>{
    delete gestorSeleccionado.codigo;
    await axios.post(baseUrl, gestorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error)
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+gestorSeleccionado.codigo, gestorSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(gestor=>{
        if(gestor.codigo===gestorSeleccionado.codigo){
          gestor.nombre=respuesta.nombre;
          gestor.telefono=respuesta.telefono;
          gestor.email=respuesta.email;
        }
      })
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error)
    })
  }
  
  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+parseInt(gestorSeleccionado.codigo))
    .then(response=>{
      setData(data.filter(gestor=>gestor.codigo!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error)
    })
  }

  const seleccionarGestor=(gestor, caso)=>{
    setGestorSeleccionado(gestor);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  useEffect(() => {
    peticionGet();
    },[])

  return(
    <div className="App">
      <h1>Clientes</h1>
      <br/><br/>
      <button className="btn btn-outline-success" onClick={()=>abrirCerrarModalInsertar()}>Agregar Cliente</button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Botones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(gestor => (
            <tr key={gestor.codigo}>
              <td>{gestor.codigo}</td>
              <td>{gestor.nombre}</td>
              <td>{gestor.telefono}</td>
              <td>{gestor.email}</td>
              <td>
                <button className="btn btn-outline-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Editar</button>{" "}
                <button className="btn btn-outline-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Cliente</ModalHeader>
        <ModalBody>
          <div>
            <label className="form-label mt-4">Nombre: </label>
            <br/>
            <input type="text" className="form-control me-sm-2" name="nombre" onChange={handleChange}/>
            <br/>
            <label className="form-label mt-4">Telefono: </label>
            <br/>
            <input type="text" className="form-control me-sm-2" name="telefono" onChange={handleChange}/>
            <br/>
            <label className="form-label mt-4">Email: </label>
            <br/>
            <input type="text" className="form-control me-sm-2" name="email" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button class="btn btn-light" onClick={()=>peticionPost()}>Insertar</button>{"  "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalBody>
          <div>
            <label className="form-label mt-4">Codigo</label>
            <br/>
            <input type="text" readOnly className="form-control me-sm-2" value={gestorSeleccionado && gestorSeleccionado.codigo}/>
            <br/>
            <label className="form-label mt-4">Nombre: </label>
            <br/>
            <input type="text" name="nombre" className="form-control me-sm-2" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nombre}/>
            <br/>
            <label className="form-label mt-4">Telefono: </label>
            <br/>
            <input type="text" name="telefono" className="form-control me-sm-2" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.telefono}/>
            <br/>
            <label className="form-label mt-4">Email: </label>
            <br/>
            <input type="text" name="email" className="form-control me-sm-2" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.email}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"  "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el registro {gestorSeleccionado && gestorSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" 
          onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button className="btn btn-secundary"
          onClick={()=>abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default App;