import { useState } from "react";
import "../index.css";
import { helpHttp } from "../helpers/helpHttp";
import { useEffect } from "react";
import Loader from "./Loader";
import FigAlbum from "./FigAlbum";
import FigVacias from "./FigVacias";

const Album = () => {
  const [pokemons, setPokemon] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pegarPoke, setPegarPoke] = useState(false);
  const [ordenarPoke, setOrdenarPoke] = useState(false);
  const [poke, setPoke] = useState([]);
  const [btnPegarFiguras, setBtnPegarFiguras] = useState(true);

  //Pruebas de Figuras vacias
  const [figVacias, setFigVacias] = useState([]);

  let api = helpHttp();
  let urlPokemonsBD = "http://localhost:5000/pokemons";

  const [db, setDb] = useState(null);
  let lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  //encontrar la forma de que recorrar el array de pokemons, porque no lo esta haciendo

  useEffect(() => {
    setLoader(true);
    api.get(urlPokemonsBD).then((res) => {
      if (!res.err) {
        setDb(res);
      } else {
        setDb([]);
      }
      setLoader(false);
      setPegarPoke(true);
    });
  }, []);

  useEffect(() => {
    if (db != null) {
      for (let i = 0; i < db.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${db[i].id}`;
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            //console.log(json);
            for (let y = 0; y <= 12; y++) {
              if (json.id === y) {
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
              }
            }
          });
      }
      setOrdenarPoke(true);
    }
  }, [pegarPoke]);

  useEffect(() => {
    for (let i = 1; i <= lista.length; i++) {
      let figuritasVacias = {
        id: i,
      };
      setFigVacias((figVacias) => [...figVacias, figuritasVacias]);
    }
  }, []);

  const pegarFiguras = (e) => {
    let variable;
    for (let y = 1; y <= 12; y++) {
      variable = false;
      //console.log("adios");
      for (let z = 0; z < pokemons.length; z++) {
        //console.log("aadasdadaddios");
        if (pokemons[z].id === y) {
          let pokes = {
            id: pokemons[z].id,
            name: pokemons[z].name,
            sprites: pokemons[z].sprites,
            height: pokemons[z].height,
            weight: pokemons[z].weight,
            ability: pokemons[z].ability,
            type: pokemons[z].type,
          };
          setPoke((poke) => [...poke, pokes]);
          variable = true;
        }
      }
      if (variable === false) {
        let pokes = {
          id: y,
          name: "Desconocido",
          sprites:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/201.png",
          height: "-",
          weight: "-",
          ability: "-",
          type: "-",
        };
        setPoke((poke) => [...poke, pokes]);
      }
    }
    setBtnPegarFiguras(false);
  };

  return (
    <>
      <input
        type="submit"
        value="Pegar Figuras"
        onClick={pegarFiguras}
        disabled={!btnPegarFiguras}
      />
      {loader && <Loader />}
      <section className="album-pagina">
        {btnPegarFiguras === true
          ? figVacias.map((el) => <FigVacias id={el.id} />)
          : poke.map((el) => (
              <FigAlbum
                key={el.id}
                name={el.name}
                sprites={el.sprites}
                id={el.id}
                height={el.height}
                weight={el.weight}
                ability={el.ability}
                type={el.type}
              />
            ))}
      </section>
    </>
  );
};

export default Album;
