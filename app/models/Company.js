import APIRequest from '../helpers/APIRequest';

export default class Company {


    constructor() { }

    async getCompany() {
        var request = new APIRequest();
        request.method = "GET";
        request.route = '/1.0/company';

        let response = request.go().then(response => {
            return response;
        }).catch(error => {
            throw new Error(error);
        });
        return response;
    }

    async saveCompanyInfo(info) {
        var request = new APIRequest();
        request.method = "POST";
        request.route = "/1.0/company";
        request.body = info;
        let response = request.go().then(response => {
            return response;
        }).catch(error => {
            throw new Error(error);
        });

        return response;
    }

    async getEmployees() {
        var request = new APIRequest();
        request.method = "GET";
        request.route = "/1.0/company/employees";

        let response = request.go().then(response => {
            return response;
        }).catch(error => {
            throw new Error(error);
        });

        return response;
    }

}