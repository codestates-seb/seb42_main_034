import { useEffect, useState } from "react";

interface locationType {
    loaded: boolean,
    coordinates?: {
        latitude: number;
        longitude: number
    };
    error?: {
        code: number;
        message: string
    };
}

const useGeolocation = () => {
    const [location, setLocation] = useState<locationType>({
        loaded: false,
        coordinates: {
            latitude: 0,
            longitude: 0,
        }
    })

    //성공 했을시
    const onSuccess = (location: { coords: {latitude: number; longitude: number;}; }) => {
        setLocation({
            loaded: true,
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
        })
    }

    //실패 시
    const onError = (error: {code: number; message: string;}) => {
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(() => {
        if(!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "위치 정보를 불러올수 없습니다."
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])
    return location

}

export default useGeolocation