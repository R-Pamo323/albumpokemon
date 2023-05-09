import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import FormFiguritas from "./FormFiguritas";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";

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
  //que me de un pokemon aleatorio de los 150 primeros
  let numAle = [];
  for (let i = 0; i < 4; i++) {
    numAle.push(Math.floor(Math.random() * (151 - 1) + 1));
  }
  return numAle;
}

const ComprarBD = () => {
  const [pokemons, setPokemon] = useState([]);
  const [comprar, setComprar] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnActiveComprar, setActiveComprar] = useState(true);
  const [btnActiveGuardar, setActiveGuardar] = useState(false);
  //const [db, setDb] = useState(lista);

  let api = helpHttp();
  let urlPokemonsBD = "http://localhost:5000/pokemons";

  const [db, setDb] = useState([]);

  useEffect(() => {
    api.get(urlPokemonsBD).then((res) => {
      if (!res.err) {
        setDb(res);
      } else {
        setDb([]);
      }
    });
  }, []);

  const handleGuardar = (e) => {
    e.preventDefault();
    console.log(db);
    let variable = [];
    for (let i = 0; i < pokemons.length; i++) {
      variable.push({ id: pokemons[i].id, name: pokemons[i].name });
    }

    for (let y = 0; y < pokemons.length; y++) {
      let options = {
        body: variable[y],
        headers: { "content-type": "application/json" },
      };

      for (let z = 0; z < db.length; z++) {
        if (variable[y].id === db[z].id) {
          console.log("Ya existe");
        }
      }
      api.post(urlPokemonsBD, options).then((res) => {
        if (!res.err) {
          setDb([...db, res]);
        } else {
          setError(res);
        }
      });
    }
    setComprar(false);
    setPokemon([]);
    setActiveComprar(true);
    setActiveGuardar(false);
  };

  const comprarSobre = (e) => {
    e.preventDefault();
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
    console.log(pokemons);
    setComprar(true);
    setActiveComprar(false);
    setActiveGuardar(true);
  };

  return (
    <>
      <h1>Comprar</h1>
      <input
        type="submit"
        value="Comprar Sobre"
        onClick={comprarSobre}
        disabled={!btnActiveComprar}
      />
      <input
        type="reset"
        value="Guardar Figuras"
        onClick={handleGuardar}
        disabled={!btnActiveGuardar}
      />
      <Slider {...settings}>
        {comprar === false ? (
          <Loader />
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

export default ComprarBD;
