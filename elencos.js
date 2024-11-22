const urlAll = "https://botafogo-atletas.mange.li/2024-1/all";
const urlMasc = "https://botafogo-atletas.mange.li/2024-1/masculino";
const urlFem = "https://botafogo-atletas.mange.li/2024-1/feminino";

const container = document.getElementById("container");
const pesquisaInput = document.getElementById('filtrar-jogadores');

const montaAguarde = () => {
    const carregandoJogadores = document.getElementById("carregando-msg");
    carregandoJogadores.style.display = "none";
    container.parentElement.insertBefore(carregandoJogadores, container);
    return carregandoJogadores;
};

const carregandoJogadores = montaAguarde();

const mostraCarregando = () => {
    carregandoJogadores.style.display = "block";
};

const escondeCarregando = () => {
    carregandoJogadores.style.display = "none";
};

const pega_json = async (caminho) => {
    try {
        mostraCarregando();
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        alert("Ocorreu um erro ao carregar os jogadores");
        console.log("Erro ao carregar os jogadores", error);
    } finally {
        escondeCarregando();
    }
};

zerarContainer = () => {
    container.innerHTML = '';
}

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
        if (sessionStorage.getItem("logado") === "sim") {
            window.location.href = `detalhes.html?id=${atleta.id}`;
        }else{
            alert("Faça login para ver os detalhes do atleta");
        }
    };

    return cartao;
};

const botaoLogout = () => {
    const logout = document.getElementById("logout-elencos");
    logout.onclick = () => {
        sessionStorage.removeItem("logado");
        window.location.href = "index.html";
    };
};

const barraPesquisa = (jogadores) => {
    pesquisaInput.addEventListener("input", (e) => {
        const valorInput = e.target.value.toLowerCase();
        const atletasFiltrados = jogadores.filter((atleta) =>
            atleta.nome.toLowerCase().includes(valorInput)
        );
        zerarContainer();
        atletasFiltrados.forEach((ele) => container.appendChild(montaCard(ele)));
    });
};

const elencoDropdown = () => {
    const dropdown = document.getElementById("elenco-dropdown");
    dropdown.addEventListener("change", () => {
        const selectedValue = dropdown.value;
        if (selectedValue === "all") {
            zerarContainer();
            pega_json(urlAll).then((jogadores) => {
                jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
                barraPesquisa(jogadores);
            });
        } else if (selectedValue === "masc") {
            zerarContainer();
            pega_json(urlMasc).then((jogadores) => {
                jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
                barraPesquisa(jogadores);
            });
        } else if (selectedValue === "fem") {
            zerarContainer();
            pega_json(urlFem).then((jogadores) => {
                jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
                barraPesquisa(jogadores);
            });
        }
    });
};

const acessarCard = () => {
    botaoLogout();
    elencoDropdown();

    const all = document.getElementById('botaoall');
    const fem = document.getElementById('botaofem');
    const masc = document.getElementById('botaomasc');

    all.onclick = () => {
        zerarContainer();
        pega_json(urlAll).then((jogadores) => {
            jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
            barraPesquisa(jogadores);
        });
    };

    fem.onclick = () => {
        zerarContainer();
        pega_json(urlFem).then((jogadores) => {
            jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
            barraPesquisa(jogadores);
        });
    };

    masc.onclick = () => {
        zerarContainer();
        pega_json(urlMasc).then((jogadores) => {
            jogadores.forEach((ele) => container.appendChild(montaCard(ele)));
            barraPesquisa(jogadores);
        });
    };
};

document.addEventListener("DOMContentLoaded", () => {
    acessarCard();
});