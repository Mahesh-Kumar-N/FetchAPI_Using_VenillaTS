interface Episode {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: Object;
  name: string;
  origin: Object;
  species: string;
  status: string;
  type: string;
  url: string;
}

let output: Episode[] = [];
let lengthOfEpisode: number;
let lengthOfCharacter: number;

fetch('https://rickandmortyapi.com/api/episode')
  .then((response) => response.json())
  .then((data) => {
    if (data.results) {
      lengthOfEpisode = data.results.length - 1;
      output = [...data.results];
      data.results.forEach((episode: Episode, episodeIndex: number) => {
        if (episode.characters) {
          lengthOfCharacter = episode.characters.length - 1;
          episode.characters.map(
            (character: string, characterIndex: number) => {
              fetchCharacter(character, episodeIndex, characterIndex);
            }
          );
        }
      });
    }
  });

function fetchCharacter(
  character: string,
  episodeIndex: number,
  characterIndex: number
): void {
  (async () => {
    const response = await fetch(character);
    const data1 = await response.json();
    output[episodeIndex].characters[characterIndex] = data1;
    if (
      lengthOfEpisode === episodeIndex &&
      lengthOfCharacter === characterIndex
    ) {
      console.log(output);
    }
  })();
}
