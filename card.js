const atletaDetalhes = document.getElementById("atletaDetalhes");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const urlDetalhes = `https://botafogo-atletas.mange.li/2024-1/${id}`;

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const exibeDetalhes = (atleta) => {
    const nome = document.createElement("h2");
    const imagem = document.createElement("img");
    const descricao = document.createElement("p");
    const altura = document.createElement("p");

    nome.innerHTML = atleta.nome;
    imagem.src = atleta.imagem;
    descricao.innerHTML = atleta.detalhes;
    altura.innerHTML = `Altura: ${atleta.altura} m`;

    atletaDetalhes.appendChild(nome);
    atletaDetalhes.appendChild(imagem);
    atletaDetalhes.appendChild(descricao);
    atletaDetalhes.appendChild(altura);
};

pega_json(urlDetalhes).then((atleta) => {
    exibeDetalhes(atleta);
});
