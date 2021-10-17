import { consultarDatabase } from 'config/firebase'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { guardarDatabaseWithId } from 'config/firebase'

const Productos = () => {

    const [listaProductos, setListaProductos] = useState([])
    const [idProv, setIdProv] = useState(nanoid())
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState(1)
    const [valorUnitario, setValorUnitario] = useState('')  

    const cargarProductos = async () => {
   
        const listaTemporal = await consultarDatabase('lista-productos')
        // console.log(listaTemporal);
        setListaProductos(listaTemporal)
      
      }
      // cargarProductos()
    

      const generarId = () =>{
            setIdProv(nanoid())
    }

      useEffect(() => {
        cargarProductos()
      }, [])
    
      const handleAgregarProducto = async (e)=>{
          e.preventDefault()

           const producto = {
            id: idProv,
            descripcion,
            estado,
            valorUnitario
        }
      
          await guardarDatabaseWithId('lista-productos',idProv, producto)
          
      }

    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Productos</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores!</p>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1">Agregar Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2" onClick={cargarProductos}>Buscar/Modificar Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3" onClick={cargarProductos}>Mostrar Productos Registrados</a>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="tab1">
                        <form className="p-3" id="agregarProducto">
                            <fieldset>
                                <div>Espacio para administración y modificación de los productos</div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputID">ID</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="" id="inputId" 
                                    readOnly="readOnly" 
                                    defaultValue = {idProv}
                                    />
                                </div>                               

                                <div className="form-group">
                                    <label htmlFor="descripcion" className="form-label mt-4">Descripcion</label>
                                    <textarea 
                                    className="form-control" 
                                    id="descripcion" 
                                    rows="3"
                                    onChange = {(event) => setDescripcion(event.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="valorUnitario">Valor Unitario</label>
                                    <input 
                                    inputMode="numeric" 
                                    pattern="[0-9]*" 
                                    className="form-control"
                                    placeholder="Valor unitario" 
                                    id="valorUnitario" 
                                    onChange = {(event) => setValorUnitario(event.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-5">
                                    <label htmlFor="estado" className="form-label mt-4">Estado del Producto</label>
                                    <select 
                                    className="form-select" 
                                    id="estado"
                                    onChange = {(event) => setEstado(event.target.value)}
                                    >
                                        <option value="1">Disponible</option>
                                        <option value="0">No Disponible</option>
                                    </select>
                                </div>
                                <div className="container-flex">
                                    <button type="submit" className="btn btn-primary" onClick={handleAgregarProducto}>Agregar</button>
                                    <button type="reset" className="btn btn-warning" onClick={generarId}>Reset</button>

                                    {/* <!--TODO ADD NOTIFICATION --> */}

                                </div>


                            </fieldset>
                        </form>
                    </div>

                    <div className="tab-pane fade" id="tab2">
                        <form className="d-flex mt-2" id="searchForm">
                            <input className="form-control me-sm-2" type="text" placeholder="Search" id="searchValue" />
                            <div className="form-group">
                                <select className="form-select" id="searchOption">
                                    <option value='id'>ID Producto</option>
                                    <option value='descripcion'>Descripcion Producto</option>
                                </select>
                            </div>
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                        </form>

                        <hr/>
                        <div className="mt-5 h4">
                            Search Result
                        </div>
                        <hr/>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="searchByResult">

                                {
                                    listaProductos.map((producto, index) => (
                                        <tr key={producto.id}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{producto.descripcion}</td>
                                          <td>{producto.valorUnitario}</td>
                                          <td>{producto.estado === "1"? "disponible" : "no disponible"}</td>
                                          <td>
                                            <Link className="btn btn-outline-primary btn-sm"
                                              to={`/add-delete-productos/${producto.id}`}>
                                              Editar
                                            </Link>
                    
                                          </td>
                                        </tr>
                                        ))
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className="tab-pane fade" id="tab3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody id = 'searchResult'>

                                <tr>
                                    <th scope="row">Default</th>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>                     
        </>
    )
}

export default Productos
