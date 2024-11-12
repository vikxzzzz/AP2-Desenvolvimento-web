const urlAll = "https://botafogo-atletas.mange.li/2024-1/all";
const urlMasc = "https://botafogo-atletas.mange.li/2024-1/masculino";
const urlFem = "https://botafogo-atletas.mange.li/2024-1/feminino";

const container = document.getElementById("container");

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = "sans-serif";
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes;
    cartao.appendChild(descri);

    cartao.dataset.id = atleta.id;
    cartao.dataset.altura = atleta.altura;

    return cartao;
};

const acessarCard = () => {
    const all = document.getElementById('botaoall');
    const fem = document.getElementById('botaofem');
    const masc = document.getElementById('botaomasc');


    all.onclick = () => {
        container.innerHTML = ''; 
        pega_json(`${urlAll}`).then(
            (r) => {
                r.forEach(
                    (ele) => container.appendChild(montaCard(ele))
                );
            }
        )
    };

    fem.onclick = () => {
        container.innerHTML = ''; 
        pega_json(`${urlFem}`).then(
            (r) => {
                r.forEach(
                    (ele) => container.appendChild(montaCard(ele))
                );
            }
        )
    };

    masc.onclick = () => {
        container.innerHTML = ''; 
        pega_json(`${urlMasc}`).then(
            (r) => {
                r.forEach(
                    (ele) => container.appendChild(montaCard(ele))
                );
            }
        )
    };
};

acessarCard();
