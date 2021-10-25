const deltaBetweenDates = (date_of_trip, date_of_today) => {
    const delta_Time = ((date_of_trip.getTime() - date_of_today.getTime())) / (1000 * 3600 * 24);
    return delta_Time;
};

export { deltaBetweenDates };