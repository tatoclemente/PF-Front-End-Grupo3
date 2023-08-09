import React from 'react'
import logo from '../../Assets/logo-el-festin-nav.png'
import './loader.css'

function Loader() {
    return (
        <div class="loader5">
            <img src={logo} alt="logo" />
            <div class="loader-wrapper d-flex justify-content-center align-items-center">
                <div class="loader">
                    <div class="pacman">
                        <div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Loader