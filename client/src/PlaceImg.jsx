export default function PlaceImg ({place,index,className=null}) {
    if (!place.photos?.length) {
        return ''
    }
    if (!className) {
        className = 'w-full object-cover rounded-2xl'
    }
    return (
            <img className={className} src={'http://localhost:4000/uploads/'+place.photos[0]} alt="placePhotos" />
    )

}