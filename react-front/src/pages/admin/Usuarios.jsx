import { useRef, useState } from "react"
import { userRef } from './../../components/FirebaseInfo';
import { BsPencil, BsXCircle } from "react-icons/bs";

// Firebase Imports
import { query, where, setDoc, getDocs, doc } from "firebase/firestore";


const Usuarios = () => {

    const searchRef = useRef()

    const handleSearch = async (e) => {
        e.preventDefault();

        // TO DO Show a notification when there are no results from a query
        const q = query(userRef, where("email", "==", searchRef.current.value));
        const qData = await getDocs(q);
        setSearchResult();

        qData.forEach((doc) => {
            if (doc.id) {
                setSearchResult(<>
                    {searchResult}
                    <tr>
                        <td>{doc.data().email}</td>
                        <td>{doc.data().nombre}</td>
                        <td>{doc.data().estado}</td>
                        <td>{doc.data().rol}</td>
                        <td>
                            {/* TO DO make pretty buttons*/}
                            <button className='btn btn-info btn-sm m-1'><BsPencil />Modificar</button>
                            <button className='btn btn-warning btn-sm m-1'><BsXCircle />Eliminar</button>
                        </td>
                    </tr>
                </>);

                console.log(doc.data());
            }
        })

        // Clear search bar
        e.target.reset();

    }
    // Search Header - TO DO
    // const searchHeader = <></>

    // Using component state because I cant figure out some other way to do it
    const [searchResult, setSearchResult] = useState()


    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Usuarios</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores!</p>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1">Buscar/Modificar Usuarios</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2">Mostrar Usuarios Registrados</a>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="tab1">
                        <form className="d-flex mt-2" id="searchForm" onSubmit={handleSearch}>
                            <input className="form-control me-sm-2" type="text" placeholder="Search Email Address" id="searchValue" ref={searchRef} />
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <hr />
                        <div div className="mt-5 h4" >Search Result</div><hr />

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="resultRef">
                                {searchResult}
                                {/* result goes here i think */}
                            </tbody>
                        </table>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuarios
