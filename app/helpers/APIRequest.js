import Auth from '../constants/Auth';
export default class APIRequest {
    constructor() {
        this.method;
        this.route;
        this.body;
        this.auth = true;
    }

    handleErrors(response) {
        if (!response.ok) {
            console.error(response);
            throw new Error(response);
        }
        return response;
    }

    async goNoAuth() {
        var requestRoute = this.route;
        var requestMethod = this.method;
        return fetch(Environment.API_HOST + requestRoute, {
            method: requestMethod,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.body),
        }).then(response => this.handleErrors(response)).then(response => {
            return response.json().then(res => {
                return res;
            });
        }).catch(error => {
            throw new Error(error);
        });

    }

    async go() {
        if (this.auth == false) {
            return this.goNoAuth();
        }

        var requestRoute = this.route;
        var requestMethod = this.method;
        return Auth.getToken().then(token => {
            return fetch(Environment.API_HOST + requestRoute, {
                method: requestMethod,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    token
                },
                body: JSON.stringify(this.body),
            }).then(response => this.handleErrors(response)).then(response => {
                return response.json().then(res => {
                    return res;
                });
            }).catch(error => {
                throw new Error(error);
            });
        }).catch(error => {
            throw new Error(error);
        });
    }
}