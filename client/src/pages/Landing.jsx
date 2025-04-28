import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-blue-50 text-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-6">Welcome to FlightAid</h1>
      
      <p className="text-lg md:text-2xl text-gray-700 mb-8">
        Plan your next adventure effortlessly. Organize trips, discover activities, and personalize your journey all in one place.
      </p>

      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg">
            Get Started
          </button>
        </Link>

        <Link to="/dashboard">
          <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 text-lg">
            View My Trips
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
