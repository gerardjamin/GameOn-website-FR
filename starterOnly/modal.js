/*managment menu*/
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*efface le contenu d'un champs*/
function effacerChamp() {
  document.getElementById("birthdate").value = "";
}

/**
 * const elements
 */
const btnMessage = document.querySelectorAll(".closeBtnMessage");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
/*initialisation du tableau qui enregistre les erreurs des champs*/
const recordError = [];
for (let i = 0; i < 7; i++) {
  recordError[i] = "";
}
/*initialisation du tableau qui enregistre le resultat des validations des champs*/
let validationItem = [];
for (let j = 0; j < 7; j++) {
  validationItem[j] = false;
}

const messageError = [
  "#1:Entrer au moins 2 caractères.",
  "#2:Entrer au moins 2 caractères.",
  "#3:L'adresse email n'est pas valide.",
  "#4:La réponse est obligatoire.",
  "#5:Veuillez entrer une date valide.",
  "#6:Vous devez choisir une option.",
  "#7:Vous devez acceptez les conditions d'utilisation.",
];

/**
 * close message box
 */
btnMessage.forEach((btn) => btn.addEventListener("click", closeMessage));
function closeMessage() {
  location.reload();
  modalbg.style.display = "none"; //Onclick
}

/**
 * launch modal open
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  initModal();
  modalbg.style.display = "block"; //Onclick
}

/**
 * issue #1: fermeture de la modal via Btn(X)
 */
modalClose.addEventListener("click", closeModal);
function closeModal() {
  location.reload();
  modalbg.style.display = "none"; //Onclick
}

/**
 * fonction which init content modal
 */
function initModal() {
  let baliseNom = document.forms.reserve.last;
  baliseNom.value = "";

  let balisePrenom = document.getElementById("first");
  balisePrenom.value = "";

  let baliseEmail = document.getElementById("email");
  baliseEmail.value = "";

  let baliseQuantity = document.getElementById("quantity");
  baliseQuantity.value = "";

  let listeBtnRadio = document.getElementsByName("location");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].checked = false;
  }

  let conditionUtilisation = document.getElementById("checkbox1");
  conditionUtilisation.checked = false;
}

/**
 * La fonction affiche un message pour indiquer au joueur que son inscription à été faite
 * [0] indique le premier element de la collection form
 * @returns null
 */
function sendMessage() {
  /*On garde seulement l'espace occupé par le formulaire*/
  let form = document.getElementsByName("reserve")[0];
  form.style.display = "none";
  let div = document.getElementById("message");
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.justifyContent = "start";
  div.style.alignItems = "center";
  div.style.gap = "255px";
  return null;
}

//issue #2 and #3: implemented error message validation form
/**
 * Le champ Prénom a un minimum de 2 caractères / n'est pas vide et sans chiffres.
 * @param {*} nom
 * @returns false or true
 */
function validerNom(nom) {
  let longueur = false;

  const regex = /^[A-Za-z][a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/;
  const estValide = regex.test(nom);
  if (nom.length > 1) {
    longueur = true;
  }

  let resultat = longueur && estValide;
  if (!resultat) {
    recordError[0] = messageError[0];
  } else {
    recordError[0] = "";
    resultat = true;
  }
  return resultat;
}

/**
 * Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide et sans chiffres.
 * @param {*} prenom
 * @returns false or true
 */
function validerPrenom(prenom) {
  let longueur = false;
  const regex = /^[A-Za-z][a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/;
  const estValide = regex.test(prenom);
  if (prenom.length > 1) {
    longueur = true;
  }

  let resultat = longueur && estValide;

  if (!resultat) {
    recordError[1] = messageError[1];
  } else {
    resultat = true;
    recordError[1] = "";
  }
  return resultat;
}

/**
 * L'adresse électronique dois etre valide.
 * @param {*} email
 * @returns false or true
 */
function validerEmail(email) {
  let valid = false;
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    recordError[2] = messageError[2];
  } else {
    valid = true;
    recordError[2] = "";
  }
  return valid;
}

/**
 * Pour le nombre de concours, une valeur numérique dois etre saisie obligatoirement.
 * @param {*} quantity
 * @returns false or true
 */
function validerQuantity(quantity) {
  let valid = false;
  if (quantity === "") {
    recordError[3] = messageError[3];
  } else {
    valid = true;
    recordError[3] = "";
  }
  return valid;
}

/**
 * La date de naissance dois etre valide et inférieure à la date du jour.
 * @param {*} birthday
 * @returns false or true
 */
function validerBirthday(birthday) {
  let valid = true;
  const dateAujourdhui = new Date();
  const timestamp = dateAujourdhui.getTime();
  /*conversion de birthday en objet date*/
  const birthdayObj = new Date(birthday);

  if (birthdayObj > dateAujourdhui || isNaN(birthdayObj)) {
    valid = false;
    recordError[4] = messageError[4];
  } else {
    valid = true;
    recordError[4] = "";
  }
  return valid;
}

/**
 * cette fonction retourne true si il y a au moins un bouton radio de coché
 * @param {*} listeBtnRadio
 * @returns false or true
 */
function validerButtonsRadio(listeBtnRadio) {
  let valid = false;

  for (let index = 0; index < listeBtnRadio.length; index++) {
    if (listeBtnRadio[index].checked) {
      valid = true;
      break; // Sortir de la boucle dès qu'un bouton radio est sélectionné
    }
  }
  if (!valid) {
    recordError[5] = messageError[5];
  } else {
    recordError[5] = "";
  }
  return valid;
}

/**
 * cette fonction valide le choix des conditions d'utilisations obligatoirement checkée
 * @param {*} conditionUtilisation
 * @returns false or true
 */
function validerButtonCondition(conditionUtilisation) {
  let valid = false;
  if (!conditionUtilisation.checked) {
    recordError[6] = messageError[6];
  } else {
    recordError[6] = "";
    valid = true;
  }
  return valid;
}

/**
 * cette fonction permet de valider l'envoie du formulaire lorsque tous les champs sont
 * remplis sans erreur et envoie un message de confirmation.
 *
 */
let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  //avoid re-load web page
  event.preventDefault();

  let balisePrenom = document.getElementById("first");
  let prenom = balisePrenom.value;
  validationItem[0] = validerPrenom(prenom);

  let baliseNom = document.getElementById("last");
  let nom = baliseNom.value;
  validationItem[1] = validerNom(nom);

  let baliseEmail = document.getElementById("email");
  let email = baliseEmail.value;
  validationItem[2] = validerEmail(email);

  let baliseBirthday = document.getElementById("birthdate");
  let birthdate = baliseBirthday.value;
  validationItem[3] = validerBirthday(birthdate);

  let baliseQuantity = document.getElementById("quantity");
  let quantity = baliseQuantity.value;
  validationItem[4] = validerQuantity(quantity);

  let listeBtnRadio = document.getElementsByName("location");
  validationItem[5] = validerButtonsRadio(listeBtnRadio);

  let conditionUtilisation = document.getElementById("checkbox1");
  validationItem[6] = validerButtonCondition(conditionUtilisation);

  // & logique entre toutes les variables boolean de validations
  const formValid = validationItem.every((element) => element === true);

  if (formValid) {
    //all field are correct
    //#4:envoie la confirmation de l'envoie
    sendMessage();
  } else {
    for (let j = 0; j < 7; j++) {
      afficherMessageError(
        recordError[j],
        validationItem[1],
        validationItem[0],
        validationItem[2],
        validationItem[4],
        validationItem[3],
        validationItem[5],
        validationItem[6]
      );
    }
  }
});

