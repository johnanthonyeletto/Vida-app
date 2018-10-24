export default class Client {
    constructor() {
        this.name = "Pablo Rivas";
        this.phone = "5164689725";
        this.email = "Pablo.Rivas@marist.edu";
        this.avatarURL = "https://avatars2.githubusercontent.com/u/8935301?s=460&v=4";
    }

    getConnections() {
        var connections = [];

        connections.push({
            name: "John Eletto",
            avatarURL: "https://scontent.cdninstagram.com/vp/4d3a61b2c582aa3cb7d5bbd161522412/5BF0F776/t51.2885-19/s150x150/23970050_129402724408676_3698888936974712832_n.jpg"
        });
        connections.push({
            name: "Jack Ryan",
            avatarURL: "https://media.licdn.com/dms/image/C4D03AQGloiU58ARwhQ/profile-displayphoto-shrink_800_800/0?e=1544659200&v=beta&t=5YgJ1i9YvLCmQ1P4RVxpVgAKeCyTw7e1Qs14XIGpKmY"
        });
        connections.push({
            name: "Andrew Arrigo",
            avatarURL: "https://media.licdn.com/dms/image/C4D03AQFuX28iNu3BgA/profile-displayphoto-shrink_100_100/0?e=1544054400&v=beta&t=FXIscsFhr691da4sirKkL381iecENPvGjyuCJu7g2Aw"
        });
        connections.push({
            name: "Hunter Postiglione",
            avatarURL: "https://media.licdn.com/dms/image/C5603AQFCDWeb-WRT-Q/profile-displayphoto-shrink_200_200/0?e=1544054400&v=beta&t=Z3lqgD46n6uBPxTVTRShCajcDjUdg97w1Ow-ZUQ2lCA"
        });
        connections.push({
            name: "Jenna Ficula",
            avatarURL: "https://media.licdn.com/dms/image/C4D03AQGyw5TzxgAYSw/profile-displayphoto-shrink_800_800/0?e=1544659200&v=beta&t=SqM9xs__Xkp_7z3-BQ8o8J-FJnCMoZVu387eTi9G7sY"
        });

        return connections;
    }

}