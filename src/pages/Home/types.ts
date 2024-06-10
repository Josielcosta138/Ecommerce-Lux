export interface IProduto {
    codigo: string,
    id : number,
    nome : string,
    categoria : string,
    tamanho : string,
    descricao : string,
    preco : number,
    enderecoImagem : string,
    imagemPequena : string,
}

export interface IBtnProduto { 
    btnProduto: boolean,
}