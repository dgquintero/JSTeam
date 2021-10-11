import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import db from '../firebase/firebaseConfig'

export const ModuloProductos = () => {


    /*  const [producto, setProducto] = React.useState(''); */
    // const [id, setId] = React.useState('');
    const [nombreProducto, setNombreProducto] = React.useState('');
    const [descripcion, setDescripcion] = React.useState('');
    const [valorUnitario, setValorUnitario] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [listaProductos, setListaProductos] = React.useState([]);
    const [editar, setEditar] = React.useState(false);
    const [id, setId] = React.useState('');

    useEffect(() => {
        const obtenerDatos = async () => {
            const datos = await getDocs(collection(db, 'productos'));
            let envioDatos = [];
            datos.forEach((documento) => {
                envioDatos.push(documento.data())
            })
            setListaProductos(envioDatos)
        }
        obtenerDatos()
    }, [])

    const capuraDatos = (e) => {
        e.preventDefault()

        setNombreProducto(e.target.id === 'inputName' ? e.target.value : nombreProducto)
        setDescripcion(e.target.id === 'descripcion' ? e.target.value : descripcion)
        setValorUnitario(e.target.id === 'valorUnitario' ? e.target.value : valorUnitario)
        setEstado(e.target.id === 'estado' ? e.target.value : estado)   
          

    }

    const handleFormulario = (e) => {
        e.preventDefault()
        setId(nanoid())  
        sendData(); 

        // Prueba del nano id
        // console.log('ID: ',nanoid(10));

        if (!nombreProducto.trim()) {
            console.log('Debes ingresar un nombre');
            return
        }

        if (!descripcion.trim()) {
            console.log('Debes ingresar una descripcion');
            return
        }

        if (!valorUnitario.trim()) {
            console.log('Debes ingresar un valor');
            return
        }

        if (!estado.trim()) {
            console.log('Debes ingresar estado');
            return
        }

       
        setListaProductos([
            ...listaProductos,
            {
                id,
                // tarea: 'valor de la veriable'
                // tarea: tarea
                nombreProducto,
                descripcion,
                valorUnitario,
                estado
            }
        ])

              
        

        setNombreProducto('')
        setDescripcion('')
        setValorUnitario('')
        setEstado('Seleccione')   
        setId('')  

    }

    const sendData = async()=>{        
      await setDoc(doc(db,"productos",id),
       {
        id: id,
        nombreProducto: nombreProducto,
        descripcion: descripcion,
        valorUnitario: valorUnitario,
        estado: estado
      })
    }

    const deleteData = async(id)=>{        
        await deleteDoc(doc(db, "productos", id));
    }

    const handleEliminar = (id) => {

        deleteData(id)
        
        const arregloTemporal = listaProductos.filter((elemento) => {
            return elemento.id !== id //me devuelve la lista sin el elemento
        })
        setListaProductos(arregloTemporal)
    }

    const handleEditar = (product) => {
        setEditar(!editar)
        setNombreProducto(product.nombreProducto)
        setDescripcion(product.descripcion)
        setValorUnitario(product.valorUnitario)
        setEstado(product.estado)
        setId(product.id)
    }

    const handleGuardarEditar = (e) => {
        e.preventDefault()

        sendData()

        const arregloTemporal = listaProductos.map((item) => {
            return item.id === id ? {
                id: id,
                nombreProducto: nombreProducto,
                descripcion: descripcion,
                valorUnitario: valorUnitario,
                estado: estado
            } : item
        })

        setListaProductos(arregloTemporal)

        setEditar(!editar)
        setNombreProducto('')
        setDescripcion('')
        setValorUnitario('')
        setEstado('Seleccione')
    }



    return (
        <div className="container mt-4">

            <h1 className="text-center">Administrar Productos</h1>

            <hr />
            <div className="row">
                <div className="col-12 col-lg-8" >

                    <form className="d-flex mt-2 mb-2" id="searchForm">
                        <input className="form-control me-sm-2" type="text" placeholder="Search" id="searchValue" />
                        <div className="form-group">
                            <select className="form-select" id="searchOption">
                                <option value='id'>ID Producto</option>
                                <option value='descripcion'>Descripcion Producto</option>
                            </select>
                        </div>
                        <button className="btn btn-success mx-2 my-2 my-sm-0" type="submit">Search</button>
                    </form>

                    <h4 className="text-center">Lista Productos</h4>
                    <table className="table table-hover">
                        <tr>
                            <th> ID </th>
                            <th> NOMBRE </th>
                            <th> VALOR </th>
                            <th> DESCRIPCION </th>
                            <th> ESTADO </th>
                            <th> MOD/DEL </th>
                        </tr>
                        {
                            listaProductos.map((product) =>
                                <tr key={product.id}>
                                    <td> {product.id} </td>
                                    <td> {product.nombreProducto} </td>
                                    <td> {product.descripcion} </td>
                                    <td> {product.valorUnitario} </td>
                                    <td> {product.estado} </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger btn-sm float-end mx-1"
                                            onClick={() => handleEliminar(product.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="btn btn-outline-warning btn-sm float-end mx-1"
                                            onClick={() => handleEditar(product)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                                                <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )

                        }
                    </table>


                </div>
                <div className="col-12 col-lg-4">
                    <h4 className="text-center">
                        {
                            editar ? 'Editar productos' : 'añadir productos'
                        }
                    </h4>
                    <form className="p-3"
                        onChange={capuraDatos}
                        onSubmit={editar ? handleGuardarEditar : handleFormulario}>
                        {/* <input type="text" className="form-control mb-2" placeholder="ID" id="inputId" /> */}
                        <input type="text"
                            className="form-control"
                            placeholder="Nombre Producto"
                            id="inputName"
                            value={nombreProducto} />
                        <label className="form-label mt-4">Descripcion</label>
                        <textarea className="form-control mb-2"
                            id="descripcion"
                            rows="3"
                            value={descripcion}
                        />
                        <input pattern="[0-9]*"
                            className="form-control"
                            placeholder="Valor unitario"
                            id="valorUnitario"
                            value={valorUnitario}
                        />
                        <label className="form-label mt-4">Estado del Producto</label>
                        <select className="form-select mb-4"
                            id="estado"
                            value={estado}
                        >
                            <option selected>Seleccione</option>
                            <option value="1">Disponible</option>
                            <option value="0">No Disponible</option>
                        </select>
                        <div className="container-flex">
                            <button type="submit" className="btn btn-primary mx-2">
                                {
                                    editar ? 'Editar' : 'Agregar'
                                }
                            </button>
                            <button type="reset" className="btn btn-warning">Reset</button>
                        </div>

                    </form>
                </div>



            </div>
        </div>

    )
}
