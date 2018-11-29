import APIRequest from '../helpers/APIRequest';

export default class Employee {
    constructor() {
        this.isActive;
        this.super_coach;
    }

    async getEmployee(pid) {
        var request = new APIRequest();
        request.route = '/1.0/company/employee/' + pid;
        request.method = "GET";

        return request.go().then(result => {
            return result;
        }).catch(error => { return error; });
    }
}