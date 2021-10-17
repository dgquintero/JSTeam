import React from 'react'

export const AddDeleteProduct = () => {
    return (
        <>
        <div className="m-4 overflow-auto">
                <h1 className="mb-5">Modificar producto</h1>               
              
                
                    
                        <form className="p-3" id="agregarProducto">
                            <fieldset>
                                <div>Espacio modificación de los productos</div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="inputID">ID</label>
                                    <input type="text" className="form-control" placeholder="" id="inputId" readOnly="readOnly" />
                                </div>                               

                                <div className="form-group">
                                    <label htmlFor="descripcion" className="form-label mt-4">Descripcion</label>
                                    <textarea className="form-control" id="descripcion" rows="3"></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label mt-4" htmlFor="valorUnitario">Valor Unitario</label>
                                    <input inputMode="numeric" pattern="[0-9]*" className="form-control"
                                        placeholder="Valor unitario" id="valorUnitario" />
                                </div>

                                <div className="form-group mb-5">
                                    <label htmlFor="estado" className="form-label mt-4">Estado del Producto</label>
                                    <select className="form-select" id="estado">
                                        <option value="1">Disponible</option>
                                        <option value="0">No Disponible</option>
                                    </select>
                                </div>
                                <div className="container-flex">
                                    <button type="submit" className="btn btn-primary">Modificar</button>
                                    <button type="reset" className="btn btn-warning">Eliminar</button>

                                    {/* <!--TODO ADD NOTIFICATION --> */}

                                </div>


                            </fieldset>
                        </form>
                   
                
            </div> 
            
        </>
    )
}
