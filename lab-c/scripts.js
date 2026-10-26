const klucz = "d767e972d22c720c3397488f5d5cd0ef";

let przycisk = document.getElementById("przycisk");

przycisk.addEventListener("click", function () {
  let miasto = document.getElementById("miasto").value;
  pogodaTeraz(miasto);
  prognoza(miasto);
});

function pogodaTeraz(miasto) {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + miasto + "&appid=" + klucz + "&units=metric";

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    let dane = JSON.parse(xhr.responseText);
    console.log(dane);
    pokazTeraz(dane);
  };
  xhr.send();
}

function prognoza(miasto) {
  let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + miasto + "&appid=" + klucz + "&units=metric";

  fetch(url)
    .then(function (odpowiedz) {
      return odpowiedz.json();
    })
    .then(function (dane) {
      console.log(dane);
      pokazPrognoze(dane);
    });
}

function pokazTeraz(dane) {
  let teraz = document.getElementById("teraz");
  let ikonka = "https://openweathermap.org/img/wn/" + dane.weather[0].icon + "@2x.png";

  teraz.innerHTML =
    "<h2>NOW</h2>" +
    "<p class='miasto'>" + dane.name + ", " + dane.sys.country + "</p>" +
    "<img src='" + ikonka + "'>" +
    "<p class='temp'>" + Math.round(dane.main.temp) + " °C</p>" +
    "<p>" + dane.weather[0].description + "</p>" +
    "<p>feels like: " + Math.round(dane.main.feels_like) + " °C</p>" +
    "<p>humidity: " + dane.main.humidity + " %</p>" +
    "<p>wind: " + dane.wind.speed + " m/s</p>";
}

function pokazPrognoze(dane) {
  let ramka = document.getElementById("prognoza");
  let html = "<h2>5 DAYS FORECAST</h2><div class='kafelki'>";

  for (let i = 0; i < dane.list.length; i++) {
    let wpis = dane.list[i];
    let data = new Date(wpis.dt * 1000);
    let ikonka = "https://openweathermap.org/img/wn/" + wpis.weather[0].icon + "@2x.png";

    html +=
      "<div class='kafelek'>" +
      "<p>" + data.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" }) + "</p>" +
      "<p>" + data.getHours() + ":00</p>" +
      "<img src='" + ikonka + "'>" +
      "<p class='kafelek-temp'>" + Math.round(wpis.main.temp) + " °C</p>" +
      "</div>";
  }

  html += "</div>";
  ramka.innerHTML = html;
}
