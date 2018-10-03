import React from 'react';
import { AsyncStorage, } from 'react-native';

export default class User {
    constructor() {
        this.token = null;
    }

    loadFromAsyncStorage = async () => {
        const user = await AsyncStorage.getItem('user');
        this.token = user.token;
    }

    login = async (username, password) => {
        await AsyncStorage.setItem('user', JSON.stringify(this));
        return true;
    };

    logout = async () => {
        await AsyncStorage.clear();
    };
}