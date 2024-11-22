const atletaDetalhes = document.getElementById("atletaDetalhes");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const urlDetalhes = `https://botafogo-atletas.mange.li/2024-1/${id}`;

const pega_json = async (caminho) => {
    try{
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;

    } catch (error) {
        alert("Ocorreu um erro ao carregar os jogadores");
        console.log("Erro ao carregar os jogadores", error);
    }
};

const exibeDetalhes = (atleta) => {
    const nome = document.createElement("h2");
    const imagem = document.createElement("img");
    const descricao = document.createElement("p");
    const altura = document.createElement("p");
    const posicao = document.createElement("p");
    const nJogos = document.createElement("p");

    nome.innerHTML = atleta.nome;
    imagem.src = atleta.imagem;
    altura.innerHTML = `Altura: ${atleta.altura} m`;
    posicao.innerHTML = `Posição: ${atleta.posicao}`;
    nJogos.innerHTML = `Jogos: ${atleta.n_jogos}`;
    descricao.innerHTML = atleta.detalhes;

    atletaDetalhes.appendChild(nome);
    atletaDetalhes.appendChild(imagem);
    atletaDetalhes.appendChild(altura);
    atletaDetalhes.appendChild(posicao);
    atletaDetalhes.appendChild(nJogos);
    atletaDetalhes.appendChild(descricao);

};

pega_json(urlDetalhes).then((atleta) => {
    exibeDetalhes(atleta);
});


