import React from 'react';
import { AsyncStorage, } from 'react-native';

export default class User {
    constructor() {
        this.token = null;
    }

    async getCurrentUser() {
        let result = Auth.getToken().then(token => {
            return fetch(Environment.API_HOST + '/1.0/account/', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    token

                },
            }).then((response) => {
                if (response.status != 200) {
                    response.json().then(errors => {
                        var errorMessage = '';
                        for (var key in errors) {
                            errorMessage = errorMessage + errors[key] + ' ';
                        }
                        throw errorMessage;
                    });
                    //return;
                }
                return response.json().then(result => {
                    return result;
                });
            }).catch((error) => {
                console.error(error);
                throw error;
            });

        });
        return result.then(res => {
            return res;
        });
    };

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