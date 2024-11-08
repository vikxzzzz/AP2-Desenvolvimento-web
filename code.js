
const correctPasswordHash = CryptoJS.SHA256("senha123").toString();

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const passwordInput = document.getElementById("password").value;
  const passwordHash = CryptoJS.SHA256(passwordInput).toString();

  if (passwordHash === correctPasswordHash) {

    localStorage.setItem("authorized", "true");
    alert("Login bem-sucedido!");
    window.location.href = "detalhes.html"; 
  } else {
    alert("Senha incorreta!");
  }
});
function checkAuthorization() {
  if (localStorage.getItem("authorized") !== "true") {
    alert("Acesso negado! Por favor, faça login.");
    window.location.href = "detalhes.html"; 
  }
}
