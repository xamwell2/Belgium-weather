const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const organizeWeather = (weather) => {
    const { time, temperature_2m } = weather.hourly;
    const days = {};

    let oldTemp;
    time.forEach((hour, index) => {
        const now = new Date(hour);

        const day = now.getDate(); // 1-31
        const dayOfWeek = weekDays[now.getDay()]; // 0-6
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        const temp = temperature_2m[index];
        const formattedTemp = temp.toFixed(1);

        // Check the old and the new temperatures
        let arrow;
        if (oldTemp) {
            if (oldTemp > temp) {
                arrow = 'down';
            } else if (oldTemp < temp) {
                arrow = 'up';
            } else {
                arrow = 'same';
            }
        } else {
            arrow = 'none';
        }

        const hourAndTemp = {
            hour: `${hours}:${minutes}:${seconds}`,
            temp: formattedTemp,
            arrow: arrow
        };

        if (!days[day]) {
            days[day] = { dayOfWeek, data: [hourAndTemp] };
        } else {
            days[day].data.push(hourAndTemp);
        }

        oldTemp = temp;
    });

    return days;
};

export default organizeWeather;