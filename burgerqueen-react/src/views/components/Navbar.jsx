import { Link } from "react-router-dom";
import './Navbar.css'
import { useNavigate } from "react-router-dom"

const Navbar = ({ref0, name0, icon0, ref1, name1, icon1}) => {
    let navigate = useNavigate();
    
    // cerrar sesión
    function logout(){
        localStorage.clear();
        return navigate('/');
    }

    return (
        <nav className="configuration">
            <div>
                <i className= {icon0} ></i>
                <Link to={ref0} className='btn btn-dark'>{name0}</Link>
            </div>
            <div>
                <i className= {icon1}></i>
                <Link to={ref1} className='btn btn-dark'>{name1}</Link>
            </div>
            <div>
                <i onClick={logout} className="fa-solid fa-power-off"></i>
            </div>
        </nav>
    )
};

export default Navbar;