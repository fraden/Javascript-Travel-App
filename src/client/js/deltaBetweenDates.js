const deltaBetweenDates = (date_of_trip, date_of_today) => {
    console.log(date_of_trip);
    console.log(date_of_today);
    var delta_Time = ((date_of_trip.getTime() - date_of_today.getTime())) / (1000 * 3600 * 24);
    return delta_Time;
}

export { deltaBetweenDates }