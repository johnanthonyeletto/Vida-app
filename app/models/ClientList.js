import Environment from '../constants/Environment';
import Auth from '../constants/Auth';

export default class ClientList {


    constructor() {
        this.activeClients = [];
        this.inactiveClients = [];

        Auth.getToken().then(token => {


            fetch(Environment.API_HOST + '/1.0/client-list', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    token: token

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


                    return;
                }

                response.json().then(result => {
                    this.activeClients = result;
                    console.log(this.activeClients);
                });
            }).catch((error) => {
                console.error(error);

            });





        });





        this.inactiveClients.push({
            name: "Pablo Rivas",
            lastInteraction: "5 Months Ago",
            avatarURL: "https://avatars2.githubusercontent.com/u/8935301?s=460&v=4"
        });
    }

    getActive() {
        return this.activeClients;
    }

    getInactive() {
        return this.inactiveClients;
    }

}