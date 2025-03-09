var rodada = 1
var clip = []

function gerarChaves(jogadores){

  //console.log(jogadores)

  if(jogadores.length<8){
    alert('Não há players o suficiente para gerar chaves.')
  } else {
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
    // console.log(lobbys)

    clip = lobbys.slice()
    console.log(clip)

    var chaves = document.getElementById('chaves')

    if(numL == 1){
      chaves.innerHTML +=
      `<div>
      <h2>Rodada Final</h2>
      ${lobbys.map((lobby, idL) => 
      `<ul>
      ${lobby.map((l, num = 0) => `<li id="${rodada}.toString() ${(idL).toString() + (num++).toString()}" onclick="addJogador('${l}', '${rodada}.toString() ${(idL).toString() + (num-1).toString()}')">${l}</li>`).join('')}
      </ul>`).join('')}

      <button onclick="finalizarTorneio(jogadores)">Finalizar</button>
      <button onclick="copiarRodada()">Copiar</button>
      </div>
      ` 

      jogadores = []
      rodada++

    } else {
      chaves.innerHTML +=
      `<div>
      <h2>Rodada ${rodada}</h2>
      ${lobbys.map((lobby, idL) => 
      `<ul>
      <h3>Lobby ${idL+1}</h3>
      ${lobby.map((l, num = 0) => `<li id="${rodada}.toString() ${(idL).toString() + (num++).toString()}" onclick="addJogador('${l}', '${rodada}.toString() ${(idL).toString() + (num-1).toString()}')">${l}</li>`).join('')}
      </ul>`).join('')}

      <button onclick="gerarChaves(jogadores)">Gerar Chaves</button>
      <button onclick="copiarRodada()">Copiar</button>
      </div>
      ` 

      jogadores = []
      rodada++
    }

    
  }
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

function embaralhar(lista) {
  let indice = lista.length;
  while(indice) {
    const indiceAleatorio = Math.floor(Math.random() * indice--);
    [lista[indice], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice]];
  }
}

function copiarRodada(){
  navigator.clipboard.writeText(
    `# Rodada ${rodada-1}\n${clip.map((lobby,numL) => `## Lobby ${numL+1}\n${lobby.map((l) => `${l}\n`).join('')}`).join('')}`
  )
}