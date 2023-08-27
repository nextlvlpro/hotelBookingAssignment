import axios from "axios";
import { useState } from "react";

export default function PhotoUploader({ addedPhotos, onChange }) {

    const [photoLink, setPhotoLink] = useState('');

    async function addphotoByLink(e) {

        e.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        onChange(prev => {
            return [...prev, filename]
        });

        setPhotoLink('')
    }

    function uploadPhoto(ev) {
        const files = ev.target.files
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }

        axios.post('/upload', data, {
            headers: { 'Content-type': "multipart/form-data" }
        }).then(responce => {
            const { data: filenames } = responce;
            onChange(prev => {
                return [...prev, ...filenames]
            });
        })
    }
    function removePhoto(ev,filename) {
        ev.preventDefault()
        onChange([...addedPhotos.filter(photo => photo !== filename)])
    }
    function selectAsMainPhoto(ev,filename) {
        ev.preventDefault()
        onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text" placeholder="Add photos using link" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
                <button onClick={addphotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
            </div>

            <div className="gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="relative h-32 flex" key={link}>
                        <img className='rounded-2xl gap-2 w-full object-cover ' src={"http://localhost:4000/uploads/" + link} alt="" />
                        <button onClick={ev => removePhoto(ev, link)} className="cursor-pointer absolute bottom-1 right-2 text-white bg-gray-500 bg-opacity-0.5  p-1 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <button onClick={ev => selectAsMainPhoto(ev,link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-0.5 p-1 rounded-xl">
                            {link ===addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
                              </svg>
                            )}
                             {link !==addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                            </svg>
                             )}
                            
                        </button>
                    </div>
                ))}
                <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-black-500">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Device Upload
                </label>
            </div></>
    )
}