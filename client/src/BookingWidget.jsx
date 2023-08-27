import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numOfGuest,setNumOfGuest] = useState(1)
    const [name, setName] =useState('')
    const [mobileNum, setMobileNum] =useState('')
    const [redirect, setRedirect] =useState('')
    const {user} = useContext(UserContext)

    useEffect(()=> {
        if(user) {
            setName(user.name)
        }
    },[user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }


    async function bookPlace () {
       
        const responce = await axios.post('bookings',{
            checkIn, checkOut, name, mobileNum, numOfGuest, price:numberOfNights*place.price, place:place._id
        });
        const bookingId = responce.data._id;
        setRedirect(`/account/bookings/${bookingId}`)

    };

   if (redirect) {
    return <Navigate to={redirect} />
   }

    return (
        <div className="bg-white shadow p-4 rounded-2xl text-center">
            Price: &#8377;{place.price}/ per night
            <div className="border rounded-2xl">
                <div className="flex border-b">
                    <div className=" py-2 px-4 text-left">
                        <label>CheckIn</label> <br />
                        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                    </div>
                    <div className="border-l py-2 px-4 text-left">
                        <label>CheckOut</label> <br />
                        <input type="date"  value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                    </div>
                </div>
                <div className="border-l py-2 px-4 text-left">
                    <label>Number of Guests</label>
                    <input type="number" value={numOfGuest} onChange={e => setNumOfGuest(e.target.value)} />
                </div>
                {numberOfNights>0 && (
                   <div className="border-l py-2 px-4 text-left">
                   <label>Your Full Name</label>
                   <input type="text" value={name} onChange={e => setName(e.target.value)} />
                   <label>Your mobile Number</label>
                   <input type="tel" value={mobileNum} onChange={e => setMobileNum(e.target.value)} />
               </div>
                )}
            </div>
            <button onClick={bookPlace} className="primary mt-2">
                Book It
                {numberOfNights>0 && (
                    <span> &#8377;{numberOfNights * place.price}</span>
                )}
                
            </button>
        </div>
    )
}