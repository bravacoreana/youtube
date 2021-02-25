const API_URL = "https://ipapi.co/json/";

fetch(API_URL)
  .then((response) => response.json())
  .then((json) => {
    document.getElementById("countryCode-js").innerHTML = json.country;
    const countryName = document.querySelector("#countryName-js");
    if (countryName) countryName.innerHTML = `Country: ${json.country_name}`;
  });
