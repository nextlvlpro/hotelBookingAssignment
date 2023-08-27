import { useState } from "react"

export default function PlaceGalary({place}) {

    const [showAllPhotos, setShowAllPhotos] = useState(false)
    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white overflow-y-scroll">
                <button onClick={() => setShowAllPhotos(false)} className="fixed flex gap-1 p-2 rounded-2xl bg-black text-white right-[10vw] top-[5vh] items-center justify-center shadow-black-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Close
                </button>
                <div className="p-8 flex gap-4 flex-col justify-center items-center">
                    <h2 className="text-2xl">Photos of {place.title}</h2>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <img className="w-full lg:w-[60vw] lg:h-[80vh] object-cover" src={'http://localhost:4000/uploads/' + photo} alt="" />
                        </div>
                    ))}
                </div>

            </div>
        )

    }

    return (
        <div className="relative flex flex-col items-center justify-center mt-4">
                <div className="grid gap-2 lg:grid-cols-[2fr_1fr] lg:w-[70vw] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover w-full h-full" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
                            </div>

                        )}
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/" + place.photos[2]} alt="" />
                            )}
                        </div>

                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex flex-no-wrap gap-1 juistify-center items-center absolute bottom-2 md:left-[65vw] py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Show More
                </button>
            </div>
    )
}