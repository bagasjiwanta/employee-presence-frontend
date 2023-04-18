import * as SecureStore from 'expo-secure-store';

export async function set(
    key,
    value
) {
    try {
        await SecureStore.setItemAsync(key, value);
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function get(key) {
    try {
        const result = await SecureStore.getItemAsync(key);
        return result ? result : '';
    } catch (err) {
        console.warn(err);
        return '';
    }
}

