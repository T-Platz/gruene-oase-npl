import { useWindowDimensions } from "react-native";
import ROUTES from "../../Routes";
import { Link } from "react-router-dom";
import greenOasisLogoText from '../assets/images/GrüneOaseLogoText.png';
import greenOasisLogo from "../assets/images/GrüneOaseLogo.jpeg";
import { Typography } from "@mui/material";


// TODO: Make Mein Account say Login if not authenticated
const routes = [
    {
      name: 'Fragen & Antworten',
      href: ROUTES.FAQ,
    },
    {
      name: 'Mein Account',
      href: ROUTES.ACCOUNT,
    },
];

const GreenOasisLogo = () => {
    const { height, width } = useWindowDimensions();

    return (
        <Link to={ROUTES.GARDENS}>
            <img className="object-cover h-28" src={width >= 800 ? greenOasisLogoText : greenOasisLogo}>
            </img>
        </Link>
    )
}

const DesktopMenu = () => {
    return (
        <div className="flex flex-row items-center justify-end flex-auto mr-4 md:mx-4 sm:flex flex-nowrap md:space-x-8">
        {
            // Render elements of 'routes' array
            routes.map((element) => {
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
  
const MobileMenu = () => {
    /* Mobile menu is shown screen width < 640 */
    return (
        <div className="flex flex-col justify-between items-center py-4 sm:flex-row sm:space-y-0 sm:space-x-2 font-medium text-base text-gray text-center">
        {
            /* Render elements of 'routes' array */
            routes.map((element) => {
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
    
    return (
        <header className="flex flex-row justify-center w-full px-4 py-4 bg-white shadow sm:px-4 border-b border-goLight fixed z-50 h-36">
            {/* Wrapper for the navigation bar contents */}
            <nav className="flex flex-row items-center justify-between w-full max-w-7xl">

                {/* Grüne Oase Logo */}
                <GreenOasisLogo />

                {/* Standard Menu is only shown if screen width >= 640 */}
                {width >= 640 ? <DesktopMenu /> : <MobileMenu/>}
            </nav>
        </header>
    );
};

export default Topbar;