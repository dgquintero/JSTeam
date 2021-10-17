
const Productos = () => {

    

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
                        <a className="nav-link" data-bs-toggle="tab" href="#tab3">Mostrar Productos Registrados</a>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="tab1">
                        <form className="p-3" id="agregarProducto">
                            <fieldset>
                                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores iure ab dignissimos,
                                    nisi fugiat ad est recusandae ducimus optio. Vel facere labore sunt voluptatem beatae
                                    suscipit esse minus nisi quisquam?</div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputID">ID</label>
                                    <input type="text" className="form-control" placeholder="" id="inputId" />
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="inputName">Nombre Producto</label>
                                    <input type="text" className="form-control" placeholder="" id="inputName" />
                                </div>

                                <div className="form-group">
                                    <label for="descripcion" className="form-label mt-4">Descripcion</label>
                                    <textarea className="form-control" id="descripcion" rows="3"></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="valorUnitario">Valor Unitario</label>
                                    <input inputmode="numeric" pattern="[0-9]*" className="form-control"
                                        placeholder="Valor unitario" id="valorUnitario" />
                                </div>

                                <div className="form-group mb-5">
                                    <label for="estado" className="form-label mt-4">Estado del Producto</label>
                                    <select className="form-select" id="estado">
                                        <option value="1">Disponible</option>
                                        <option value="0">No Disponible</option>
                                    </select>
                                </div>
                                <div className="container-flex">
                                    <button type="submit" className="btn btn-primary">Agregar</button>
                                    <button type="reset" className="btn btn-warning">Reset</button>

                                    {/* <!--TODO ADD NOTIFICATION --> */}

                                </div>


                            </fieldset>
                        </form>
                    </div>

                    <div className="tab-pane fade" id="tab2">
                        <form className="d-flex mt-2" id="searchForm">
                            <input className="form-control me-sm-2" type="text" placeholder="Search" id="searchValue" />
                            <div className="form-group">
                                <select className="form-select" id="searchOption">
                                    <option value='id'>ID Producto</option>
                                    <option value='descripcion'>Descripcion Producto</option>
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
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Valor Unitario</th>
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
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Valor Unitario</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody id = 'searchResult'>

                                <tr>
                                    <th scope="row">Default</th>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>                     
        </>
    )
}

export default Productos
