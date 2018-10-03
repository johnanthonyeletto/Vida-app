export default class ClientList {

    constructor() {
        this.activeClients = [];
        this.inactiveClients = [];

        this.activeClients.push({
            name: "John Eletto",
            lastInteraction: "5 Days Ago",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        });
        this.activeClients.push({
            name: "Jack Ryan",
            lastInteraction: "5 Days Ago",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        });
        this.activeClients.push({
            name: "Andrew Arrigo",
            lastInteraction: "6 Days Ago",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        });
        this.activeClients.push({
            name: "Hunter Postiglione",
            lastInteraction: "6 Days Ago",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        });
        this.activeClients.push({
            name: "Jenna Ficula",
            lastInteraction: "7 Days Ago",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        });

        this.inactiveClients.push({
            name: "Pablo Rivas",
            lastInteraction: "5 Months Ago",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        });
    }

    getActive() {
        return this.activeClients;
    }

    getInactive() {
        return this.inactiveClients;
    }

}