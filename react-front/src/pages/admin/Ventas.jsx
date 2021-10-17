import { useRef, useState, useEffect } from "react";
import { prodRef, userRef, saleRef } from "components/FirebaseInfo";

// Firebase Imports
import { getDocs, query, where, setDoc, doc } from "firebase/firestore";


const Ventas = () => {

    const prodSearchId = useRef();
    const quantRef = useRef();
    const saleIdRef = useRef();
    const sellerRef = useRef();
    const clientIdRef = useRef();
    const clientNameRef = useRef();
    const saleDateRef = useRef();

    const [saleProductsTable, setSaleProductsTable] = useState();
    const [prodName, setProdName] = useState();
    const [prodUnitPrice, setProdUnitPrice] = useState();
    const [prodId, setProdId] = useState();
    const [total, setTotal] = useState(0);
    const [saleProds, setSaleProds] = useState([]);
    const [sellerList, setSellerList] = useState();
    const [listSales, setListSales] = useState()

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
                alert('invalid id')
            }
        } else {
            alert('no search id')
        }

    }

    const addProdSale = () => {
        if (!quantRef.current.value || !prodName || !prodUnitPrice || !prodId) { // Checking if components states are valid
            // TO DO Add a real notifiacion
            alert('nope')
        } else {
            alert("pog")
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
            alert("YUP")
            resetStates();
            e.target.reset();
        } else {
            console.log(saleExists);
            // TO DO Real notification
            alert("NOPE")
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
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3" onClick={() => { listAllSales() }}>Mostrar Ventas Registrados</a>
                    </li>
                </ul>

                <div className="tab-content">

                    <div className="tab-pane fade active show" id="tab1">
                        <form className="p-3" onSubmit={addSale}>
                            <fieldset>
                                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores iure ab dignissimos,
                                    nisi fugiat ad est recusandae ducimus optio. Vel facere labore sunt voluptatem beatae
                                    suscipit esse minus nisi quisquam?</div>

                                <div className='d-flex justify-content-between'>

                                    <div className="form-group">
                                        <label className="col-form-label">ID Venta</label>
                                        <input ref={saleIdRef} required type="text" className="form-control" placeholder="ID Venta" onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label className="form-label">Encargado</label>
                                        <select className="form-select" required ref={sellerRef}>
                                            <option value="">Seleccione el encargado de la venta</option>
                                            {sellerList}
                                        </select>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-around">
                                    <div className="form-group">
                                        <label className="col-form-label mt-4">ID Cliente</label>
                                        <input ref={clientIdRef} required type="text" className="form-control" placeholder="" onKeyPress={(e) => { !/[0-9]/.test(e.key) && e.preventDefault() }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label mt-4">Nombre del Cliente</label>
                                        <input ref={clientNameRef} required type="text" className="form-control" placeholder="" onKeyPress={(e) => { !/^[a-zA-Z ]+$/.test(e.key) && e.preventDefault() }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label mt-4">Fecha</label>
                                        <input ref={saleDateRef} required type="date" className="form-control" />
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
                                    <button className="btn btn-info" type="button" onClick={() => { console.log(saleProds); console.log(prodName); }}>TEST!!!</button>
                                </div>

                            </fieldset>
                        </form>

                    </div>

                    <div className="tab-pane fade" id="tab2">
                        <form className="d-flex mt-2">
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
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Id Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="searchByResult">


                            </tbody>
                        </table>

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
