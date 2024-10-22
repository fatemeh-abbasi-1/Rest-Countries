"use strict";
const container = document.querySelector(".main-container");
const fillterBtn = document.querySelector(".title-access-fillter");
const sortBtn = document.querySelector(".title-access-sort");
const optionsFillter = document.querySelector(".fillter");
const optionsSort = document.querySelector(".sort");
const goBack = document.querySelector(".back");
let userSearch = document.querySelector(".input-search");

let allCountries = 1;
let countryDataInScreen = [];

// ----------------------

const createCard = function (data) {
  countryDataInScreen.push(data);
  console.log("this is my data", data);
  const infoCounty = document.createElement("div");
  container.append(infoCounty);
  infoCounty.style.width = "15rem";
  infoCounty.style.height = "16.5rem";
  infoCounty.style.marginRight = "3rem";
  infoCounty.style.marginLeft = "3rem";
  infoCounty.style.marginBottom = "2.4rem";
  infoCounty.style.backgroundColor = "var(--Light-Mode-Elements)";
  const imgFlag = document.createElement("img");
  imgFlag.src = `${data.flags.png}`;
  imgFlag.style.height = "8.5rem";
  infoCounty.append(imgFlag);
  const infoCountryText = document.createElement("div");
  infoCounty.append(infoCountryText);
  imgFlag.style.width = "100%";
  const nameCountry = document.createElement("h3");
  nameCountry.textContent = `${data.name.common}`;
  nameCountry.style.marginBottom = "0.6rem";
  infoCountryText.append(nameCountry);
  infoCountryText.classList.add("info-country");
  const population = document.createElement("p");
  population.style.marginBottom = "0.5rem";
  population.textContent = `Population : ${data.population}`;
  infoCountryText.append(population);
  const region = document.createElement("p");
  region.style.marginBottom = "0.5rem";
  region.textContent = `Region: ${data.region}`;
  infoCountryText.append(region);
  const capital = document.createElement("p");
  capital.textContent = `Capital: ${data.capital[0]}`;
  infoCountryText.append(capital);
};

const getCountrysFromRegion = async function (region) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();
    console.log(data);
    for (let i = 0; i < 8; i++) {
      createCard(data[i]);
    }
  } catch (err) {
    console.error(err.message);
  }
};
getCountrysFromRegion("america");

//display items fillter
fillterBtn.addEventListener("mouseover", function () {
  optionsFillter.classList.toggle("hidden");
});
//hidden items fillter
optionsFillter.addEventListener("mouseleave", function () {
  optionsFillter.classList.add("hidden");
});
//display option sort
sortBtn.addEventListener("mouseover", function () {
  optionsSort.classList.toggle("hidden");
  optionsFillter.classList.add("hidden");
});
//hidden items sort
optionsSort.addEventListener("mouseleave", function () {
  optionsSort.classList.add("hidden");
});

//section fillter
optionsFillter.addEventListener("click", function (e) {
  countryDataInScreen = [];
  const regionName = e.target.textContent;
  const editRegionName = regionName[0].toLowerCase() + regionName.slice(1);
  console.log(editRegionName);
  container.textContent = "";
  getCountrysFromRegion(editRegionName);
  optionsFillter.classList.add("hidden");
});

//all country
const getAllCountries = async function () {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    console.log(data);
    allCountries = data;
  } catch (err) {
    console.error(err);
  }
};
getAllCountries();

//search
userSearch.addEventListener("keyup", function (e) {
  let userSearchValue = userSearch.value;
  const editUserSearchValue =
    userSearchValue.slice(0, 1).toUpperCase() + userSearch.value.slice(1);
  console.log(editUserSearchValue);
  let country;
  const findCountry = allCountries.forEach((c, i) => {
    // if (c.name.common === editUserSearchValue) {
    //   country = c;
    //   container.textContent = "";
    // }
    if (c.name.common.includes(editUserSearchValue)) {
      country = c;
      container.textContent = "";
      goBack.classList.remove("hidden");
    }
  });
  createCard(country);
});
//go back
goBack.addEventListener("click", function (e) {
  container.innerHTML = "";
  getCountrysFromRegion("america");
  userSearch.value = "";
  goBack.classList.add("hidden");
});

//sort
optionsSort.addEventListener("click", function (e) {
  console.log(e.target.textContent);
  // if (e.target.textContent === "Name") {
  //   const sortName = countryDataInScreen.sort(
  //     (a, b) => b.name.common - a.name.common
  //   );
  //   console.log(sortName);

  //   container.innerHTML = "";
  //   for (let i = 0; i < 8; i++) {
  //     createCard(sortName[i]);
  //   }
  // }
  if (e.target.textContent === "Population") {
    const sortPopulation = countryDataInScreen.sort(
      (a, b) => b.population - a.population
    );
    console.log(countryDataInScreen);
    console.log(sortPopulation);
    container.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      createCard(sortPopulation[i]);
    }
  }
  if (e.target.textContent === "Area") {
    const sortArea = countryDataInScreen.sort((a, b) => b.area - a.area);
    container.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      createCard(sortArea[i]);
    }
  }
});
console.log(countryDataInScreen);
