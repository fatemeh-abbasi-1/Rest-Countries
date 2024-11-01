"use strict";
const container = document.querySelector(".main-container");
const fillterBtn = document.querySelector(".title-access-fillter");
const sortBtn = document.querySelector(".title-access-sort");
const optionsFillter = document.querySelector(".fillter");
const optionsSort = document.querySelector(".sort");
const goBack = document.querySelector(".back");
const main = document.querySelector(".main");
const getChild = document.querySelector(".getchild");
const userAccess = document.querySelector(".user-access");
const lightAndDarkBtn = document.querySelector(".light-dark-icon");
const notFindCountry = document.querySelector('.show-error');
const header = document.querySelector(".header");
let userSearch = document.querySelector(".input-search");
let allCountries;
let countryDataInScreen = [];


//header
const body = document.querySelector("body");
const headerMain = document.createElement("div");
body.prepend(headerMain);
headerMain.classList.add("header");
headerMain.style.width = "100%";
headerMain.style.height = "3.5rem";
headerMain.style.backgroundColor = "var(--color-elements)";
const question = document.createElement("h2");
question.textContent = "Where in the world ?";
headerMain.append(question);
const moonBtn = document.createElement("img");
moonBtn.src = "img/moon.png";
moonBtn.setAttribute('data-mood','moon');
headerMain.append(moonBtn);
moonBtn.setAttribute("onclick", "handeleLightAndDark(event)");
moonBtn.style.width = "1.5rem";
moonBtn.style.height = "1.6rem";
moonBtn.style.cursor = "pointer";

