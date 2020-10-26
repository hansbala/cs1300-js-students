var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=35z8SsoTEGc7Ok86xcy5V9LJUMtoimRWMb0gEvcRyfQ";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      handleResponse(request.response);
    })
);

const handleResponse = (response) => {
  rawData = JSON.parse(response);
  plants = rawData.data;

  filteredPlants = plants.filter((plant) => {
    return (plant.family_common_name = "Aster family");
  });

  let htmlPlants = filteredPlants.map(plantToHTML);

  // now add the cards to the plant-wrapper div
  let plantWrapper = document.getElementById("plant-wrapper");
  for (plantCard of htmlPlants) {
    plantWrapper.appendChild(plantCard);
  }
};

/*
  return a card for each plant
*/
const plantToHTML = (plant) => {
  let plantCard = document.createElement("div");
  plantCard.classList.add("card");

  // Add the image to the card
  let plantImage = document.createElement("img");
  plantImage.classList.add("card-img-top");
  plantImage.src = plant.image_url;

  // card body
  let cardBody = document.createElement("card-body");
  let heading = document.createElement("h5");
  heading.classList.add("card-title");
  heading.classList.add("text-center");
  heading.innerText = plant.common_name;

  let familyName = document.createElement("p");
  familyName.classList.add("card-text");
  familyName.classList.add("text-center");
  familyName.innerText = plant.family_common_name;

  // now nest the elements
  cardBody.appendChild(heading);
  cardBody.appendChild(familyName);

  plantCard.appendChild(plantImage);
  plantCard.appendChild(cardBody);

  return plantCard;
};
