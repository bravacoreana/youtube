const IP_TOKEN = process.env.IPINFO_TOKEN;

fetch(`https://ipinfo.io?token=${IP_TOKEN}`)
  .then((response) => response.json())
  .then((json) => {
    const countryCode = json.country;
    document.getElementById("countryCode-js").innerHTML = countryCode;
  });
