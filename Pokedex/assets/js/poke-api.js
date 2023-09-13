// Contém métodos para interagir com a PokeAPI e obter detalhes sobre Pokémon

const pokeApi = {};

// Convertemos o modelo do PokeApiDetail para o nosso modelo de pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon(); // Criando uma instância de um objeto "Pokemon"
  pokemon.number = pokeDetail.order; // Define o número do Pokémon com base no valor da propriedade order do pokeDetail.
  pokemon.name = pokeDetail.name; // Define o nome do Pokémon com base no valor da propriedade name do pokeDetail.

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name); // cria uma variável types que contém uma lista de tipos de Pokémon. Esses tipos são extraidos do objeto pokeDetail por meio da função map.
  const [type] = types; // Está atribuindo o primeiro elemento do array types à variável type.

  pokemon.types = types; // conterá a lista completa com todos os tipos do Pokémon, não apenas o primeiro.
  pokemon.type = type; // Define a propriedade type com o primeiro tipo encontrado, Isso significa que conterá apenas o primeiro tipo do Pokémon.

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default; // Define a propriedade photo com o URL da imagem do Pokémon.

  return pokemon;
}

// Este método recebe um objeto pokemon que contém informações sobre um Pokémon e faz uma solicitação para a PokeAPI para obter detalhes adicionais desse Pokémon.
pokeApi.getPokemonDetail = (pokemon) => {
  // utiliza a função fetch para fazer uma solicitação GET da url do pokemon que quero acessar convertendo a response para um json
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon); //  transformar os detalhes em um objeto Pokemon.
};

// Adicionando um metodo usando o Arrow function e Definindo o limite de conteudo nas pagina e a paginação
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url) // buscamos a lista de pokemons
    .then((response) => response.json()) // convertemos essa lista pra json
    .then((jsonBody) => jsonBody.results) // depois de convertido pegamos a lista que tava nesse json que são nossos pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // estamos mapeando essa lista de pokemons em uma lista de requisição de detalhe dos pokemons
    .then((detailRequests) => Promise.all(detailRequests)) // Nossa lista de promessas, onde esperamos que todas as solicitações de detalhes sejam resolvidas
    .then((pokemonsDetails) => pokemonsDetails); // quando a lista terminar, ela vai vim aqui uma lista completa de detalhes dos pokemons
};
