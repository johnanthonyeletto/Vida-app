export default class ClientList {

    constructor() {
        this.activeClients = [];
        this.inactiveClients = [];

        this.activeClients.push({
            name: "John Eletto",
            lastInteraction: "5 Days Ago",
            avatarURL: "https://scontent.cdninstagram.com/vp/4d3a61b2c582aa3cb7d5bbd161522412/5BF0F776/t51.2885-19/s150x150/23970050_129402724408676_3698888936974712832_n.jpg"
        });
        this.activeClients.push({
            name: "Jack Ryan",
            lastInteraction: "5 Days Ago",
            avatarURL: "https://media.licdn.com/dms/image/C4D03AQGloiU58ARwhQ/profile-displayphoto-shrink_800_800/0?e=1544659200&v=beta&t=5YgJ1i9YvLCmQ1P4RVxpVgAKeCyTw7e1Qs14XIGpKmY"
        });
        this.activeClients.push({
            name: "Andrew Arrigo",
            lastInteraction: "6 Days Ago",
            avatarURL: "https://media.licdn.com/dms/image/C4D03AQFuX28iNu3BgA/profile-displayphoto-shrink_100_100/0?e=1544054400&v=beta&t=FXIscsFhr691da4sirKkL381iecENPvGjyuCJu7g2Aw"
        });
        this.activeClients.push({
            name: "Hunter Postiglione",
            lastInteraction: "6 Days Ago",
            avatarURL: "https://media.licdn.com/dms/image/C5603AQFCDWeb-WRT-Q/profile-displayphoto-shrink_200_200/0?e=1544054400&v=beta&t=Z3lqgD46n6uBPxTVTRShCajcDjUdg97w1Ow-ZUQ2lCA"
        });
        this.activeClients.push({
            name: "Jenna Ficula",
            lastInteraction: "7 Days Ago",
            avatarURL: "https://media.licdn.com/dms/image/C4D03AQGyw5TzxgAYSw/profile-displayphoto-shrink_800_800/0?e=1544659200&v=beta&t=SqM9xs__Xkp_7z3-BQ8o8J-FJnCMoZVu387eTi9G7sY"
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