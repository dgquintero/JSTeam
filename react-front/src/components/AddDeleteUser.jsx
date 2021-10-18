import { actualizarDocumentoDatabase } from 'config/firebase'
import { eliminarDocumentoDatabase } from 'config/firebase'
import { consultarDocumentoDatabase } from 'config/firebase'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import Swal from 'sweetalert2'

export const AddDeleteUser = () => {

const {id} = useParams()

const [email, setEmail] = useState('')
const [nombre, setNombre] = useState('')
const [rol, setRol] = useState('')
const history = useHistory()

const cargarUsuario = async (idUsuario)=> {

    const userTemp = await consultarDocumentoDatabase('listaUsuarios', idUsuario)
        setEmail(userTemp.email)
        setNombre(userTemp.name)
        setRol(userTemp.rol)
       
}

useEffect(() => {
    cargarUsuario(id)
},[id])


const handleActualizarUser = async(e) =>{

    e.preventDefault()

    const usuario = {
        email,
        name: nombre,
        rol         
    }   

    await actualizarDocumentoDatabase('listaUsuarios', id, usuario)

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El usuario se modificó con éxito',
        showConfirmButton: false,
        timer: 1500
      })

    history.push('/usuarios')


}

const handleEliminarUser = (e) =>{

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
                eliminarDocumentoDatabase('listaUsuarios', id)
                history.push('/usuarios')
              Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado con exito',
                'success'
              )
            }
          })


}
    return (
        <div>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Modificar Usuarios</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores!</p>

                <div className="tab-pane fade active show" id="tab1">
                    <form className="p-3" id="modUsuario">
                        <fieldset>
                            <div>Espacio modificación de los usuarios</div>

                           

                            <div className="form-group">
                                <label className="col-form-label mt-4" htmlFor="inputID">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="" 
                                    id="inputEmail"                                    
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="col-form-label mt-4" htmlFor="inputID">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="" 
                                    id="inputName"                                    
                                    value={nombre}
                                    onChange={(e)=> setNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-5">
                                <label htmlFor="estado" className="form-label mt-4">Rol</label>
                                <select
                                    className="form-select"
                                    id="estado"
                                    value = {rol}
                                    onChange={(e) => setRol(e.target.value)}
                                >
                                    <option value={1}>Admin</option>
                                    <option value={2}>Vendedor</option>
                                    <option value={3}>Usuario</option>
                                </select>
                            </div>


                          
                            <div className="container-flex">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleActualizarUser}
                                >Modificar</button>

                                <button
                                    type="reset"
                                    className="btn btn-warning"
                                    onClick={handleEliminarUser}
                                >Eliminar</button>

                                {/* <!--TODO ADD NOTIFICATION --> */}

                            </div>


                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    )
}
