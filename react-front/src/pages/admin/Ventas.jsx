import { useRef, useState, useEffect } from "react";
import { prodRef, userRef, saleRef, db } from "components/FirebaseInfo";
import { BsPencil, BsXCircle, BsFillCartPlusFill, BsFillCartCheckFill, BsClipboardData } from "react-icons/bs";
import { toast } from "react-toastify";

// Firebase Imports
import { getDocs, query, where, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";


const Ventas = () => {

    const prodSearchId = useRef();
    const quantRef = useRef();
    const saleIdRef = useRef();
    const sellerRef = useRef();
    const clientIdRef = useRef();
    const clientNameRef = useRef();
    const saleDateRef = useRef();
    const searchField = useRef();
    const searchValue = useRef();

    const [saleProductsTable, setSaleProductsTable] = useState();
    const [prodName, setProdName] = useState();
    const [prodUnitPrice, setProdUnitPrice] = useState();
    const [prodId, setProdId] = useState();
    const [total, setTotal] = useState(0);
    const [saleProds, setSaleProds] = useState([]);
    const [sellerList, setSellerList] = useState();
    const [listSales, setListSales] = useState();

    const [tabTitle, setTabTitle] = useState()
    const [searchResult, setSearchResult] = useState()
    const [modifyForm, setModifyForm] = useState()
    const [headerRow, setHeaderRow] = useState();

    // TO DO Fix this maybe
    let estado = '';
    const setEstado = (value) => {
        estado = value;
    }

    const findProduct = async (id) => {
        if (id.current.value) {
            const q = query(prodRef, where("id", "==", id.current.value))
            const qData = await getDocs(q);
            let res = false;
            qData.forEach((doc) => {
                res = true;
                setProdId(id.current.value);
                setProdName(doc.data().name);
                setProdUnitPrice(doc.data().valUni);
            })
            if (!res) {
                setProdId();
                setProdName();
                setProdUnitPrice();
                toast.error('No hay productos vinculados a ese ID', { position: "bottom-center" })
            }
        } else {
            toast.warning('Ingrese un ID antes de realizar una busqueda', { position: "bottom-center" })
        }

    }

    const addProdSale = () => {
        if (!quantRef.current.value || !prodName || !prodUnitPrice || !prodId) { // Checking if components states are valid
            toast.error('Realice una nueva busqueda o ingrese una cantidad', { position: "bottom-center" })
        } else {
            toast.success("Producto agregado a la venta", { position: "bottom-center" })
            setSaleProductsTable((saleProductsTable) => (
                <>
                    {saleProductsTable}
                    <tr className="table-success" >
                        <td>{prodId}</td>
                        <td>{prodName}</td>
                        <td>${prodUnitPrice}</td>
                        <td>{quantRef.current.value}</td>
                        <td>$ {prodUnitPrice * quantRef.current.value}</td>
                    </tr>
                </>
            )
            )
            setSaleProds(saleProds => [...saleProds,
            {
                id: prodId,
                prod: prodName,
                valUni: prodUnitPrice,
                cant: quantRef.current.value,
                total: prodUnitPrice * quantRef.current.value
            }
            ])
            setTotal(total + (prodUnitPrice * quantRef.current.value))
        }
    }

    const resetStates = () => {
        setSaleProductsTable();
        setProdName();
        setProdUnitPrice();
        setProdId();
        setTotal(0);
        setSaleProds([]);
    }

    const addSale = async (e) => {
        e.preventDefault();
        //Check if ID exist
        const q = query(saleRef, where("id", "==", saleIdRef.current.value));
        const qData = await getDocs(q);
        let saleExists = false;
        qData.forEach((doc) => {
            console.log(doc.id);
            saleExists = true;
        })

        if (!saleExists) {
            console.log(saleExists);
            // New ref
            const newSaleRef = doc(saleRef);
            // Set new sale
            setDoc(newSaleRef, {
                id: saleIdRef.current.value,
                vendedor: sellerRef.current.value,
                idCliente: clientIdRef.current.value,
                nombreCliente: clientNameRef.current.value,
                fechaVenta: saleDateRef.current.value,
                prodVenta: saleProds,
                total: total,
                estado: 'En Proceso'
            })
            // TO DO Add real notification
            toast.success("Venta Registrada", { position: "bottom-center" })
            resetStates();
            e.target.reset();
        } else {
            toast.error("Ya existe una venta registrada con ese ID", { position: "bottom-center" })
        }
    }

    const listAllSales = async () => {
        setListSales();
        const q = query(saleRef);
        const qData = await getDocs(q);
        qData.forEach((doc) => {
            setListSales((listSales) => (
                <>
                    {listSales}
                    <tr>
                        <td>{doc.data().id}</td>
                        <td>{doc.data().vendedor}</td>
                        <td>{doc.data().idCliente}</td>
                        <td>{doc.data().nombreCliente}</td>
                        <td>
                            <button className="dropdown-toggle btn btn-outline-info" data-bs-toggle="dropdown">Ver Productos</button>
                            <table className="dropdown-menu">
                                <thead>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                </thead>
                                <tbody>
                                    {/* I dont know why map works and forEach doesnt */}
                                    {doc.data().prodVenta.map((p) => (
                                        <tr>
                                            <th scope="row">{p.id}</th>
                                            <td>{p.prod}</td>
                                            <td>${p.valUni}</td>
                                            <td>{p.cant}</td>
                                            <td>${p.total}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </td>
                        <td>{doc.data().fechaVenta}</td>
                        <td>{doc.data().estado}</td>
                        <td>${doc.data().total}</td>
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
                <th scope="col">ID Venta</th>
                <th scope="col">Encargado</th>
                <th scope="col">Id Cliente</th>
                <th scope="col">Nombre Cliente</th>
                <th scope="col">Productos</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col">Valor Total</th>
                <th scope="col">Acción</th>
            </tr>
        )

        const q = query(saleRef, where(searchField.current.value, "==", searchValue.current.value))
        const qData = await getDocs(q);

        qData.forEach((doc) => {
            setSearchResult((searchResult) => (
                <>
                    {searchResult}
                    <tr>
                        <td>{doc.data().id}</td>
                        <td>{doc.data().vendedor}</td>
                        <td>{doc.data().idCliente}</td>
                        <td>{doc.data().nombreCliente}</td>
                        <td>
                            <button className="dropdown-toggle btn btn-outline-info" data-bs-toggle="dropdown">Ver Productos</button>
                            <table className="dropdown-menu">
                                <thead>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                </thead>
                                <tbody>
                                    {/* I dont know why map works and forEach doesnt */}
                                    {doc.data().prodVenta.map((p) => (
                                        <tr>
                                            <th scope="row">{p.id}</th>
                                            <td>{p.prod}</td>
                                            <td>${p.valUni}</td>
                                            <td>{p.cant}</td>
                                            <td>${p.total}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </td>
                        <td>{doc.data().fechaVenta}</td>
                        <td>{doc.data().estado}</td>
                        <td>${doc.data().total}</td>
                        <td>
                            {/* TO DO make pretty buttons*/}
                            <button className='btn btn-info btn-sm m-1' onClick={() => modifySaleForm(doc.id, doc.data())}><BsPencil />Modificar</button>
                            <button className='btn btn-warning btn-sm m-1' onClick={() => deleteSale(doc.id)}><BsXCircle />Eliminar</button>
                        </td>
                    </tr>
                </>
            ))

        })

    }

    const deleteSale = async (id) => {
        const deleteRef = doc(db, 'ventas', id)
        await deleteDoc(deleteRef);
        toast.info("Se elimino la venta", { position: "bottom-center" })
        setSearchResult();
    }

    const modifySaleForm = (saleId, saleData) => {
        setTabTitle('Modificar Venta');
        setHeaderRow();
        setSearchResult();
        setModifyForm(
            <form>
                <div className="w-75">
                    <div className='d-flex justify-content-between'>
                        <div className="form-group">
                            <label className="col-form-label">ID Venta</label>
                            <input placeholder={saleData.id} disabled type="text" className="form-control input-venta" onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Encargado</label>
                            <select className="form-select select-venta" disabled>
                                <option>{saleData.vendedor}</option>
                            </select>
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Estado de la Venta</label>
                            <select className="form-select select-venta" onChange={(e) => setEstado(e.target.value)}>
                                <option value="En Proceso">En Proceso</option>
                                <option value="Cancelada">Cancelada</option>
                                <option value="Entregada">Entregada</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="form-group">
                            <label className="col-form-label mt-4">ID Cliente</label>
                            <input disabled type="text" className="form-control input-venta" placeholder={saleData.idCliente} onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label mt-4">Nombre del Cliente</label>
                            <input disabled type="text" className="form-control input-venta" placeholder={saleData.nombreCliente} onKeyPress={(e) => { !/^[a-zA-Z ]+$/.test(e.key) && e.preventDefault() }} />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label mt-4">Fecha</label>
                            <input disabled type="text" className="form-control input-venta" placeholder={saleData.fechaVenta} />
                        </div>
                    </div>
                </div>

                <div className="d-flex">
                    <table className="table table-hover mt-3">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Valor Unitario</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleData.prodVenta.map((p) => (
                                <tr>
                                    <th scope="row">{p.id}</th>
                                    <td>{p.prod}</td>
                                    <td>${p.valUni}</td>
                                    <td>{p.cant}</td>
                                    <td>${p.total}</td>
                                </tr>
                            ))
                            }
                            <tr>
                                <td colSpan="4"></td>
                                <td className="table-active">$ {saleData.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-success" onClick={() => { modifySale(saleId) }}>Modificar</button>
                    <button type="button" className="btn btn-warning" onClick={() => { clearForm() }}>Cancelar</button>
                </div>

            </form >
        )

    }

    const modifySale = async (id) => {
        const updateRef = doc(db, 'ventas', id)
        await updateDoc(updateRef, {
            estado: estado
        })
        toast.success("Se actualizo el estado de la venta", { position: "bottom-center" })
    }

    const clearForm = () => {
        setTabTitle();
        setModifyForm();
    }

    useEffect(() => {
        (async () => {
            setSellerList();
            const q = query(userRef, where("rol", "==", "Vendedor"), where("estado", "==", "Autorizado"));
            const qData = await getDocs(q);
            qData.forEach((doc) => {
                setSellerList((sellerList) => (
                    <>
                        {sellerList}
                        <option value={doc.data().nombre}>{doc.data().nombre}</option>
                    </>
                )
                )
            })
        })()
    }, [])

    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Ventas</h1>

                <p>Registre nuevas ventas realizadas y actualice el estado de una venta en particular.</p>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1"><BsFillCartPlusFill size='1.5em' style={{ verticalAlign: 'top' }}/> Registrar Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2"><BsFillCartCheckFill size='1.5em' style={{ verticalAlign: 'top' }}/>  Buscar/Modificar Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3" onClick={() => { listAllSales() }}><BsClipboardData size='1.5em' style={{ verticalAlign: 'top' }}/>  Mostrar Ventas Registrados</a>
                    </li>
                </ul>

                <div className="tab-content">

                    <div className="tab-pane fade active show" id="tab1">
                        <form className="p-3" onSubmit={addSale}>
                            <fieldset>
                                <div className="w-75">
                                    <div>Registre una nueva venta en el sistema. La lista de encargados tiene todos los vendedores autorizados en el momento. Para agregar productos a la venta primero debera buscarlos por su ID e indicar la cantidad comprada en la venta.</div>

                                    <div className='d-flex justify-content-between'>

                                        <div className="form-group">
                                            <label className="col-form-label mt-4">ID Venta</label>
                                            <input ref={saleIdRef} required type="text" className="form-control input-venta" placeholder="ID Venta" onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                        </div>

                                        <div className="form-group">
                                            <label className="col-form-label mt-4">Encargado</label>
                                            <select className="form-select select-venta" required ref={sellerRef}>
                                                <option value="">Seleccione el encargado de la venta</option>
                                                {sellerList}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <div className="form-group">
                                            <label className="col-form-label mt-4">ID Cliente</label>
                                            <input ref={clientIdRef} required type="text" className="form-control input-venta" placeholder="" onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4">Nombre del Cliente</label>
                                            <input ref={clientNameRef} required type="text" className="form-control input-venta" placeholder="" onKeyPress={(e) => { !/^[a-zA-Z ]+$/.test(e.key) && e.preventDefault() }} />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4">Fecha</label>
                                            <input ref={saleDateRef} required type="date" className="form-control input-venta" />
                                        </div>
                                    </div>
                                </div>

                                <label className="col-form-label mt-4">ID Producto</label>
                                <div className="d-flex">
                                    <div className="form-group flex-grow-1">
                                        <input type="text" className="form-control" placeholder="ID Producto" ref={prodSearchId} onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                    </div>
                                    <button type="button" className="btn btn-success my-2 my-sm-0" onClick={() => { findProduct(prodSearchId) }}>Buscar</button>
                                </div>

                                <div className='container d-flex justify-content-between'>

                                    <div className="form-group">
                                        <label className="col-form-label mt-4">Nombre Producto</label>
                                        <input type="text" className="form-control" placeholder={prodName} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label className="col-form-label mt-4">Valor Unitario</label>
                                        <input className="form-control" placeholder={prodUnitPrice} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label className="col-form-label mt-4">Cantidad</label>
                                        <input ref={quantRef} onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} className="form-control" placeholder="Cantidad" id="cantidad" />
                                    </div>
                                    <button type="button" className="btn btn-info align-self-end" onClick={() => { addProdSale() }}>Agregar Producto</button>

                                </div>

                                <div className="d-flex">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Producto</th>
                                                <th scope="col">Valor Unitario</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {saleProductsTable}
                                            <tr>
                                                <td colSpan="4"></td>
                                                <td className="table-active">$ {total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">Registrar Venta</button>
                                    <button type="reset" className="btn btn-warning" onClick={() => { resetStates() }}>Reset</button>
                                </div>

                            </fieldset>
                        </form>

                    </div>

                    <div className="tab-pane fade" id="tab2">
                        <form className="d-flex mt-2" onSubmit={handleSearch}>
                        <input ref={searchValue} className="form-control me-sm-2" type="text" placeholder="Search" />
                            <div className="form-group">
                                <select className="form-select" ref={searchField}>
                                    <option value="id">ID Venta</option>
                                    <option value="idCliente">ID Cliente</option>
                                    <option value="nombreCliente">Nombre Cliente</option>
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
                                {/* results */}
                            </tbody>
                        </table>
                        {modifyForm}
                        {/* modify form */}
                    </div>

                    <div className="tab-pane fade" id="tab3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID Venta</th>
                                    <th scope="col">Encargado</th>
                                    <th scope="col">Id Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Productos</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody id="searchResult">
                                {listSales}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Ventas
