import { useRef, useState } from "react"
import { userRef, db } from './../../components/FirebaseInfo';
import { BsPencil, BsXCircle, BsPersonLinesFill, BsPeopleFill } from "react-icons/bs";
import { toast } from "react-toastify";

// Firebase Imports
import { query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";


const Usuarios = () => {

    const searchRef = useRef()
    let estado = '';
    let rol = '';

    const clearForm = () => {
        setTabTitle();
        setModifyForm();
    }

    const modifyUser = async (id) => {
        const updateRef = doc(db, 'usuarios', id)
        await updateDoc(updateRef, {
            estado: estado,
            rol: rol
        })
        // TO DO better notification
        toast.success("Se ha modificado la informacion del usuario")
        setTabTitle()
        setModifyForm()
    }

    const modifyUserForm = (userId, userData) => {

        setTabTitle("Modificar Usuario");
        setHeaderRow();
        setSearchResult();
        setModifyForm(
            <form className="px-3">
                <div className="d-flex flex-row justify-content-around">
                    <div className='form-group'>
                        <label className="col-form-label mt-4">Email</label>
                        <input type="text" className="form-control" placeholder={userData.email} readOnly />
                    </div>

                    <div className='form-group'>
                        <label className="col-form-label mt-4">Nombre</label>
                        <input type="text" className="form-control" placeholder={userData.nombre} readOnly />
                    </div>

                    <div className='form-group'>
                        <label className="col-form-label mt-4">Estado</label>
                        <select className="form-select" onChange={(e) => setEstado(e.target.value)} required>
                            <option value=''></option>
                            <option value='Pendiente'>Pendiente</option>
                            <option value="No Autorizado">No Autorizado</option>
                            <option value="Autorizado">Autorizado</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label className="col-form-label mt-4" >Rol</label>
                        <select className="form-select" onChange={(e) => setRol(e.target.value)} required>
                            <option value=''></option>
                            <option value='Administrador'>Administrador</option>
                            <option value="Vendedor">Vendedor</option>
                            <option value="No Asignado">No Asignado</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-5">
                    <button type="button" className="btn btn-success" onClick={() => { modifyUser(userId) }}>Modificar</button>
                    <button type="button" className="btn btn-warning" onClick={() => { clearForm() }}>Cancelar</button>
                </div>

            </form>
        )
    }

    const setEstado = (value) => {
        estado = value;
    }

    const setRol = (value) => {
        rol = value;
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchResult();
        setModifyForm();
        setTabTitle('Resultado de la busqueda');
        setHeaderRow(<tr>
            <th scope="col">Email</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Rol</th>
            <th scope="col">Action</th>
        </tr>)

        // TO DO Show a notification when there are no results from a query
        const q = query(userRef, where("email", "==", searchRef.current.value));
        const qData = await getDocs(q);

        qData.forEach((doc) => {
            setSearchResult((searchResult) => (
                // I dont know why it works but it works
                <>
                    {searchResult}
                    <tr>
                        {/* this id might not be necessary anymore */}
                        <td className='d-none'>{doc.id}</td>
                        <td>{doc.data().email}</td>
                        <td>{doc.data().nombre}</td>
                        <td>{doc.data().estado}</td>
                        <td>{doc.data().rol}</td>
                        <td>
                            {/* TO DO make pretty buttons*/}
                            <button className='btn btn-info m-1' onClick={() => modifyUserForm(doc.id, doc.data())}><BsPencil />  Modificar</button>
                            <button className='btn btn-warning m-1' onClick={() => deleteUsr(doc.id)}><BsXCircle />  Eliminar</button>
                        </td>
                    </tr>
                </>

            )

            );
        })

        // Clear search bar
        e.target.reset();

    }

    const deleteUsr = async (id) => {
        const deleteRef = doc(db, 'usuarios', id)
        await deleteDoc(deleteRef);
        // Reset results
        toast.success('Se ha eliminado el usuario')
        setSearchResult();
    }

    const listAllUsers = async () => {

        setListResults();
        const q = query(userRef);
        const qData = await getDocs(q);

        qData.forEach((doc) => {
            setListResults((listResults) => (
                <>
                    {listResults}
                    <tr>
                        <td>{doc.data().email}</td>
                        <td>{doc.data().nombre}</td>
                        <td>{doc.data().estado}</td>
                        <td>{doc.data().rol}</td>
                    </tr>
                </>
            )
            )
        })
    }

    // Using component state because I cant figure out some other way to do it
    const [searchResult, setSearchResult] = useState()
    const [modifyForm, setModifyForm] = useState()
    const [tabTitle, setTabTitle] = useState()
    const [headerRow, setHeaderRow] = useState()
    const [listResults, setListResults] = useState()

    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Usuarios</h1>
                <p>Revise los usuarios registrador y defina o actualice su rol en la plataforma.</p>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1"><BsPeopleFill size='1.5em' style={{ verticalAlign: 'top' }} />  Buscar/Modificar Usuarios</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2" onClick={() => { listAllUsers() }}><BsPersonLinesFill size='1.5em' style={{ verticalAlign: 'top' }} />  Mostrar Usuarios Registrados</a>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="tab1">
                        <form className="d-flex mt-2" id="searchForm" onSubmit={handleSearch}>
                            <input className="form-control me-sm-2" type="text" placeholder="Search Email Address" id="searchValue" ref={searchRef} />
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>
                        <hr />
                        <div div className="mt-5 h4" >{tabTitle}</div>
                        <hr />
                        <table className="table table-hover">
                            <thead>
                                {headerRow}
                            </thead>
                            <tbody id="resultRef">
                                {searchResult}
                                {/* result goes here i think */}
                            </tbody>
                        </table>
                        {modifyForm}
                        {/* test */}
                    </div>
                    <div className="tab-pane fade" id="tab2">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Rol</th>
                                </tr>
                            </thead>
                            <tbody id="searchResult">
                                {listResults}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuarios
