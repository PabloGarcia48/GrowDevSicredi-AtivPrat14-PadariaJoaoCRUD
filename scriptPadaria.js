const pedidos = [
  {
    nomeCliente: "Andrei",
    endereco: "Herval",
    total: 50,
    dia: 20231122,
    lista: [
      {
        id: "01",
        nome: "Pão A",
        quantidade: 10,
        preco: 30,
      },
      {
        id: "02",
        nome: "Pão C",
        quantidade: 5,
        preco: 20,
      },
    ],
  },
  {
    nomeCliente: "Andrei2",
    endereco: "Herval",
    total: 35,
    dia: 20231120,
    lista: [
      {
        id: "01",
        nome: "Pão A",
        quantidade: 5,
        preco: 15,
      },
      {
        id: "02",
        nome: "Pão C",
        quantidade: 5,
        preco: 20,
      },
    ],
  }
] 

const produtos = [
  {
    id: "01",
    nome: "Pão A",
    estoque: 30,
    preco: 3,
  },
  {
    id: "02",
    nome: "Pão C",
    estoque: 30,
    preco: 4,
  },
  {
    id: "03",
    nome: "Pão B",
    estoque: 30,
    preco: 5,
  },
];

let menuInicialOpção = true
menuInicial ()

// Menu Inicial

function menuInicial (){
while (menuInicialOpção == true) {
  escolhaMenuInicial = Number(
    prompt(
      "Bem vindo ao Sistema da Padaria João: \n Digite:\n1 - Se você for o João! \n2 - Se você for cliente do João!\n3 - Sair do sistema")
  );
  switch (escolhaMenuInicial) {
    case 1:
      menuGestão();
      break;
    case 2:
      menuCliente();
      break;
    case 3:
      menuInicialOpção = false;;
      break;
}}}



// Menu Gestão

function menuGestão () {
  escolha = Number(
    prompt(
        `Bem vindo ao Sistema João: \nEscolha uma das opções para interagir com o sistema:\n1 - Listar todos produtos\n2 - Cadastrar produtos\n3 - Editar produto \n4 - Remover um produto\n5 - Listar pedidos\n6 - Somar valor estoque\n7 - Relatório diário\n8 - Voltar\n`)
  );
  switch (escolha) {
    case 1:
      listarGestão();
      break;
    case 2:
      cadastrar();
      break;
    case 3:
      editar();
      break;
    case 4:
      remover();
      break;
    case 5:
      listarPedidos();
      break;
    case 6:
      somarValorEstoque();
      break;
    case 7:
      relatorioDiario();
      break;
    case 8:
      menuInicial();
      break;
  }
}

// Menu Cliente

function menuCliente (){
  escolhaCliente = Number(
    prompt(
        `Bem vindo ao Sistema Pedido da Padaria do João: \nEscolha uma das opções para interagir com o sistema:\n1 - Listar Produtos\n2 - Fazer pedido\n3 - Voltar\n`)
  );
  switch (escolhaCliente) {
    case 1:
      listarCliente();
      break;
    case 2:
      criarPedido();
      break;
    case 3:
      menuInicial();;
      break;
    }
}


// Cadastrar produto

function cadastrar() {
  const nome = prompt("Digite o nome do produto").toUpperCase();
  const estoque = prompt("Digite o estoque disponivel do produto").toUpperCase();
  const preco = prompt("Digite o preço do produto").toUpperCase();


  const produto = {
    id: Math.floor(Math.random() * 1000) + 1,
    nome,
    estoque,
    preco,
  };
  produtos.push(produto);
}

// Listar produtos Gestão
function listarGestão() {
  let listaProdutos = ''
  produtos.forEach((produto) => {
  listaProdutos += `ID: ${produto.id} | Nome: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${(produto.preco).toFixed(2)}\n`
  })
  alert(listaProdutos)
  menuGestão()
}

// Editar produtos
function editar() {
  listar(produtos);
  let idEdição = prompt("Digite o ID do produto: ")
  if (produtos.some((idE) => idE.id === idEdição)) {
    let produtoId = produtos.findIndex((idE) => idE.id == idEdição);
    let novoEstoque = Number(prompt("Digite o novo estoque: "))
    if(novoEstoque > 0){
    produtos[produtoId].nome = prompt("Digite a novo nome: ");
    produtos[produtoId].preco = Number(prompt("Digite o novo preço: "));
    produtos[produtoId].estoque = novoEstoque
  } else {
    alert("Estoque inválido");
  }
  } else {
    alert("Produto, não encontrado.");
  }
 menuGestão()
}

// Excluir Produto
function remover() {
  listar(produtos);
  let idExcluir = Number(prompt("Digite o ID do produto: "));
  if (produtos.some((idE) => idE.id == idExcluir)) {
    let indexParaRemover = produtos.findIndex((idE) => idE.id == idExcluir);
    produtos.splice(indexParaRemover, 1);
    alert("Produto removido");
  } else {
    alert("Produto, não encontrado.");
  }
  menuGestão ()
}

// Listar pedidos
function listarPedidos() {
  let listaPedidos = ''
 pedidos.forEach((pedido) => {
  listaPedidos += `Nome: ${pedido.nomeCliente} | Endereço: ${pedido.endereco} | Total: ${pedido.total}\nProdutos:\n${JSON.stringify(pedido.lista)}\n\n`
  })
  alert(listaPedidos)
  menuGestão()
}

// Somar Valor Estoque

function somarValorEstoque(){
  let soma = 0
  for (let indexSoma = 0; indexSoma < produtos.length; indexSoma++) {
    soma += (produtos[indexSoma].preco* produtos[indexSoma].estoque)
  }
  alert(`Valor do estoque R$${soma.toFixed(2)}`)
  menuGestão ()
}

// Relatório Diarios

function relatorioDiario(){
  const periodoInicial = Number(prompt("Digite o inicio do periodo\nDigite em fomato americano\n Ex:(20231120)"))
  const periodoFinal = Number(prompt("Digite o final do periodo\nDigite em fomato americano\n Ex:(20231120)"))
  let soma = 0
  for (let indexFiltro = 0; indexFiltro < pedidos.length; indexFiltro++) {
    if( periodoInicial <= pedidos[indexFiltro].dia && pedidos[indexFiltro].dia >= periodoFinal ) {
      soma += pedidos[indexFiltro].total
    }
  }
  console.log(soma)
  alert(`Valor do total do faturado entre o periodo ${periodoInicial} á ${periodoFinal} é R$${soma.toFixed(2)}`)
  menuGestão ()
}


// Opções Clientes
// Listar produtos Cliente
function listarCliente() {
  let listaProdutos = ''
  produtos.forEach((produto) => {
  listaProdutos += `ID: ${produto.id} | Nome: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${(produto.preco).toFixed(2)}\n`
  })
  alert(listaProdutos)
  menuCliente()
}

// Listar produtos Cliente Compra
function listarClienteCompra() {
  let listaProdutos = ''
  produtos.forEach((produto) => {
  listaProdutos += `ID: ${produto.id} | Nome: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${(produto.preco).toFixed(2)}\n`
  })
  alert(listaProdutos)
}

// Criação de pedido

function criarPedido() {
  const nomeCliente = prompt("Digite o seu nome")
  const endereco = prompt("Digite o seu endeço de entrega")
  const dia = Number(prompt("Digite o dia da entrega\nDigite em fomato americano\n Ex:(20231120)"))
  listarClienteCompra(produtos);
  let continuarCompra = true;
  const pedido = {
    nomeCliente,
    endereco,
    dia,
    total: 0,
    lista:[{}]
  };
  pedidos.push(pedido);
  let total = 0
  while (continuarCompra){
  let idCadastroProduto = Number(prompt("Digite o ID do produto: "));
  if (produtos.some((idCP) => idCP.id == idCadastroProduto)) {
    let indexParaAcrescentar = produtos.findIndex((idCP) => idCP.id == idCadastroProduto);
    const quantidade = Number(prompt("Digite a quantidade que você quer comprar"))
    if(quantidade < produtos[indexParaAcrescentar].estoque) {produtos[indexParaAcrescentar].estoque = produtos[indexParaAcrescentar].estoque - quantidade} else{alert("Quantidade indisponivel.")
    menuCliente() }
    const iten = {
    id:produtos[indexParaAcrescentar].id,
    nome:produtos[indexParaAcrescentar].nome,
    quantidade: quantidade,
    preco: (quantidade * (produtos[indexParaAcrescentar].preco)),
  }
    const posição = pedidos.length - 1
    total = (quantidade * (produtos[indexParaAcrescentar].preco)) + total
    pedidos[posição].lista.push(iten)
    alert("Produto acrescentado");
    continuarCompra = confirm('Deseja incluir mais algum item no pedido?')
  } else {
    alert("Produto, não encontrado.");
    continuarCompra = confirm('Deseja incluir mais algum item no pedido?')
  }}
  console.log(total)
  const posição2 = pedidos.length - 1
  pedidos[posição2].total = total
  alert("Pedido, finalizado.")
  menuCliente()
}
  
  document.write(JSON.stringify(produtos))
  document.write(JSON.stringify(pedidos))