import APIRequest from '../helpers/APIRequest';
export default class User {
    constructor() {
        this.fname;
        this.lname;
        this.email;
        this.currentPassword;
        this.newPassword;
        this.confirmNewPassword;
    }

    async getCurrentUser() {
        var request = new APIRequest();

        request.method = "GET";
        request.route = '/1.0/account';

        let response = request.go().then(response => {
            return response;
        }).catch(error => {
            throw new Error(error);
        });

        return response;
    };

    async save() {
        var request = new APIRequest();

        request.method = "POST";
        request.route = '/1.0/account';
        request.body = this;

        let response = request.go().then(response => {
            return response;
        }).catch(error => {
            throw new Error(error);
        });

        return response;
    };
}