
/* Indo no meu HTML, pegando a lista de pokemons e atribuindo a uma variavel */
const pokemonList = document.getElementById("pokemonList");

// Botão que será usado para carregar mais Pokémon na página quando clicado.
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 251 // Definindo o limite máximo de registros de Pokémon que deseja exibir na Pokedex
const limit = 10 // Definindo o número de Pokémon que será carregado de cada vez 
let offset = 0; // Controla a posição a partir da qual os Pokémon serão carregados. Nesse caso começará a carregar Pokémon a partir do primeiro.

// converte os dados de um Pokémon em uma representação HTML que pode ser inserida na lista de Pokémon da Pokedex. Ela cria um item de lista (<li>) para cada Pokémon com seu número, nome, tipos e imagem.
function convertPokemonToLi(pokemon) {

    /* aqui teremos o pokemon detalhado acrescentando a numeração na Class Number e detalhes do pokemon na Class Type, e vamos sincronizar as imagens com os respectivos pokemons  */
    return `
        <button id="${pokemon.number}" class='pokemon-card'>
          <li class="pokemon ${pokemon.type}">            
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>
            
                      
              <div class="detail">
                  <ol class="types">
                     ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join('')}
                  </ol>
  
                  <img src="${pokemon.photo}" alt="${pokemon.name}">
                      
              </div>  
          </li>
      `;
  }

 // Esta função é responsável por carregar os Pokémon na Pokedex. Ela utiliza a função pokeApi.getPokemons para obter uma lista de Pokémon com base no offset e limit fornecidos.
function loadPokemonItens (offset, limit) {
    // convertendo a lista de 10 pokemons (objetos) em uma lista de 10 pokemons HTML e se não vim nenhum pokemon virá uma lista vazia
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // converte a lista de pokemons em uma lista de LI e junta toda lista de LI sem separador
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml /* Ao invés de converter vai concatenar. */
    }) 
}

// Responsável por carregar os Pokémon iniciais na Pokedex quando a página é carregada.
loadPokemonItens (offset, limit)

// Adiciona um ouvinte de evento de clique ao botão com o ID "loadMoreButton". Quando o botão é clicado, a função anônima dentro dos parênteses { ... } é executada.
loadMoreButton.addEventListener('click', () => {
    offset += limit //  Incrementa o valor da variável offset pelo valor de limit. Isso move a posição de carregamento para a próxima página de Pokémon.

    // Calcula a quantidade total de registros que serão carregados na próxima página somando o offset atual e o limit.
    const qtdRecordsWithNexPage = offset + limit

    // Este bloco if verifica se a quantidade total de registros que serão carregados na próxima página (qtdRecordsWithNexPage) é maior ou igual ao número máximo de registros permitidos (maxRecords).
    if (qtdRecordsWithNexPage >= maxRecords) {
        // Se a qnt total de registro for maior ou igual ao número máximo de resgitros, vai ser calculado um novo valor para o limit que garante que não ultrapasse o permitido.
        const newLimit = maxRecords - offset
        // Se a condição do if for verdadeira, esta linha chama a função loadPokemonItens com o novo offset e newLimit calculados, carregando a última página de Pokémon.
        loadPokemonItens(offset, newLimit)

        // Se a condição do if for verdadeira, esta linha remove o botão porque todos os Pokémon já foram carregados.
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

    
})