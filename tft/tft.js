var rodada = 1

function gerarChaves(jogadores){

    embaralhar(jogadores)
    //console.log(jogadores)

    var lobbys = []

    var numL = Math.ceil(jogadores.length/8)

    //console.log(numL)

    for (let i = 0; i < numL; i++) {
      let lobby = []
      lobbys.push(lobby)
    }

    var i2 = 0

    while(jogadores.length != 0){
      lobbys[i2].push(jogadores.pop())

      if(i2==numL-1){
        i2 = 0
      } else {
        i2++
      }
    } 
    console.log(lobbys)

    var chaves = document.getElementById('chaves')

    chaves.innerHTML +=
      `<div>
      <h2>## Rodada ${rodada}</h2>
      ${lobbys.map((lobby, idL) => 
      `<ul>
      ${lobby.map((l, num = 0) => `<li id="${rodada}.toString() ${(idL).toString() + (num++).toString()}" onclick="addJogador('${l}', '${rodada}.toString() ${(idL).toString() + (num-1).toString()}')">${l}</li>`).join('')}
      </ul>`).join('')}

      <button onclick="gerarChaves(jogadores)">Gerar Chaves</button>
      </div>
      ` 

      jogadores = []
      rodada++
}

var inJogadores1 = document.getElementById('players')

var btnGerar = document.getElementById('btnGerar')
btnGerar.addEventListener('click', () => gerarChaves(inJogadores1.value.split(',')))

var jogadores = []

function addJogador(nome, id){
  jogadores.push(nome)
  console.log(jogadores, id)
  document.getElementById(id).classList.add('selecionado')
}

// testes

function embaralhar(lista) {
  let indice = lista.length;
  while(indice) {
    const indiceAleatorio = Math.floor(Math.random() * indice--);
    [lista[indice], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice]];
  }
}
