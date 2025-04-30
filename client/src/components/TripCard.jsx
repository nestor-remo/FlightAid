import React from 'react';
import { Link } from 'react-router-dom';

const TripCard = ({ id, title, destination, imgUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-3">{title}</h2>
      <p className="text-gray-600">Destination: {destination}</p>
      <Link
        to={`/trip/${id}`}
        className="inline-block mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default TripCard;
