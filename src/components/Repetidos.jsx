import "../index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import FormFiguritas from "./FormFiguritas";

const Repetidos = ({ auth }) => {
  const [pokemons, setPokemon] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  /*
  useEffect(() => {
    let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        json.results.forEach((el) => {
          fetch(el.url)
            .then((res) => res.json())
            .then((json) => {
              let pokemon = {
                id: json.id,
                name: json.name,
                sprites: json.sprites.front_default,
                height: json.height,
                weight: json.weight,
                ability: json.abilities[0].ability.name,
                type: json.types[0].type.name,
              };

              setPokemon((pokemons) => [...pokemons, pokemon]);
            });
        });
      });
  }, []);*/
  /*
  useEffect(() => {
    const getPokemons = async (url) => {
      let res = await fetch(url),
        json = await res.json();
      //console.log(json);

      json.results.forEach(async (el) => {
        let res = await fetch(el.url),
          json = await res.json();
        console.log(json);

        let pokemon = {
          id: json.id,
          name: json.name,
          sprites: json.sprites.front_default,
          height: json.height,
          weight: json.weight,
          ability: json.abilities[0].ability.name,
          type: json.types[0].type.name,
        };

        setPokemon((pokemons) => [...pokemons, pokemon]);
      });
    };

    getPokemons("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
  }, []);
*/

  /*
  useEffect(() => {
    const getPokemons = async (url) => {
      let res = await fetch(url),
        json = await res.json();
      console.log(json);
      let pokemon = {};
      json.results.forEach(async (el) => {
        for (let i = 0; i < lista.length; i++) {
          if (el.name === lista[i]) {
            let res = await fetch(el.url),
              json = await res.json();
            console.log(json);

            pokemon = {
              id: json.id,
              name: json.name,
              sprites: json.sprites.front_default,
              height: json.height,
              weight: json.weight,
              ability: json.abilities[0].ability.name,
              type: json.types[0].type.name,
            };
          }
        }

        setPokemon((pokemons) => [...pokemons, pokemon]);
      });
    };

    getPokemons("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
  }, []);
*/
  /*
  useEffect(() => {
    let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        json.results.forEach((el) => {
          for (let i = 0; i < lista.length; i++) {
            if (el.name === lista[i]) {
              fetch(el.url)
                .then((res) => res.json())
                .then((json) => {
                  let pokemon = {
                    id: json.id,
                    name: json.name,
                    sprites: json.sprites.front_default,
                    height: json.height,
                    weight: json.weight,
                    ability: json.abilities[0].ability.name,
                    type: json.types[0].type.name,
                  };

                  setPokemon((pokemons) => [...pokemons, pokemon]);
                });
            }
          }
        });
      });
  }, []);
*/
  let lista = [];

  if (auth) {
    lista = ["ditto", "bulbasaur", "pikachu", "blastoise", "snorlax"];
  } else {
    lista = [];
  }

  //const lista = ["ditto", "bulbasaur", "pikachu", "blastoise"];
  //const lista = ["ditto", "bulbasaur", "pikachu"];
  //const lista = ["ditto", "bulbasaur"];
  //const lista = ["ditto"];
  //const lista = [];
  useEffect(() => {
    let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        json.results.forEach((el) => {
          for (let i = 0; i < lista.length; i++) {
            if (el.name === lista[i]) {
              fetch(el.url)
                .then((res) => res.json())
                .then((json) => {
                  let pokemon = {
                    id: json.id,
                    name: json.name,
                    sprites: json.sprites.front_default,
                    height: json.height,
                    weight: json.weight,
                    ability: json.abilities[0].ability.name,
                    type: json.types[0].type.name,
                  };

                  setPokemon((pokemons) => [...pokemons, pokemon]);
                });
            }
          }
        });
        switch (lista.length) {
          case 0:
            for (let l = 0; l < 4; l++) {
              let pokemon = {
                id: 0,
                name: "desconocido",
                sprites:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/201.png",
                height: " - ",
                weight: " - ",
                ability: "desconocido",
                type: "desconocido",
              };

              setPokemon((pokemons) => [...pokemons, pokemon]);
            }
            break;
          case 1:
            for (let l = 0; l < 3; l++) {
              let pokemon = {
                id: 0,
                name: "desconocido",
                sprites:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/201.png",
                height: "-",
                weight: "-",
                ability: "desconocido",
                type: "desconocido",
              };

              setPokemon((pokemons) => [...pokemons, pokemon]);
            }
            break;
          case 2:
            for (let l = 0; l < 2; l++) {
              let pokemon = {
                id: 0,
                name: "desconocido",
                sprites:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/201.png",
                height: "-",
                weight: "-",
                ability: "desconocido",
                type: "desconocido",
              };

              setPokemon((pokemons) => [...pokemons, pokemon]);
            }
            break;
          case 3:
            for (let l = 0; l < 1; l++) {
              let pokemon = {
                id: 0,
                name: "desconocido",
                sprites:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/201.png",
                height: "-",
                weight: "-",
                ability: "desconocido",
                type: "desconocido",
              };

              setPokemon((pokemons) => [...pokemons, pokemon]);
            }
            break;

          default:
            break;
        }
      });
  }, []);

  return (
    <>
      <h2>Figuritas de Pokemon</h2>
      <Slider {...settings}>
        {pokemons.length === 0 ? (
          <h3>Cargando....</h3>
        ) : (
          pokemons.map((el) => (
            <FormFiguritas
              key={el.id}
              name={el.name}
              sprites={el.sprites}
              id={el.id}
              height={el.height}
              weight={el.weight}
              ability={el.ability}
              type={el.type}
            />
          ))
        )}
      </Slider>
    </>
  );
};

export default Repetidos;
