import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { actualizarDocumentoDatabase, consultarDocumentoDatabase, eliminarDocumentoDatabase} from '../config/firebase';
import Swal from 'sweetalert2'

export const AddDeleteProduct = () => {


    const { id } = useParams()
    

    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('1')
    const [valorUnitario, setValorUnitario] = useState('')    
    const history = useHistory()

    const consultarProducto = async (idProducto) => {
        
        const productoTemp = await consultarDocumentoDatabase('lista-productos', idProducto)
        setDescripcion(productoTemp.descripcion)
        setEstado(productoTemp.estado)
        setValorUnitario(productoTemp.valorUnitario)
       
    }

    useEffect(() => {

        consultarProducto(id)


        setDescripcion('')
        setEstado('')
        setValorUnitario('')


    }, [id])


    const handleActualizarProducto = async (e) => {
        e.preventDefault()

        const producto = {
            descripcion,
            estado,
            valorUnitario
        }
        // console.log(producto);

        await actualizarDocumentoDatabase('lista-productos', id, producto)

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto se modificó con éxito',
            showConfirmButton: false,
            timer: 1500
          })

        history.push('/productos')


    }


    const handleEliminarProducto = async(e) =>{
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
                eliminarDocumentoDatabase('lista-productos', id)
                history.push('/productos')
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
                <h1 className="mb-5">Modificar producto</h1>



                <form className="p-3" id="agregarProducto">
                    <fieldset>
                        <div>Espacio modificación de los productos</div>

                        <div className="form-group">
                            <label className="col-form-label mt-4" htmlFor="inputID">ID</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="" id="inputId"
                                readOnly="readOnly"
                                value={id}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descripcion" className="form-label mt-4">Descripcion</label>
                            <textarea
                                className="form-control"
                                id="descripcion"
                                rows="3"
                                defaultValue = {descripcion} 
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
                                defaultValue={valorUnitario}
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
                                <option value={1}>Disponible</option>
                                <option value={0}>No Disponible</option>
                            </select>
                        </div>
                        <div className="container-flex">
                            
                            <button type="submit" className="btn btn-primary" onClick={handleActualizarProducto}>Modificar</button>
                            <button type="reset" className="btn btn-warning" onClick={handleEliminarProducto}>Eliminar</button>

                            {/* <!--TODO ADD NOTIFICATION --> */}

                        </div>


                    </fieldset>
                </form>


            </div>

        </>
    )
}
