let login = document.getElementById("login");
login.setAttribute("style","font-weight : 600");

//Recup du formulaire
let form = document.querySelector("form");
let inputMail = document.getElementById("email");
let inputPassword = document.getElementById("password")

//Recup span pour les messages d'erreur
let errorMail=document.getElementById("errorMail");
let errorPassword=document.getElementById("errorPassword");
let errorLogin=document.getElementById("errorLogin");

//Création RegExp 
let regexMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]+");
let regexPassword =new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){6,}");

//Evénement lorsque l'utilisateur écrit
form.addEventListener("input", VerifyId )

//Evénement lors du clique sur bouton "Se connecter"
form.addEventListener("submit", (event) => {
   event.preventDefault(); //neutralise rechargement de la page
   LogIn() //Appel a la fonction de connection
 });

function VerifyId(){
   if (regexMail.test(inputMail.value)){
      errorMail.innerHTML=""
   }
   else {
      errorMail.innerHTML="<br> Email non valide"
   };
   if (regexPassword.test(inputPassword.value)){
      errorPassword.innerHTML=""
   }
   else {
      errorPassword.innerHTML="<br> Mot de passe non valide"
   }
 }

function LogIn (){
   const id = {
      email : inputMail.value,
      password : inputPassword.value
   };

   const chargeUtile = JSON.stringify(id);
   fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
   })
      .then((res) => {
         if (res.status === 200){
            //connection ok on recup le token
            let data=res.json();
            let token = data.token;
            window.localStorage.setItem("token",token) //stock token dans localStorage
            window.location.href="index.html" //Retour sur la page d'accueil
      
         }
         else {
            //connection pas ok
            errorLogin.innerHTML="<br> Email ou mot de passe incorrect";
         }
         })
 }