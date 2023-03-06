const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-19.93&longitude=-44.05&hourly=temperature_2m";

async function ChangeTitle() {
    let response = await fetch(apiUrl);

    let temp, time;

    if (response.status == 200) {
        let data = await response.json();
        console.log(data);

        temp = data.hourly.temperature_2m.pop();
        time = Date(data.hourly.time.pop());

        console.log(`Time: ${time} - Temp: ${temp}ºC`);
    } else {
        return;
    }

    const titleElement = document.getElementById('articleTitle');
    const contentElement = document.getElementById('articleContent');

    titleElement.innerHTML = `Time: ${time}`;
    contentElement.innerHTML = `Today's temperature: ${temp} Celsius`;
}