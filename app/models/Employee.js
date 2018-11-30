import APIRequest from '../helpers/APIRequest';

export default class Employee {
    constructor() {
    }

    async getEmployee(pid) {
        var request = new APIRequest();
        request.route = '/1.0/company/employee/' + pid;
        request.method = "GET";

        return request.go().then(result => {
            return result;
        }).catch(error => { return error; });
    }

    async setSuperCoach(pid, super_coach) {
        var request = new APIRequest();
        request.route = '/1.0/company/employee/super-coach';
        request.method = "POST";
        request.body = { 'pid': pid, 'super_coach': super_coach };

        return request.go().then(result => {
            return result;
        }).catch(error => { return error; });
    }

    async setActive(pid, isActive) {
        var request = new APIRequest();
        request.route = '/1.0/company/employee/active';
        request.method = "POST";
        request.body = { 'pid': pid, 'isActive': isActive };

        return request.go().then(result => {
            return result;
        }).catch(error => { return error; });
    }
}