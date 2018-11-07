import Environment from '../constants/Environment';
import Auth from '../constants/Auth';

export default class Client {
    constructor() {
        this.fname;
        this.lname;
        this.address;
        this.address2;
        this.city;
        this.state_province;
        this.postal_code;
        this.cell_phone;
        this.home_phone;
        this.email;
        this.image_path;
        this.occupation;
    }

    getConnections() {

    }

    async getClient(pid) {
        let result = Auth.getToken().then(token => {
            return fetch(Environment.API_HOST + '/1.0/client/' + pid, {
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
                        alert(errorMessage);
                    });
                    //return;
                }
                return response.json().then(result => {
                    return result;
                });
            }).catch((error) => {
                console.error(error);
            });

        });
        return result.then(res => {
            return res;
        });
    }


    async save() {
        let result = Auth.getToken().then(token => {
            return fetch(Environment.API_HOST + '/1.0/client', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    token
                },
                body: JSON.stringify(this),
            }).then((response) => {
                if (response.status != 200) {
                    response.json().then(errors => {
                        var errorMessage = '';
                        for (var key in errors) {
                            errorMessage = errorMessage + errors[key] + ' ';
                        }
                        alert(errorMessage);
                    });
                }
                return response.json().then(result => {
                    return result;
                });
            }).catch((error) => {
                console.error(error);
            });

        });
        return result.then(res => {
            return res;
        });
    }

}