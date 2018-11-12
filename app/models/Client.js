import Environment from '../constants/Environment';
import Auth from '../constants/Auth';

export default class Client {
    constructor() {
        this.pid;
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
        this.image_base64;
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
    }

    async find(pid) {
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
                        throw errorMessage;
                    });
                    //return;
                }
                return response.json().then(result => {
                    this.pid = result.pid;
                    this.fname = result.fname;
                    this.lname = result.lname;
                    this.address = result.address;
                    this.address2 = result.address2;
                    this.city = result.city;
                    this.state_province = result.state_province;
                    this.postal_code = result.postal_code;
                    this.cell_phone = result.cell_phone;
                    this.home_phone = result.home_phone;
                    this.email = result.email;
                    this.image_path = result.image_path;
                    this.occupation = result.occupation;
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
                        console.error(errorMessage);
                    });
                } else {
                    return response.json().then(result => {
                        return result;
                    });
                }

            }).catch((error) => {
                console.error(error);
            });

        }).catch(error => {
            console.error(error);
        });
        return result.then(res => {
            return res;
        }).catch(error => {
            console.error(error);
        });
    }

    async markInactive() {
        
        let result = Auth.getToken().then(token => {
            return fetch(Environment.API_HOST + '/1.0/client/' + this.pid, {
                method: 'DELETE',
                headers: {
                    // Accept: 'application/json',
                    // 'Content-Type': 'application/json',
                    token
                },
            }).then((response) => {
                if (response.status != 200) {
                    response.json().then(errors => {
                        var errorMessage = '';
                        for (var key in errors) {
                            errorMessage = errorMessage + errors[key] + ' ';
                        }
                        console.error(errorMessage);
                    });
                } else {
                    return response.json().then(result => {
                        return result;
                    });
                }

            }).catch((error) => {
                console.error(error);
            });

        }).catch(error => {
            console.error(error);
        });
        return result.then(res => {
            return res;
        }).catch(error => {
            console.error(error);
        });
    }
}