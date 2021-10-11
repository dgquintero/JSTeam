import React from 'react'
import shoes from '../Images/shoes.svg'

export const SideBar = (props) => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light bg-secondary">
            <a href="www.google.com" 
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >                
                <img src={shoes} class="bi me-2" width="40" height="32" alt=""/>
                <span class="fs-4">Company</span>
            </a>
            <hr />

            <nav class="nav nav-pills flex-column mb-auto">
                <li>
                    <a href="main.html" class="nav-link" aria-current="page">
                     
                        Home
                    </a>
                </li>
                <li>
                    <a href="productos.html" class="nav-link link-dark active">
                       
                        Productos
                    </a>
                </li>
                <li>
                    <a href="ventas.html" class="nav-link link-dark">
                      
                        Ventas
                    </a>
                </li>
                <li>
                    <a href="usuarios.html" class="nav-link link-dark">
                    
                        Usuarios
                    </a>
                </li>

            </nav>
            <hr/>
            <div class="dropdown">
                <a href="www.google.com" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="img/pp.jpg" alt="" width="32" height="32" class="rounded-circle me-2"/>
                    <strong>Username</strong>
                    <span class="fst-italic">(Role)</span>
                </a>
                <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a class="dropdown-item" href="www.google.com">Profile</a></li>
                    <li><a class="dropdown-item" href="www.google.com">Settings</a></li>
                    <li>
                        <hr class="dropdown-divider"/>
                    </li>
                    <li><a class="dropdown-item" href="www.google.com">Sign out</a></li>
                </ul>
            </div>


        </div>

        
    )
}
