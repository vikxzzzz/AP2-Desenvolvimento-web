const Login = () => {
  const senha = document.getElementById('senha').value;
  if (hex_sha256(senha) === "ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1"){
    sessionStorage.setItem('logado', 'sim');
    window.location.href = "elencos.html"
  } else{
    alert('Senha incorreta! Tente novamente');
  }
}

document.getElementById("botao").onclick = Login;


