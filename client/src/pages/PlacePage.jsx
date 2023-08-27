import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget"
import PlaceGalary from "../PlaceGalary"
import AddressLink from "../AddressLink"

export default function PlacePage() {
    const [place, setPlace] = useState(null)
    const { id } = useParams()
    
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/places/' + id).then(responce => {
            setPlace(responce.data)
        })
    }, [id])

    if (!place) {
        return ("")
    }

   

    return (
        <div className="mt-4 pt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl mr-36">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGalary place= {place} />

            <div className="flex flex-col items-center justify-center mt-4">
                <div>
                    <h2 className="text-xl font-semibold">Description</h2>
                    {place.description}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center w-full mt-4">
                    <div className="text-left w-[50%] ">
                        CheckIn: {place.checkIn} <br />
                        CheckOut: {place.checkOut} <br />
                        Max Number of Guests: {place.maxGuests}
                    </div>

                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>
                <div className="w-[100%]">
                    <h2 className="text-xl font-semibold text-left">Extra Info</h2>
                    <div className="text-sm text-gray-1100 m-4 text-left">
                    {place.extraInfo}
                </div>
                </div>
                
            </div>

        </div>
    )
}