import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink"
import PlaceGalary from "../PlaceGalary"
import BookingDates from "../BookingDates"

export default function BookingPage () {
    const {id} = useParams()
    const [booking, setBooking] =useState(null)
    useEffect(() =>{
        if(id) {
            axios.get('/bookings').then(responce => {
               const foundBooking = responce.data.find(({_id}) => _id === id)
               if(foundBooking) {
                setBooking(foundBooking);
               }
            })
        }
    },[id])
    if(!booking) {
        return ''
    }
    return (
        <div className="my-8">
        <h1 className="text-3xl mr-36">{booking.place.title}</h1>
        <AddressLink className='mt-2 block'>{booking.place.address}</AddressLink>
        <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex justify-between">
            <div>
            <h2 className="text-xl">Your Booking Info</h2>
            <BookingDates booking={booking} />
            </div>
            <div className="mr-4 bg-primary p-4 text-white rounded-2xl text-center flex flex-col justify-center items-center">
                Total Price:   <br />
                <div className="text-2xl"> &#8377;{booking.price}</div>
                
            </div>
            
        </div>
        <PlaceGalary place={booking.place} />
        </div>
    )
}