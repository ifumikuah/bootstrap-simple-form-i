// Supports weights 300-800
import "@fontsource-variable/red-hat-text";
import "@fontsource-variable/red-hat-display";

// Import our custom CSS
import "./scss/styles.scss";

// Import all of Bootstrap's JS
import {} from "bootstrap";

// JS Scripts

const formContact = document.getElementById("formContact");
const dropdownTelcode = document.getElementById("dropdownTelcode");
const buttonTelcode = document.getElementById("buttonTelcode");
let currentCountry =   {
  name: null,
  abbr: null,
  code: null,
};

const country = [
  {
    name: "Great Britain",
    abbr: "gb",
    code: 44,
  },
  {
    name: "Indonesia",
    abbr: "id",
    code: 62,
  },
  {
    name: "People's Republic of China",
    abbr: "zh",
    code: 86,
  },
  {
    name: "Russian Federation",
    abbr: "ru",
    code: 7,
  },
  {
    name: "United States",
    abbr: "us",
    code: 1,
  },
];

dropdownTelcode.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    const dataCountry = item.getAttribute("data-country");
    currentCountry = country.find(({ abbr }) => dataCountry === abbr);

    buttonTelcode.innerText = `${currentCountry.abbr.toUpperCase()} (+${
      currentCountry.code
    })`;
  });
});

formContact.addEventListener("submit", (event) => {
  const isStartWithCode = new RegExp(`^${currentCountry.code}.*$`, "gi");
  const formData = new FormData(formContact);
  const datum = {};

  for (const [key, val] of formData) {
    datum[key] = val;
    if (!datum.phone) {    
      delete datum.phone;
    }
  }

  if (datum.phone) {    
    if (!isStartWithCode.test(datum.phone)) {
      datum.phone = `${currentCountry.code}${datum.phone}`;
    }
  }

  console.log(datum);

  event.preventDefault();
});
