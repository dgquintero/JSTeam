import mainImage from "../../media/shoe3.jpg"

const HomeVendedor = () => {
    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Bienvenido al Sistema de Informacion</h1>

                <div className="d-flex">
                    <div className="align-self-center p-3">
                        <p>Como vendedor en la plataforma usted solo tiene acceso al modulo administrador de ventas para registrar sus ventas realizadasy actualizar el estado de las mismas.</p>
                        <dl>
                            <dt className="fw-bold">Modulo de Administrador de Ventas</dt>
                            <dd className="p-2">Registro, busqueda y actualizacion de ventas</dd>
                        </dl>
                    </div>

                    <img src={mainImage} alt="shoe" className="w-50 rounded" />
                </div>
                
            </div>
        </>
    )
}

export default HomeVendedor
