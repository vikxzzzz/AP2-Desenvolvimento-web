//Verificação de senha na página de login
const Login = () => {
  const senha = document.getElementById('senha').value;
  if (hex_md5(senha) === "10044e5fd1a8702a6fb1f172f10f0371"){
    sessionStorage.setItem('logado', 'sim');
    window.location.href = "detalhes.html"
  } else{
    alert('Senha incorreta!')
  }
}

document.getElementById("botao").onclick = Login;

//Função de logout, retirando da sessionStorage

document.getElementById("logout").onclick = () => {
  sessionStorage.removeItem("logado");
}