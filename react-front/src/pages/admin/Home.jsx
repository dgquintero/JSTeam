import mainImage from "../../media/shoe2.jpg"

const Home = () => {
    return (
        <>
            <div className="m-4 overflow-auto">
                <h1 className="mb-5">Bienvenido al Sistema de Informacion</h1>

                <div className="d-flex">
                    <div className="align-self-center p-3">
                        <p>Como administrador en la plataforma usted tiene acceso a los modulos administrador de productos, administrador de ventas y gestion de usuarios.</p>
                        <dl>
                            <dt className="fw-bold">Modulo Administrador de Productos</dt>
                            <dd className="p-2">Registro, busqueda y actualizacion de productos.</dd>
                            <dt className="fw-bold">Modulo de Administrador de Ventas</dt>
                            <dd className="p-2">Registro, busqueda y actualizacion de ventas</dd>
                            <dt className="fw-bold">Modulo de Gestion de Usuarios</dt>
                            <dd className="p-2">Actualizacion de rol y estado de usuarios registrados.</dd>
                        </dl>
                    </div>

                    <img src={mainImage} alt="shoe" className="w-50 rounded" />
                </div>

            </div>
        </>
    )
}

export default Home