//create card
const createCard = function (data) {
  countryDataInScreen.push(data);
  const infoCounty = document.createElement("div");
  container.append(infoCounty);
  infoCounty.setAttribute("onclick", "renderDetailsCountry(event)");
  infoCounty.classList.add("getchild");
  infoCounty.style.width = "15rem";
  infoCounty.style.height = "18rem";
  infoCounty.style.marginBottom = "1.4rem";
  infoCounty.classList.add("info-country");
  const imgFlag = document.createElement("img");
  imgFlag.src = `${data.flags.png}`;
  imgFlag.style.height = "8.5rem";
  infoCounty.append(imgFlag);
  const infoCountryText = document.createElement("div");
  infoCounty.append(infoCountryText);
  imgFlag.style.width = "100%";
  const nameCountry = document.createElement("h4");
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

//CountryDetails
const countryDetails = function (data) {
  const languagesToArr = Object.values(data.languages);
  const currenciesToArr = Object.values(data.currencies);
  const containerDetail = document.createElement("div");
  containerDetail.style.marginRight = "auto";
  containerDetail.style.marginLeft = "auto";
  container.append(containerDetail);
  const containerBtnBack = document.createElement("div");
  containerBtnBack.style.width = "100%";
  containerBtnBack.style.height = "3rem";
  containerBtnBack.style.marginBottom = "2rem";
  containerDetail.append(containerBtnBack);
  const textBack = document.createElement("p");
  textBack.textContent = "← back";
  textBack.style.marginLeft = '2%';
  textBack.classList.add("back-btn");
  textBack.setAttribute("onclick", "goToHome()");
  containerBtnBack.append(textBack);
  const infoCountryDetails = document.createElement("div");
  infoCountryDetails.classList.add("detail-container");
  containerDetail.append(infoCountryDetails);
  const imgContryDetail = document.createElement("img");
  imgContryDetail.classList.add("img-detail");
  imgContryDetail.style.marginRight = "10%";
  imgContryDetail.style.marginBottom = "15%";
  imgContryDetail.src = `${data.flags.png}`;
  infoCountryDetails.append(imgContryDetail);
  const infoContryText = document.createElement("div");
  infoCountryDetails.append(infoContryText);
  const nameCountryDtail = document.createElement("h2");
  nameCountryDtail.style.marginBottom = "2.2rem";
  nameCountryDtail.textContent = `${data.name.common}`;
  infoContryText.append(nameCountryDtail);
  const topLevelDomain = document.createElement("p");
  topLevelDomain.style.marginBottom = "0.5rem";
  topLevelDomain.textContent = `Native name :${data.name.common}`;
  infoContryText.append(topLevelDomain);
  const population = document.createElement("p");
  population.style.marginBottom = "0.5rem";
  population.textContent = `Population : ${data.population}`;
  infoContryText.append(population);
  const currencies = document.createElement("p");
  currencies.style.marginBottom = "0.5rem";
  currencies.textContent = `Currencies : ${currenciesToArr[0].name}`;
  infoContryText.append(currencies);
  const regionDetail = document.createElement("p");
  regionDetail.style.marginBottom = "0.5rem";
  regionDetail.textContent = `Region Detail : ${data.region}`;
  infoContryText.append(regionDetail);
  const languages = document.createElement("p");
  languages.style.marginBottom = "2rem";

  languages.textContent = `Languages :${languagesToArr}`;
  infoContryText.append(languages);
  const infoContryText2 = document.createElement("div");
  infoCountryDetails.append(infoContryText2);
  infoContryText2.style.paddingTop = '4rem';
  infoContryText2.style.marginLeft = '3rem';
  const subRegion = document.createElement("p");
  subRegion.style.marginBottom = "0.5rem";
  subRegion.textContent = `Sub Region :${data.subregion}`;
  infoContryText2.append(subRegion);
  const capitalDetail = document.createElement("p");
  capitalDetail.style.marginBottom = "0.5rem";
  capitalDetail.textContent = `Capital: ${data.capital[0]}`;
  infoContryText2.append(capitalDetail);
  if (!data.borders) return;
  const border = document.createElement("span");
  border.style.marginBottom = "0.5rem";
  border.textContent = `Border : `;
  infoContryText.append(border);
  const nameBorder1 = document.createElement("div");
  nameBorder1.style.display = 'inline';
  nameBorder1.style.width = 'max-content';
  nameBorder1.style.backgroundColor = 'var(--color-elements)';
  nameBorder1.style.marginRight = '1rem';
  nameBorder1.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px rgba(0, 0, 0, 0.3) 0px 8px 16px -8px';
  nameBorder1.style.padding = `0.4rem`;

  nameBorder1.textContent = `${data.borders[0]}`;
  infoContryText.append(nameBorder1);
  const nameBorder2 = document.createElement("div");
  nameBorder2.style.display = 'inline';
  nameBorder2.style.width = `max-content`;
  nameBorder2.style.padding = `0.4rem`;

  nameBorder2.style.backgroundColor = 'var(--color-elements)';
  nameBorder2.style.marginRight = '1rem';
  nameBorder2.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px rgba(0, 0, 0, 0.3) 0px 8px 16px -8px';

  nameBorder2.textContent = `${data.borders[1]}`;
  infoContryText.append(nameBorder2);
  const nameBorder3 = document.createElement("div");
  nameBorder3.style.display = 'inline';
  nameBorder3.style.width = `max-content`;
  nameBorder3.style.backgroundColor = 'var(--color-elements)';
  nameBorder3.style.marginRight = '1rem';
  nameBorder3.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px rgba(0, 0, 0, 0.3) 0px 8px 16px -8px';
  nameBorder3.style.padding = `0.4rem`;
  nameBorder3.textContent = `${data.borders[2]}`;
  infoContryText.append(nameBorder3);
};
function handelError() {
  header.classList.add("hidden");
  userAccess.classList.add("hidden");
  const titleErr = document.createElement("h4");
  titleErr.textContent = "Something went wrong, please try again!";
  container.append(titleErr);
}
//get countries from region
const getCountrysFromRegion = async function (region) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    data.forEach(i => createCard(i));
  } catch (err) {
    handelError();
  }
};
// getCountrysFromRegion("america");

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


