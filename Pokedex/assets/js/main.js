
// Vamos fazer uma função que recebe um objeto "pokemon" como entrada e retorna uma string HTML formatada (vai converter as informações de um Pokémon em uma lista (LI) em Html)
function convertPokemonToLi(pokemon) {

  /* aqui teremos o pokemon detalhado acrescentando a numeração na Class Number e detalhes do pokemon na Class Type, e vamos sincronizar as imagens com os respectivos pokemons  */
  return `
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

/* indo no meu HTML, pegando a lista de pokemons e atribuindo a uma variavel */
const pokemonList = document.getElementById("pokemonList");

  // convertendo a lista de 10 pokemons (objetos) em uma lista de 10 pokemons HTML e se não vim nenhum pokemon virá uma lista vazia
  pokeApi.getPokemons().then((pokemons = []) => {

    // converte a lista de pokemons em uma lista de LI e junta toda lista de LI sem separador
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML = newHtml
}) 