/**
 * cette fonction affiche le message d'erreur passé en paramètre
 * et selectionne l'element HTML parent(formData du champs en erreur).
 *
 * @param {string} message
 */
function afficherMessageError(
  message,
  validName,
  validPrenom,
  validEmail,
  validQuantity,
  validBirthday,
  validButtonRadio,
  validBtnCondition
) {
  /*recupère le numero de l'erreur*/
  let firstTwoCaractere = message.substring(0, 2);

  if (firstTwoCaractere === "#1") {
    let errorNom = document.getElementById("errorNom");
    errorNom.setAttribute("data-error-visible", "true");
    /*recupère le message d'erreur seulement*/
    errorNom.setAttribute("data-error", message.substring(3));
  } else {
    if (validName === true) {
      errorNom.removeAttribute("data-error-visible");
      errorNom.removeAttribute("data-error");
    }
  }

  if (firstTwoCaractere === "#2") {
    let errorPrenom = document.getElementById("errorPrenom");
    errorPrenom.setAttribute("data-error-visible", "true");
    errorPrenom.setAttribute("data-error", message.substring(3));
  } else {
    if (validPrenom === true) {
      errorPrenom.removeAttribute("data-error-visible");
      errorPrenom.removeAttribute("data-error");
    }
  }

  if (firstTwoCaractere === "#3") {
    let errorEmail = document.getElementById("errorEmail");
    errorEmail.setAttribute("data-error-visible", "true");
    errorEmail.setAttribute("data-error", message.substring(3));
  } else {
    if (validEmail === true) {
      errorEmail.removeAttribute("data-error-visible");
      errorEmail.removeAttribute("data-error");
    }
  }

  if (firstTwoCaractere === "#4") {
    let errorQuantity = document.getElementById("errorQuantity");
    errorQuantity.setAttribute("data-error-visible", "true");
    errorQuantity.setAttribute("data-error", message.substring(3));
  } else {
    if (validQuantity === true) {
      errorQuantity.removeAttribute("data-error-visible");
      errorQuantity.removeAttribute("data-error");
    }
  }

  if (firstTwoCaractere === "#5") {
    let errorBirthday = document.getElementById("errorBirthday");
    errorBirthday.setAttribute("data-error-visible", "true");
    errorBirthday.setAttribute("data-error", message.substring(3));
  } else {
    if (validBirthday === true) {
      errorBirthday.removeAttribute("data-error-visible");
      errorBirthday.removeAttribute("data-error");
    }
  }

  if (firstTwoCaractere === "#6") {
    let errorButtonRadio = document.getElementById("errorButtonRadio");
    errorButtonRadio.setAttribute("data-error-visible", "true");
    errorButtonRadio.setAttribute("data-error", message.substring(3));
  } else {
    if (validButtonRadio === true) {
      errorButtonRadio.removeAttribute("data-error-visible");
      errorButtonRadio.removeAttribute("data-error");
    }
  }

  if (firstTwoCaractere === "#7") {
    let errorButtonCondition = document.getElementById("errorButtonCondition");
    errorButtonCondition.setAttribute("data-error-visible", "true");
    errorButtonCondition.setAttribute("data-error", message.substring(3));
  } else {
    if (validBtnCondition === true) {
      errorButtonCondition.removeAttribute("data-error-visible");
      errorButtonCondition.removeAttribute("data-error");
    }
  }
}

function validate() {
  //have to do
}
