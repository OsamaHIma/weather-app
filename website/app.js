/* Global Variables */
const API = "f6b18b07dc70caa67a703a184586d4b2";

const errorEl = document.getElementById("errorEl");
const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const content = document.getElementById("content");
const feelings = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const iconImg = document.getElementById("icon");
const description = document.getElementById("description");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

generateBtn.addEventListener("click", async () => {
  try {
    const zipCode = document.getElementById("zip");
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${API}&units=metric`;
    const response = await fetch(url).then((res) => res.json());
    // View the error to the user
    if (response.cod != "200") {
      errorEl.style.display = "inline-block";
      errorEl.innerHTML = `Error: ${response.message}, code: ${response.cod}`;
      setTimeout(() => {
        errorEl.style.display = "none";
      }, 1500);
    }
    const temp = await response.main.temp;
    const city = await response.name;
    const icon = await response.weather[0].icon;
    const des = await response.weather[0].description;
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    // post data to the server
    await fetch("/postData", {
      method: "post",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: newDate,
        temp: temp,
        city: city,
        feelings: feelings.value,
      }),
    });
    // Get data
    const data = await fetch("/getData").then((res) => res.json());
    tempEl.innerHTML += data.temp;
    date.innerHTML += data.date;
    content.innerHTML += data.feelings;
    cityEl.innerHTML += city;
    iconImg.src = iconUrl;
    description.textContent += des;
  } catch (error) {
    console.log(error);
  }
});
