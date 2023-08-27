import PhotoUploader from "../PhotosUploader"
import Perks from '../Perks'
import { useEffect, useState } from "react"
import AccountNav from "../AccNav"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"

export default function PlacesFormPage () {
    const {id} =useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState([])
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState('')
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        if(!id ) {
            return
        }
            axios.get('/places/'+id).then(responce =>{
                const {data} = responce
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhotos(data.photos)
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
                setPrice(data.price)
            });
    },[id]) 

    function inputHeader(text) {
        return (
            <h2 className="text-xl mt-4">{text}</h2>
        )
    }
    function inputDes(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDes(description)}
            </div>
        )
    }

    async function savePlace (e) {
        e.preventDefault();

        const placeData = {title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price}
        if (id) {
            await axios.put('/places', {
                id, ...placeData
            });


        } else {
            await axios.post('/places', placeData);
        }
        
        setRedirect(true) 
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
                    <form onSubmit={savePlace}>
                        {preInput('Title', 'Title for your place, it should be attractive')}
                        <input value={title} onChange={ev => setTitle(ev.target.value)} type="text" placeholder="Title, for example my lovely house"  />

                        {preInput('Address', 'Address to your Place')}
                        <input value={address} onChange={ev => setAddress(ev.target.value)} type="text" placeholder="address"  />

                        {preInput('Photos', 'More Photos, Better chance at booking')}

                        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                        {preInput('Description', 'Description about your place, Better chance at booking')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                        {preInput('perks', 'More Perks, Better chance at booking')}
                        <div className="grid gap-2 mt-2 grid-cols-2 md:grid cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra Info', 'Rules that need to be followed at your place')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                        {preInput('Check In & Check Out time, Max Guests', 'add the info about time window and guest capacity')}

                        <div className="grid gap-2 grid-cols-2 md:grid-cols-2 ">
                            <div>
                                <h3 className="mt-2 -mb-2">Check In time</h3>
                                <input type="text" 
                                value={checkIn} 
                                onChange={ev => setCheckIn(ev.target.value)} 
                                placeholder="12:00" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-2">Check Out time</h3>
                                <input type="text" 
                                value={checkOut} 
                                onChange={ev => setCheckOut(ev.target.value)} 
                                placeholder="16:00" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-2">Max Guest</h3>
                                <input type="number" 
                                value={maxGuests} 
                                onChange={ev => setMaxGuests(ev.target.value)} 
                                placeholder="5" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-2">Price Per Night</h3>
                                <input type="text" 
                                value={price} 
                                onChange={ev => setPrice(ev.target.value)} 
                                placeholder="16:00" />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
    )
}