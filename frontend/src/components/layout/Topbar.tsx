import { useWindowDimensions } from "react-native";
import ROUTES from "../../Routes";
import { Link, useNavigate } from "react-router-dom";
import greenOasisLogoText from '../assets/images/GrüneOaseLogoText.png';
import greenOasisLogo from "../assets/images/GrüneOaseLogo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box } from "@mui/material";
import { setUser } from "../../redux/userSlice";
import api from "../../utils/ApiService";


const GreenOasisLogo = () => {
    const { height, width } = useWindowDimensions();

    return (
        <Link to={ROUTES.GARDENS}>
            <img className="object-cover h-28" src={width >= 800 ? greenOasisLogoText : greenOasisLogo}>
            </img>
        </Link>
    )
}

const DesktopMenu: React.FC<{ routes: any[]; logout: ()=>void}> = ({routes, logout}) => {
    return (
        <div className="flex flex-row items-center justify-end flex-auto mr-4 md:mx-4 sm:flex flex-nowrap md:space-x-8">
        {
            // Render elements of 'routes' array
            routes.map((element, index) => {
                if(index === 1 && element.name === "Logout") {
                    return (
                        <div
                            className='cursor-pointer transition box-border px-4 py-2 rounded-md
                            font-medium text-base text-gray text-center 
                            hover:text-grayDark hover:bg-goWhite hover:ring-1 hover:ring-goLight
                            focus:text-grayDark focus:bg-goWhite focus:outline-none focus:ring-4 focus:ring-goDark focus:ring-opacity-60'
                            onClick={() => {logout();}}
                            key={element.name}
                        >
                            {element.name}
                        </div>
                    );
                }
                return (
                    <Link
                        to={element.href}
                        key={element.name}
                        className='cursor-pointer transition box-border px-4 py-2 rounded-md
                            font-medium text-base text-gray text-center 
                            hover:text-grayDark hover:bg-goWhite hover:ring-1 hover:ring-goLight
                            focus:text-grayDark focus:bg-goWhite focus:outline-none focus:ring-4 focus:ring-goDark focus:ring-opacity-60'>
                        {element.name}
                    </Link>
                );
            })
        }
        </div>
    );
};
  
const MobileMenu: React.FC<{ routes: any[]; logout: ()=>void }> = ({routes, logout}) => {
    /* Mobile menu is shown screen width < 640 */
    return (
        <div className="flex flex-col justify-between items-center py-4 sm:flex-row sm:space-y-0 sm:space-x-2 font-medium text-base text-gray text-center">
        {
            /* Render elements of 'routes' array */
            routes.map((element, index) => {
            if(index === 1 && element.name === "Logout") {
                return (
                    <div
                        className="w-full py-2 cursor-pointer"
                        onClick={() => {logout();}}
                        key={element.name}
                    >
                        {element.name}
                    </div>
                );
            }
            return (
                <Link
                    className="w-full py-2"
                    to={element.href}
                    key={element.name}
                >
                    {element.name}
                </Link>
            );
            })
        }
        </div>
    );
};


function Topbar () {
    /* Get current width of screen */
    const { height, width } = useWindowDimensions();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const routes = [
        {
          name: 'Fragen & Antworten',
          href: ROUTES.FAQ,
        },
        {
          name: user.token === "" ? 'Login' : 'Logout',
          href: ROUTES.LANDING,
        },
    ];

    const logout = async () => {
        try {
            const response = await api.post('auth/logout', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(e) {
        }
        dispatch(setUser({ token: "" }));
        navigate(ROUTES.LANDING);
    }

    
    return (
        <header className="flex flex-row justify-center w-full px-4 py-4 bg-white shadow sm:px-4 border-b border-goLight fixed z-50 h-36">
            {/* Wrapper for the navigation bar contents */}
            <nav className="flex flex-row items-center justify-between w-full max-w-7xl">

                {/* Grüne Oase Logo */}
                <GreenOasisLogo />

                {/* Standard Menu is only shown if screen width >= 640 */}
                {width >= 640 ? <DesktopMenu logout={logout} routes={routes}/> : <MobileMenu logout={logout} routes={routes}/>}
            </nav>
        </header>
    );
};

export default Topbar;