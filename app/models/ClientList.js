import APIRequest from '../helpers/APIRequest';

export default class ClientList {


    constructor() { }

    async getClients() {
        var request = new APIRequest();
        request.method = "GET";
        request.route = '/1.0/client-list';

        return request.go().then(response => {
            return response;
        }).catch(error => {
            throw new Error(error);
        });
    }

}