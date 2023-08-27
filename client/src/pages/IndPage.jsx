import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function indPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(responce => {
      setPlaces(responce.data)
    })
  }, [])
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id}>
          <div className="flex bg-gray-500 rounded-2xl mb-2">
            {place.photos?.[0] && (
              <img className="rounded-2xl aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos?.[0]} alt="" />
            )}
          </div>
          <h3 className="font-bold">{place.address}</h3>
          <h2 className="text-sm">{place.title}</h2>
          <div className="mt-1">
            <span className="font-bold">&#8377;{place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}


