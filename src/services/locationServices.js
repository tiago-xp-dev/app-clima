import * as Location from 'expo-location';

async function requestPermission() {
    return await Location.requestForegroundPermissionsAsync();
}

async function getCurrentLocation() {
    let result = null;
    let isPermissionGranted = (await Location.getForegroundPermissionsAsync()).granted;

    if (isPermissionGranted) {
        result = { status: isPermissionGranted, locationData: await Location.getCurrentPositionAsync() };
    } else {
        result = { status: isPermissionGranted, locationData: null };
    }

    return result
}

export const locationServices = { requestPermission, getCurrentLocation }