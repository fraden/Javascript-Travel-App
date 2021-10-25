const deltaBetweenDates = (endDate, startDate) => {
    const deltaTime = ((endDate.getTime() - startDate.getTime())) / (1000 * 3600 * 24);
    return deltaTime;
};

export { deltaBetweenDates };