import Auth from '../constants/Auth';
export default class APIRequest {
    constructor() {
        this.method;
        this.route;
        this.body;
    }

    handleErrors(response) {
        if (!response.ok) {
            throw new Error(response);
        }
        return response;
    }

    async go() {
        var requestRoute = this.route;
        var requestMethod = this.method;
        let result = Auth.getToken().then(token => {
            return fetch(Environment.API_HOST + requestRoute, {
                method: requestMethod,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    token
                },
                body: JSON.stringify(this.body),
            }).then(response => this.handleErrors(response)).then(response => {
                let data = response.json().then(res => {
                    return res;
                });
                return data;
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            throw new Error(error);
        });

        return result;
    }
}