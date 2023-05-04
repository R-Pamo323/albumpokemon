import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import FormFiguritas from "./FormFiguritas";

let lista = ["ditto", "bulbasaur", "pikachu", "blastoise"];
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

function pokemonAleatorio() {
  let numAle = [];
  for (let i = 0; i < 4; i++) {
    numAle.push(Math.floor(Math.random() * (151 - 1) + 1));
  }
  return numAle;
}

const Comprar = () => {
  const [pokemons, setPokemon] = useState([]);
  const [comprar, setComprar] = useState(false);
  const [db, setDb] = useState(lista);

  useEffect(() => {
    let listaPoke = pokemonAleatorio();
    console.log(listaPoke);
    for (let i = 0; i < listaPoke.length; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${listaPoke[i]}`;
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
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
    }
  }, []);

  const handleGuardar = (e) => {
    e.preventDefault();
    let variable = [...db];
    for (let i = 0; i < pokemons.length; i++) {
      variable.push(pokemons[i].name);
    }
    setDb(variable);
    console.log(variable);
  };

  const comprarSobre = (e) => {
    e.preventDefault();
    setComprar(true);
  };

  return (
    <>
      <h1>Comprar</h1>
      <form onSubmit={comprarSobre}>
        <input type="submit" value="Comprar Sobre" />
        <input type="reset" value="Guardar Figuras" onClick={handleGuardar} />
      </form>
      <Slider {...settings}>
        {comprar === false ? (
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

export default Comprar;
