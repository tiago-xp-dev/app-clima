import { locationServices } from "../services/locationServices";
import { useToast } from "react-native-toast-notifications";

export default function useLocationServices() {
    const toast = useToast();

    async function requestPermission(createToast = false) {
        result = await locationServices.requestPermission()        

        if(!result.canAskAgain && createToast){
            toast.show("Permissão de localização negada.")
        }

        return result.granted
    }

    async function getCurrentLocation(createToast = false) {        
        result = await locationServices.getCurrentLocation()

        if (result.status) {
            return result.locationData
        }

        if(requestPermission(createToast)){
            result = await locationServices.getCurrentLocation()            
        }
        return result.locationData
    }

    return { requestPermission, getCurrentLocation }
}