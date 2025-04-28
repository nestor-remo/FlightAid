import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ isAuthenticated, logout }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
