import { useState, useRef } from "react"
import { prodRef } from "components/FirebaseInfo";
import { BsPencil, BsXCircle } from "react-icons/bs";

// Firebae Imports
import { getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";


const Productos = () => {

    const [listResults, setListResults] = useState()
    const [tabTitle, setTabTitle] = useState()
    const [headerRow, setHeaderRow] = useState()
    const [searchResult, setSearchResult] = useState()
    const [modifyForm, setModifyForm] = useState()

    const idRef = useRef();
    const nameRef = useRef();
    const desRef = useRef();
    const vuRef = useRef();
    const estadoRef = useRef();
    const searchRef = useRef();
    const searchOptionRef = useRef();

    const addProduct = async (e) => {
        e.preventDefault()
        // query ref
        const q = query(prodRef, where("id", "==", idRef.current.value))
        const qData = await getDocs(q);
        let prodExist = false;
        qData.forEach((doc) => {
            console.log(doc.id);
            prodExist = true;
        })

        if (!prodExist) {
            // New prod ref
            const newProdRef = doc(prodRef);
            setDoc(newProdRef, {
                id: idRef.current.value,
                name: nameRef.current.value,
                desc: desRef.current.value,
                valUni: vuRef.current.value,
                estado: estadoRef.current.value
            });
            // TO DO - show notification on sucess
            toast.success('Se Registro el Producto')
        } else {
            // TO DO - show notification on failure
            toast.error('Ya existe un producto relacionado con ese ID')
        }
    }

    const listAllProducts = async () => {

        setListResults();
        const q = query(prodRef);
        const qData = await getDocs(q);

        qData.forEach((doc) => {
            setListResults((listResults) => (
                <>
                    {listResults}
                    <tr>
                        <th>{doc.data().id}</th>
                        <td>{doc.data().name}</td>
                        <td>{doc.data().desc}</td>
                        <td>{doc.data().valUni}</td>
                        <td>{doc.data().estado}</td>
                    </tr>
                </>
            )
            )
        })
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchResult();
        setModifyForm();
        setTabTitle('Resultado de la busqueda');
        setHeaderRow(
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Valor Unitario</th>
                <th scope="col">Estado</th>
                <th scope="col">Action</th>
            </tr>)

        const q = query(prodRef, where(searchOptionRef.current.value, "==", searchRef.current.value))
        const qData = await getDocs(q);

        qData.forEach((doc) => {
            setSearchResult((searchResult) => (
                <>
                    {searchResult}
                    <td>{doc.data().id}</td>
                    <td>{doc.data().name}</td>
                    <td>{doc.data().desc}</td>
                    <td>{doc.data().estado}</td>
                    <td>{doc.data().valUni}</td>
                    <td>{doc.data().estado}</td>
                    <td>
                        {/* TO DO make pretty buttons*/}
                        <button className='btn btn-info btn-sm m-1' onClick={() => modifyProdForm(doc.id, doc.data())}><BsPencil />Modificar</button>
                        <button className='btn btn-warning btn-sm m-1' onClick={() => deleteProd(doc.id)}><BsXCircle />Eliminar</button>
                    </td>

                </>
            ))
        }
        )
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
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2">Buscar/Modificar Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3" onClick={() => { listAllProducts() }}>Mostrar Productos Registrados</a>
                    </li>
                </ul>

                <div id="myTabContent" className="tab-content">

                    <div className="tab-pane fade active show" id="tab1">

                        <form className="p-3" onSubmit={addProduct}>
                            <fieldset>
                                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores iure ab dignissimos,
                                    nisi fugiat ad est recusandae ducimus optio. Vel facere labore sunt voluptatem beatae
                                    suscipit esse minus nisi quisquam?</div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputId">ID</label>
                                    <input type="text" className="form-control" placeholder="" ref={idRef} required onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputName">Nombre Producto</label>
                                    <input type="text" className="form-control" placeholder="" ref={nameRef} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion" className="form-label mt-4">Descripcion</label>
                                    <textarea className="form-control" ref={desRef} rows="3" required></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="valorUnitario">Valor Unitario</label>
                                    <input className="form-control" placeholder="Valor unitario" ref={vuRef} required onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                </div>

                                <div className="form-group mb-5">
                                    <label for="estado" className="form-label mt-4">Estado del Producto</label>
                                    <select className="form-select" ref={estadoRef}>
                                        <option value="Disponible">Disponible</option>
                                        <option value="No Disponible">No Disponible</option>
                                    </select>
                                </div>

                                <div className="container-flex">
                                    <button type="submit" className="btn btn-primary">Agregar</button>
                                    <button type="reset" className="btn btn-warning">Reset</button>
                                </div>
                            </fieldset>
                        </form>

                    </div>

                    <div className="tab-pane fade" id="tab2">

                        <form className="d-flex mt-2" onClick={handleSearch}>
                            <input className="form-control me-sm-2" placeholder="Id o descripcion del producto" ref={searchRef} />
                            <div className="form-group">
                                <select className="form-select" ref={searchOptionRef}>
                                    <option value='id'>ID Producto</option>
                                    <option value='desc'>Descripcion Producto</option>
                                </select>
                            </div>
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>

                        <hr />
                        <div className="mt-5 h4">{tabTitle}</div>
                        <hr />

                        <table className="table table-hover">
                            <thead>
                                {headerRow}
                            </thead>
                            <tbody id="searchByResult">
                                {searchResult}
                            </tbody>
                        </table>
                        {modifyForm}
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
                            <tbody id='searchResult'>
                                {listResults}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Productos
