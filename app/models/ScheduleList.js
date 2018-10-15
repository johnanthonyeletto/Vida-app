export default class ScheduleList {
    // Date should get generated via calendarpickerIOS,
    // Location can be selected from the client's home possibly?
    constructor() {
        this.upcomingEvents = [];
        var theDate = new Date('November 21, 2018 03:24:00');
        var thisDate = new Date();
        var otherDate = new Date('December 17, 2018 03:24:00');


        this.upcomingEvents.push({
            title: "Meet with Doug",
            client: "Doug Baldwin",
            location: "Doug's Home",
            date: thisDate.toLocaleDateString(),
            note: "Ask him if he actually knows Alec Baldwin"
          });

        this.upcomingEvents.push({
            title: "Check-up with Frank",
            client: "Frank Tucci",
            location: "Frank's Home",
            date: theDate.toLocaleDateString(),
            note: "See if he's made progress with meditation"
          });

        this.upcomingEvents.push({
            title: "Talk with Doug's Wife",
            client: "Diane Baldwin",
            location: "Doug's Home",
            date: otherDate.toLocaleDateString(),
            note: "Ask if her husband has been lying about Alec Baldwin."
          });
    }

    getUpcoming() {
        return this.upcomingEvents;
    }

}
