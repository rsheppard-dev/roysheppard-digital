import dynamic from 'next/dynamic'
import Navbar from './Navbar'

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