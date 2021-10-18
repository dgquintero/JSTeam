import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { actualizarDocumentoDatabase, busquedaDatabase, consultarDatabase, consultarDocumentoDatabase, eliminarDocumentoDatabase } from '../config/firebase';
import Swal from 'sweetalert2'

export const AddDeleteVentas = () => {

    const { id } = useParams()


    const [valorTotal, setValorTotal] = useState(0)
    const [cantidad, setCantidad] = useState(0)
    const [fecha, setfecha] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [idCliente, setIdCliente] = useState('')
    const [listEncargado, setListEncargado] = useState([])
    const [encargado, setEncargado] = useState('')
    const [producto, setProducto] = useState('')
    



    const [listaProductos, setListaProductos] = useState([])
    const [idProv, setIdProv] = useState('')
    const [estado, setEstado] = useState('')
    const [valorUnitario, setValorUnitario] = useState(0)
    const history = useHistory()

    const consultarVenta = async (idVenta) => {

        const listaProductosTemporal = await consultarDatabase('lista-productos')
        const ventaTemp = await consultarDocumentoDatabase('lista-ventas', idVenta)
        const listaTemporalEncargados = await busquedaDatabase('listaUsuarios', 'rol', 2)
        

        setListEncargado(listaTemporalEncargados)
        setListaProductos(listaProductosTemporal)
        setProducto(`${ventaTemp.idProduct},${ventaTemp.valorUnitario}`)               
        setfecha(ventaTemp.fecha)
        setCantidad(ventaTemp.cantidad)
        setNombreCliente(ventaTemp.clienteName)
        setIdCliente(ventaTemp.idCliente)
        setEncargado(ventaTemp.encargado)
        setIdProv(ventaTemp.idProduct)
        setEstado(ventaTemp.estado)
        setValorUnitario(ventaTemp.valorUnitario)
    }

    useEffect(() => {

        consultarVenta(id)

        setListEncargado([])
        setListaProductos([])
        setValorTotal(0)
        setfecha('')
        setNombreCliente('')
        setIdCliente('')
        setEncargado('')
        setIdProv('')
        setEstado('')



    }, [id])


    const seleccionProducto = (e) => {
        const valoresProductoActual = e.target.value.split(",")       
        setProducto(e.target.value)
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

    const handleActualizarVenta = async(e) => {
        e.preventDefault()

        const venta = {
            cantidad,
            clienteName: nombreCliente,
            encargado,
            fecha,
            idCliente,
            idProduct: idProv,
            idVenta: id,
            valorTotal,
            estado,
            valorUnitario
        }
        // console.log(producto);

        await actualizarDocumentoDatabase('lista-ventas', id, venta)

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La venta se modificó con éxito',
            showConfirmButton: false,
            timer: 1500
          })

        history.push('/ventas')

    }

    const handleEliminarVenta = async(e) => {
        e.preventDefault()

       

        Swal.fire({
            title: 'Esta usted seguro?',
            text: "No podrá revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarDocumentoDatabase('lista-ventas', id)
                history.push('/ventas')
              Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado con exito',
                'success'
              )
            }
          })
    }


    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Ventas</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores!</p>


                <form className="p-3" id="agregarVenta">
                    <fieldset>
                        <div>Espacio para registrar ventas </div>

                        <div className="form-group">
                            <label className="col-form-label mt-4" htmlFor="inputDefault">ID Venta</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ID Venta"
                                id="idVenta"
                                readOnly="readOnly"
                                defaultValue={id}
                            />
                        </div>

                        <div className="form-group">

                            <label htmlFor="ProductoSelect" className="form-label mt-4">Producto</label>

                            <select
                                className="form-select"
                                id="producto"
                                value={producto}
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

                        <div className="form-group mb-5">
                            <label htmlFor="exampleSelect1" className="form-label mt-4">Estado</label>
                            <select
                                className="form-select"
                                id="vendedor"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}>
                                <option value="">Seleccione</option>
                                <option value="En proceso">En proceso</option>
                                <option value="Cancelada">Cancelada</option>
                                <option value="Entregada">Entregada</option>
                                
                            </select>
                        </div>

                        <div className="container-fluid">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleActualizarVenta}
                            >Modificar Venta</button>

                            <button
                                type="reset"
                                className="btn btn-warning"
                                onClick={handleEliminarVenta}
                            >Eliminar</button>
                        </div>

                    </fieldset>
                </form>



            </div>

        </>
    )
}
