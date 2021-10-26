import Navbar from "./Navbar"
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./Footer'))

const Layout = ({ children }) => {
    return ( 
        <>
            <Navbar />
             { children }
            <DynamicFooter />
        </>
     );
}
 
export default Layout;