import { useEffect, useState } from "react";
import AccountNav from "../AccNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns"
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState('')
    useEffect(() => {
        axios.get('/bookings').then(responce => {
            setBookings(responce.data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div className="flex flex-col gap-4">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden py-1">
                        <div className="w-40">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-4 pr-3 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            
                            <BookingDates booking={booking} />
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}