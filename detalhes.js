const urlAll = "https://botafogo-atletas.mange.li/2024-1/all";
const urlMasc = "https://botafogo-atletas.mange.li/2024-1/masculino";
const urlFem = "https://botafogo-atletas.mange.li/2024-1/feminino";

const container = document.getElementById("container");
const pesquisaInput = document.getElementById('filtrar-jogadores');

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const saibaMais = document.createElement("p");

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = "sans-serif";
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    saibaMais.innerHTML = "Clique no card para saber mais";
    cartao.appendChild(saibaMais);

    cartao.dataset.id = atleta.id;

    cartao.onclick = () => {
        window.location.href = `card.html?id=${atleta.id}`;
    };

    return cartao;
};


const botaoLogout = () => {
    const logout = document.getElementById("logout-detalhes");
    if (logout) {
        logout.onclick = () => {
            sessionStorage.removeItem("logado");
            window.location.href = "index.html";
        };
    }
};

const barraPesquisa = (jogadores) => {
    pesquisaInput.addEventListener("input", (e) => {
        const valorInput = e.target.value.toLowerCase();
        const atletasFiltrados = jogadores.filter((atleta) =>
            atleta.nome.toLowerCase().includes(valorInput)
        );
        container.innerHTML = '';
        atletasFiltrados.forEach((ele) => container.appendChild(montaCard(ele)));
    });
};


const acessarCard = () => {
    botaoLogout();

    const all = document.getElementById('botaoall');
    const fem = document.getElementById('botaofem');
    const masc = document.getElementById('botaomasc');

    if (all) {
        all.onclick = () => {
            container.innerHTML = '';
            pega_json(urlAll).then((jogadores) => {
                jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
                barraPesquisa(jogadores); 
            });
        };
    }

    if (fem) {
        fem.onclick = () => {
            container.innerHTML = '';
            pega_json(urlFem).then((jogadores) => {
                jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
                barraPesquisa(jogadores); 
            });
        };
    }

    if (masc) {
        masc.onclick = () => {
            container.innerHTML = '';
            pega_json(urlMasc).then((jogadores) => {
                jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
                barraPesquisa(jogadores);
            });
        };
    }
};

document.addEventListener("DOMContentLoaded", () => {
    acessarCard();
});
