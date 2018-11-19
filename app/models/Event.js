import Environment from '../constants/Environment';
import Auth from '../constants/Auth';
import APIRequest from '../helpers/APIRequest'

export default class Event {
    constructor() {
        this.event_id;
        this.pid;
        this.event_datetime;
        this.location;
        this.notes;
    }

    async getEvent(event_id) {
        let result = Auth.getToken().then(token => {
            return fetch(Environment.API_HOST + '/1.0/event/' + event_id, {
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
    async deleteEvent(event_id){
      // console.log("do I even make it here?");
      // console.log(event_id);
      // console.log("event_id");
      var request = new APIRequest();
        request.method = "DELETE";
        request.route = '/1.0/event/'+ event_id;
        let response =
          request.go().then(response => {
            return response;
          }).catch(error => {
            throw new Error(error);
          });
        return response;
    }

    // async deleteEvent(event_id) {
    //     let result = Auth.getToken().then(token => {
    //         return fetch(Environment.API_HOST + '/1.0/event/' + event_id, {
    //             method: 'DELETE',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 token
    //
    //             },
    //         }).then((response) => {
    //             if (response.status != 200) {
    //                 response.json().then(errors => {
    //                     var errorMessage = '';
    //                     for (var key in errors) {
    //                         errorMessage = errorMessage + errors[key] + ' ';
    //                     }
    //                     alert(errorMessage);
    //                 });
    //                 //return;
    //             }
    //             return response.json().then(result => {
    //                 return result;
    //             });
    //         }).catch((error) => {
    //             console.error(error);
    //         });
    //
    //     });
    //     return result.then(res => {
    //         return res;
    //     });
    // }



        async save() {
            let result = Auth.getToken().then(token => {
                return fetch(Environment.API_HOST + '/1.0/event', {
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
