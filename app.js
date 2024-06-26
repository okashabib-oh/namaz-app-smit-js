const form = document.getElementById('namazForm');
const input = document.getElementById('cityname');
const resultContainer = document.getElementById('result-container');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${day}-${month}-${year}`;
    const cityName = input.value.trim();

    fetch(`https://api.aladhan.com/v1/timingsByCity/${fullDate}?city=${cityName}&country=&method=8`)
        .then(res => res.json())
        .then(data => {
            const namazTimes = data.data.timings;
            resultContainer.innerHTML = `
                <h5 class="alert alert-primary text-dark text-center mb-3">Namaz times for ${cityName} on ${fullDate}</h5>
                <div class="d-flex flex-column align-items-center">
                    <div class="alert alert-success text-center w-75 mb-2"><strong>FAJR:</strong> ${namazTimes.Fajr}</div>
                    <div class="alert alert-success text-center w-75 mb-2"><strong>DHUHR:</strong> ${namazTimes.Dhuhr}</div>
                    <div class="alert alert-success text-center w-75 mb-2"><strong>ASR:</strong> ${namazTimes.Asr}</div>
                    <div class="alert alert-success text-center w-75 mb-2"><strong>MAGHRIB:</strong> ${namazTimes.Maghrib}</div>
                    <div class="alert alert-success text-center w-75 mb-2"><strong>ISHA:</strong> ${namazTimes.Isha}</div>
                </div>
            `;
        })
        .catch(error => {
            resultContainer.innerHTML = `<div class="alert alert-danger">Error fetching data. Please try again.</div>`;
        });
});
