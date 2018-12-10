import Environment from '../constants/Environment';
import Auth from '../constants/Auth';
import APIRequest from '../helpers/APIRequest'

export default class Relationship {

  constructor() {
      this.client_id;
      this.pid1;
      this.pid;
      this.relationshiptoclient;
      this.fname;
      this.lname;
  }

        async save() {
            let result = Auth.getToken().then(token => {
                return fetch(Environment.API_HOST + '/1.0/relationship', {
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
                            //console.error(errorMessage);
                            throw errorMessage;
                        });
                    } else {
                        return response.json().then(result => {
                            return result;
                        });
                    }

                }).catch((error) => {
                    //console.error(error);
                    throw error;
                });

            }).catch(error => {
                //console.error(error);
                throw error;
            });
            return result.then(res => {
                return res;
            }).catch(error => {
                //console.error(error);
                throw error;
            });
        }

}
