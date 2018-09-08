import React from 'react';
import { AsyncStorage, } from 'react-native';

export default class User {
    constructor() {
        this.token = null;
    }

    login = async (username, password) => {
        await AsyncStorage.setItem('user', JSON.stringify(this));
        return true;
    };
}