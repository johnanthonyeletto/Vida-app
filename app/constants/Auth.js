import { AsyncStorage } from 'react-native';

export default Auth = {
    async getToken() {
        var userToken = await AsyncStorage.getItem('token');

        return userToken;
    },
}