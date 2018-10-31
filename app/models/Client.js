import Environment from '../constants/Environment';
import Auth from '../constants/Auth';

export default class Client {
    constructor() {

    }

    getConnections() {

    }

    getNextMeeting() {
        return new Meeting();
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

}

class Meeting {
    constructor() {
        this.title = "Meeing With Pablo";
        this.dateTime = new Date();
        this.notes = "";
        this.location = "On The Phone";
    }
}