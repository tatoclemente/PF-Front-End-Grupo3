import logo from '../../Assets/logo-el-festin-nav.png'
import './loader.css'

function Loader() {
    return (
        <div className="loader5">
            <img src={logo} alt="logo" />
            <div className="loader-wrapper d-flex justify-content-center align-items-center">
                <div className="loader">
                    <div className="pacman">
                        <div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Loader