import Environment from '../constants/Environment';
import Auth from '../constants/Auth';

export default class Event {
    constructor() {

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

}
    // 
    // public function Meetings()
    // {
    //     // I want to get all meetings that the coach logged in has in the system
    //
    //     $meetings = DB::table('events')->join('people', 'events.pid', '=', 'people.pid')->join('coach_clients', 'people.pid', '=', 'coach_clients.client_id')->where('coach_clients.coach_id', $this->pid)->select('events.*')->get();
    //     // $meetings = app('db')->select("SELECT ev.* FROM events as ev, coach_clients as cc, people as pe where cc.client_id = pe.pid and pe.pid = ev.pid and cc.coach_id = :coach_id", ["coach_id" => $this->pid]);
    //     return $meetings;
    // }
