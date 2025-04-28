import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">✈️FlightAid</h1>

        <div className="flex gap-4 items-center">
          {!isAuthenticated && (
            <Link to="/" className="hover:underline">
              Home
            </Link>
          )}
          
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/new" className="hover:underline">
                Create Trip
              </Link>
              <button
                onClick={logout}
                className="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
