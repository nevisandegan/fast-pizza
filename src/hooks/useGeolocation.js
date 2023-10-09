import { useState } from "react";


export function useGeolocation(defaultPosition = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(defaultPosition)
    const [error, setError] = useState(false)

    function getPosition() {
        if (!navigator.geolocation)
            return setError('مرورگر شما لوکیشن را ساپورت نمیکند')

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log(position)
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
                console.log(position)
                setIsLoading(false)
            },
            (error) => {
                setError(error.message)
                setIsLoading(false)
            }
        )
      
    }
    return { isLoading, position, error, getPosition }
}