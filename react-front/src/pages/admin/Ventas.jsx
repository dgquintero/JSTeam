import { useState, useRef, useEffect } from "react"
import { saleRef } from "components/FirebaseInfo";
import { BsPencil, BsXCircle } from "react-icons/bs";
// Firebae Imports
import { getDocs, query, where, setDoc, doc } from "firebase/firestore";

const Ventas = () => {

    const [listResults, setListResults] = useState([])
    const [tabTitle, setTabTitle] = useState()

    const idVentRef = useRef();
    const encargadoRef = useRef();
    const valorTRef = useRef();
    const fechRef = useRef();
    const idProdRef = useRef();
    const cantRef = useRef();
    const valUniRef = useRef();
    const idClienRef = useRef();
    const nombClienRef = useRef();
    // const estadoRef = useRef();
    const actionRef = useRef();
    // const searchOptionRef = useRef();

    const agregarVenta = async (e) => {
        e.preventDefault()
        // query ref
        const q = query(saleRef, where("idVent", "==", idVentRef.current.value))
        const qData = await getDocs(q);
        let ventExist = false;
        qData.forEach((doc) => {
            console.log(doc.idVent);
            ventExist = true;
        })

        if (!ventExist) {
            // New prod ref
            const newVentRef = doc(saleRef);
            setDoc(newVentRef, {
                id: idVentRef.current.value,
                encargado: encargadoRef.current.value,
                valorTo: valorTRef.current.value,
                fech: fechRef.current.value,
                idProduc: idProdRef.current.value,
                cantid: cantRef.current.value,
                valorUn: valUniRef.current.value,
                idClien: idClienRef.current.value,
                nombreClien: nombClienRef.current.value,
                // estado: estadoRef.current.value,
                // action: actionRef.current.value,
        
            });
            // TO DO - show notification on sucess
            alert('works')
        } else {
            // TO DO - show notification on failure
            alert('nope')
        }
    }

    const listAllVent = async () => {
        const q = query(saleRef);
        const qData = await getDocs(q);
        setListResults(qData.docs.map((doc) => doc.data()))
    }
    // aqui
    useEffect(() => {
        listAllVent()
    }, [])
    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Ventas</h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores!</p>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1">Registrar Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2">Buscar/Modificar Ventas</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3">Mostrar Ventas Registrados</a>
                    </li> */}
                </ul>

                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="tab1">
                        <form className="p-3" onSubmit={agregarVenta}>
                            <fieldset>
                                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores iure ab dignissimos,
                                    nisi fugiat ad est recusandae ducimus optio. Vel facere labore sunt voluptatem beatae
                                    suscipit esse minus nisi quisquam?</div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">ID Venta</label>
                                    <input type="text" className="form-control" placeholder="" ref={idVentRef} required onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Valor Total</label>
                                    <input inputmode="numeric" pattern="[0-9]*" className="form-control"
                                        placeholder="" ref={valorTRef} />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">ID Producto</label>
                                    <input type="text" className="form-control" placeholder="" ref={idProdRef} />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Cantidad</label>
                                    <input inputmode="numeric" pattern="[0-9]*" className="form-control" placeholder=""
                                        ref={cantRef} />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Valor Unitario</label>
                                    <input inputmode="numeric" pattern="[0-9]*" className="form-control"
                                        placeholder="" ref={valUniRef} />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Fecha</label>
                                    <input type="date" className="form-control" placeholder="" ref={fechRef}/>
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Nombre Cliente</label>
                                    <input type="text" className="form-control" placeholder=""  ref={nombClienRef}/>
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">ID Cliente</label>
                                    <input type="text" className="form-control" placeholder="Nombre" ref={idClienRef} />
                                </div>

                                <div className="form-group mb-5">
                                    <label for="exampleSelect1" className="form-label mt-4">Encargado</label>
                                    <select className="form-select" ref={encargadoRef}>
                                        <option value="vendedor1">Vendedor 1</option>
                                        <option value="vendedor2">Vendedor 2</option>
                                        <option value="vendedor3">Vendedor 3</option>
                                        <option value="vendedor4">Vendedor 4</option>
                                    </select>
                                </div>
                                <div className="container-fluid">
                                    <button type="submit" className="btn btn-primary">Registrar Venta</button>
                                    <button type="reset" className="btn btn-warning">Reset</button>
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
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>

                        <hr />
                        <div className="mt-5 h4">
                            {tabTitle}
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
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Id Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="searchByResult">
                                {listResults.map((vent) => <tr>
                                    <td>{vent.id}</td>
                                    <td>{vent.encargado}</td>
                                    <td>{vent.valorTo}</td>
                                    <td>{vent.fech}</td>
                                    <td>{vent.idProduc}</td>
                                    <td>{vent.cantid}</td>
                                    <td>{vent.valorUn}</td>
                                    <td>{vent.idClien}</td>
                                    <td>{vent.nombreClien}</td>
                                    <td>{vent.estado}</td>
                                    <td> 
                                        <button className='btn btn-secondary btn-sm m-1' onClick={() => console.log("Modificar producto")}><BsPencil />Modificar</button>
                                        <button className='btn btn-secondary btn-sm m-1' onClick={() => console.log("eliminar producto")}><BsXCircle />Eliminar</button></td>
                                    <td>
                                        
                                    </td>
                                </tr>)}


                            </tbody>
                        </table>

                    </div>

                    {/* <div className="tab-pane fade" id="tab3">
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
                            </tbody>
                        </table>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Ventas
