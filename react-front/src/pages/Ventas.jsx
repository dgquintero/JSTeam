import { consultarDatabase } from 'config/firebase'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { guardarDatabaseWithId } from 'config/firebase'
import Swal from 'sweetalert2'
import { busquedaDatabase } from 'config/firebase'

const Ventas = () => {

    const [idVentProv, setIdVentProv] = useState(nanoid())
    const [valorTotal, setValorTotal] = useState(0)
    const [listaVentas, setListaVentas] = useState([])
    const [cantidad, setCantidad] = useState(0)
    const [fecha, setfecha] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [idCliente, setIdCliente] = useState('')
    const [listEncargado, setListEncargado] = useState([])
    const [encargado, setEncargado] = useState('')


    const [listaProductos, setListaProductos] = useState([])
    const [idProv, setIdProv] = useState('')
    // const [estado, setEstado] = useState('1')
    const [valorUnitario, setValorUnitario] = useState(0)


    const cargarDatos = async () => {

        const listaProductosTemporal = await consultarDatabase('lista-productos')
        const listaVentasTemporal = await consultarDatabase('lista-ventas')
        const listaTemporalEncargados = await busquedaDatabase('listaUsuarios', 'rol', "2")

        setListEncargado(listaTemporalEncargados)
        setListaVentas(listaVentasTemporal)
        setListaProductos(listaProductosTemporal)
    }

    useEffect(() => {
        cargarDatos()
    }, [])

    const generarId = () => {
        setIdVentProv(nanoid())
    }

    const seleccionProducto = (e) => {
        const valoresProductoActual = e.target.value.split(",")
        console.log(valoresProductoActual);
        setIdProv(valoresProductoActual[0])
        setValorUnitario(parseInt(valoresProductoActual[1]))
        // setEstado(valoresProductoActual[2])             
    }

    const calcularValorTotal = (e) => {
        e.preventDefault()
        const total = cantidad * valorUnitario
        setValorTotal(total)
        console.log(valorTotal);
    }

    const handleAgregarVenta = async (e) => {
        e.preventDefault()

        const venta = {
            cantidad,
            clienteName: nombreCliente,
            encargado,
            fecha,
            idCliente,
            idProduct: idProv,
            idVenta: idVentProv,
            valorTotal,
            estado: "En proceso",
            valorUnitario
        }

        await guardarDatabaseWithId('lista-ventas', idVentProv, venta)

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto se agregó con éxito',
            showConfirmButton: false,
            timer: 1500
        })


        setValorTotal(0)
        setCantidad(0)
        setfecha('')
        setNombreCliente('')
        setIdCliente('')
        setEncargado('')
        setIdProv('')
        setValorUnitario(0)

    }

    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Ventas</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores!</p>


                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1" >Registrar Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2" onClick={cargarDatos}>Buscar/Modificar Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3" onClick={cargarDatos}>Mostrar Ventas Registrados</a>
                    </li>
                </ul>

                <div id="myTabContent" className="tab-content">

                    <div className="tab-pane fade active show" id="tab1">
                        <form className="p-3" id="agregarVenta">
                            <fieldset>
                                <div>Espacio para registrar ventas</div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputDefault">ID Venta</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="ID Venta"
                                        id="idVenta"
                                        readOnly="readOnly"
                                        defaultValue={idVentProv}
                                    />
                                </div>

                                <div className="form-group">

                                    <label htmlFor="ProductoSelect" className="form-label mt-4">Producto</label>

                                    <select
                                        className="form-select"
                                        id="producto"
                                        onChange={seleccionProducto}
                                    >
                                        <option value="">Seleccione</option>
                                        {
                                            listaProductos.map((producto, index) => (
                                                <option
                                                    key={index}
                                                    value={[producto.id, producto.valorUnitario]}
                                                >{producto.descripcion}</option>
                                            ))
                                        }
                                    </select>

                                    <label className="col-form-label mt-4" htmlFor="inputDefault">ID Producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="ID Producto"
                                        id="idProducto"
                                        readOnly="readOnly"
                                        defaultValue={idProv}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputDefault">Valor Unitario</label>
                                    <input
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="form-control"
                                        placeholder="Valor unitario"
                                        id="valorUnitario"
                                        readOnly="readOnly"
                                        value={valorUnitario}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4 " htmlFor="inputDefault">Cantidad</label>
                                    <input
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="form-control"
                                        placeholder="Cantidad"
                                        id="cantidad"
                                        onChange={(event) => setCantidad(event.target.value)}
                                        value={cantidad}
                                    />
                                    <button
                                        className="btn btn-primary float-end"
                                        onClick={calcularValorTotal}
                                    >calcular</button>
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputDefault">Valor Total</label>
                                    <input
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="form-control"
                                        placeholder="Valor Total"
                                        id="valorTotal"
                                        readOnly="readOnly"
                                        value={`${valorTotal}`}
                                    />
                                </div>



                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputDefault">Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder=""
                                        id="fecha"
                                        onChange={(event) => setfecha(event.target.value)}
                                        value={fecha}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputDefault">Nombre Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="nombreCliente"
                                        onChange={(event) => setNombreCliente(event.target.value)}
                                        value={nombreCliente}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputDefault">ID Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="idCliente"
                                        onChange={(event) => setIdCliente(event.target.value)}
                                        value={idCliente}
                                    />
                                </div>

                                <div className="form-group mb-5">
                                    <label htmlFor="exampleSelect1" className="form-label mt-4">Encargado</label>
                                    <select
                                        className="form-select"
                                        id="vendedor"
                                        value={encargado}
                                        onChange={(e) => setEncargado(e.target.value)}>
                                        <option value="">Seleccione</option>
                                        {
                                            listEncargado.map((vendedor, index) => (
                                                <option
                                                    key={index}
                                                    value={vendedor.id}
                                                >{vendedor.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="container-fluid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={handleAgregarVenta}
                                    >Registrar Venta</button>

                                    <button
                                        type="reset"
                                        className="btn btn-warning"
                                        onClick={generarId}
                                    >Reset</button>
                                </div>

                            </fieldset>
                        </form>
                    </div>

                    <div className="tab-pane fade" id="tab2">
                        <form className="d-flex mt-2" id="searchForm">
                            <input className="form-control me-sm-2" type="text" placeholder="Search" id="searchValue" />
                            <div className="form-group">
                                <select className="form-select" id="searchOption">
                                    <option value="id">ID Venta</option>
                                    <option value="idCliente">ID Cliente</option>
                                    <option value="cliente">Nombre Cliente</option>
                                </select>
                            </div>
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                        </form>

                        <hr />
                        <div className="mt-5 h4">
                            Search Result
                        </div>
                        <hr />

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Encargado</th>
                                    <th scope="col">Valor Total</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Id Producto</th>
                                    <th scope="col">Cantidad</th>                                    
                                    <th scope="col">Id Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="searchByResult">
                                {
                                    listaVentas.map((venta, index) => (
                                        <tr key={venta.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{venta.encargado}</td>
                                            <td>{venta.valorTotal}</td>
                                            <td>{venta.fecha}</td>
                                            <td>{venta.idProduct}</td>
                                            <td>{venta.cantidad}</td>                                            
                                            <td>{venta.idCliente}</td>
                                            <td>{venta.clienteName}</td>
                                            <td>{venta.estado}</td>                                           
                                            <td>
                                                <Link className="btn btn-outline-primary btn-sm"
                                                    to={`/add-delete-ventas/${venta.id}`}>
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
                                    <th scope="col">Encargado</th>
                                    <th scope="col">Valor Total</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Id Producto</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Id Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody id="searchResult">
                            {
                                    listaVentas.map((venta, index) => (
                                        <tr key={venta.id}>
                                            <th scope="row">venta.id</th>
                                            <td>{venta.encargado}</td>
                                            <td>{venta.valorTotal}</td>
                                            <td>{venta.fecha}</td>
                                            <td>{venta.idProduct}</td>
                                            <td>{venta.cantidad}</td>  
                                            <td>{venta.valorUnitario}</td>                                          
                                            <td>{venta.idCliente}</td>
                                            <td>{venta.clienteName}</td>
                                            <td>{venta.estado}</td>                                                                         
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ventas
