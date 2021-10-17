
const VentasVendedor = () => {
    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Administrar Ventas</h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias odio sapiente incidunt
                    repudiandae non est omnis reiciendis tenetur nemo deleniti consectetur architecto, officia perferendis
                    maiores! Tempore dolorem, nam impedit exercitationem quia fuga blanditiis repudiandae? Dignissimos alias
                    consequuntur quod, eligendi praesentium enim, nostrum neque minus similique, veniam repellendus eos
                    veritatis.</p>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#tab1">Registrar Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab2">Buscar/Modificar Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3">Mostrar Ventas Registrados</a>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="tab1">
                        <form className="p-3" id="agregarVenta">
                            <fieldset>
                                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores iure ab dignissimos,
                                    nisi fugiat ad est recusandae ducimus optio. Vel facere labore sunt voluptatem beatae
                                    suscipit esse minus nisi quisquam?</div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">ID Venta</label>
                                    <input type="text" className="form-control" placeholder="ID Venta" id="idVenta" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Valor Total</label>
                                    <input inputmode="numeric" pattern="[0-9]*" className="form-control"
                                        placeholder="Valor Total" id="valorTotal" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">ID Producto</label>
                                    <input type="text" className="form-control" placeholder="ID Producto" id="idProducto" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Cantidad</label>
                                    <input inputmode="numeric" pattern="[0-9]*" className="form-control" placeholder="Cantidad"
                                        id="cantidad" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Valor Unitario</label>
                                    <input inputmode="numeric" pattern="[0-9]*" className="form-control"
                                        placeholder="Valor unitario" id="valorUnitario" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Fecha</label>
                                    <input type="date" className="form-control" placeholder="" id="fecha" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">Nombre Cliente</label>
                                    <input type="text" className="form-control" placeholder="Nombre" id="nombreCliente" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputDefault">ID Cliente</label>
                                    <input type="text" className="form-control" placeholder="Nombre" id="idCliente" />
                                </div>

                                <div className="form-group mb-5">
                                    <label for="exampleSelect1" className="form-label mt-4">Encargado</label>
                                    <select className="form-select" id="vendedor">
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
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <hr/>
                        <div className="mt-5 h4">
                            Search Result
                        </div>
                        <hr/>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default VentasVendedor