//all country
const getAllCountries = async function () {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
   
    allCountries = data;
    container.innerHTML = '';
    data.forEach(i => createCard(i));
    console.log(allCountries);
  } catch (err) {
    handelError();
  }
};
getAllCountries();
// console.log(allCountries);
//section fillter
optionsFillter.addEventListener("click", function (e) {
  countryDataInScreen = [];
  const regionName = e.target.textContent;
  const editRegionName = regionName[0].toLowerCase() + regionName.slice(1);
  console.log(editRegionName);
  container.textContent = "";
  if(editRegionName === 'all'){
    getAllCountries();
  }
  getCountrysFromRegion(editRegionName);
  optionsFillter.classList.add("hidden");
});


//get 1 contry info
const getOneCountry = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    countryDetails(data[0]);
  } catch (err) {
    handelError();
  }
};


//search
userSearch.addEventListener("keyup", function (e) {
  let userSearchValue = userSearch.value;
  const editUserSearchValue = userSearchValue.slice(0, 1).toUpperCase() + userSearch.value.slice(1);
  const findCountry = allCountries.filter((c,i) => c.name.common.includes(editUserSearchValue));
  if(findCountry.length === 0 ){
    container.textContent = "";
    notFindCountry.classList.remove('hidden');
  }else{
    notFindCountry.classList.add('hidden');
  }
  container.textContent = "";
  // goBack.classList.remove("hidden");
    console.log(findCountry);
  findCountry.forEach((c,i) => createCard(c));
  if (userSearchValue === "") {
    // console.log('fatiiiiiiiiiiiiiiiiiiiiiiiii');
    notFindCountry.classList.add('hidden');
    countryDataInScreen = [];
    // getCountrysFromRegion("asia");
    // goBack.classList.add("hidden");
  }
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
  if (e.target.textContent === "Name") {
    let sortName = countryDataInScreen.sort((a, b) => {
      if (a.name.common > b.name.common) return 1;
      if (b.name.common > a.name.common) return -1;
    });
    container.innerHTML = "";
    countryDataInScreen = [];
    sortName.forEach(i =>createCard(i));
  }
  if (e.target.textContent === "Population") {
    let sortPopulation = countryDataInScreen.sort(
      (a, b) => b.population - a.population
    );
    container.innerHTML = "";
    countryDataInScreen = [];
   sortPopulation.forEach(i =>createCard(i));
  }
  if (e.target.textContent === "Area") {
    let sortArea = countryDataInScreen.sort((a, b) => b.area - a.area);
    container.innerHTML = "";
    countryDataInScreen = [];
    sortArea.forEach(i =>createCard(i));
  }
});

//light and dark
function handeleLightAndDark(event) {
  document.querySelector("html").classList.toggle("dark-mode");
  console.log(event.target.dataset.mood);
  if(event.target.dataset.mood === 'moon'){
      moonBtn.src = 'img/sun.png';
      moonBtn.setAttribute('data-mood','sun');
      return;
  }
 if(event.target.dataset.mood === 'sun'){
  console.log('fahhhh');
  moonBtn.src = 'img/moon.png';
  moonBtn.setAttribute('data-mood','moon');
 }
};

// page details
function renderDetailsCountry(event) {
  const findCountry =
    event.target.closest(".getchild").children[1].children[0].innerHTML;
  const editFindCountry = findCountry[0].toLowerCase() + findCountry.slice(1);
  container.innerHTML = "";
  userAccess.classList.add("hidden");
  container.style.paddingTop = "4rem";
  userSearch.value = "";
  getOneCountry(editFindCountry);
}
//go to home
function goToHome() {
  container.innerHTML = "";
  goBack.classList.add("hidden");
  container.style.paddingTop = "0.5rem";
  userAccess.classList.remove("hidden");
 countryDataInScreen.forEach(i => createCard(i));
}
