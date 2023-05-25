import { useState } from "react";
import "../index.css";
import { helpHttp } from "../helpers/helpHttp";
import { useEffect } from "react";
import Loader from "./Loader";
import FigAlbum from "./FigAlbum";
import FigVacias from "./FigVacias";

import Poke1 from "../wallpapers/Poke1.jpg";
import Poke2 from "../wallpapers/Poke2.jpg";
import Poke3 from "../wallpapers/Poke3.jpg";
import Poke4 from "../wallpapers/Poke4.jpg";
import Poke5 from "../wallpapers/Poke5.jpg";
import Poke6 from "../wallpapers/Poke6.jpg";
import Poke7 from "../wallpapers/Poke7.jpg";
import Poke8 from "../wallpapers/Poke8.jpg";
import Poke9 from "../wallpapers/Poke9.jpg";
import Poke10 from "../wallpapers/Poke10.jpg";
import Poke11 from "../wallpapers/Poke11.jpg";
import Poke12 from "../wallpapers/Poke12.jpg";
import Poke13 from "../wallpapers/Poke13.jpg";

const Album = () => {
  const [pokemons, setPokemon] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pegarPoke, setPegarPoke] = useState(false);
  //const [ordenarPoke, setOrdenarPoke] = useState(false);
  const [poke, setPoke] = useState([]);
  const [btnPegarFiguras, setBtnPegarFiguras] = useState(true);
  const [numPagina, setNumPagina] = useState(1);
  const [btnSigPagina, setBtnSigPagina] = useState(true);
  const [btnAntPagina, setBtnAntPagina] = useState(false);

  //Imagenes
  const [fondo, setFondo] = useState(Poke1);
  //Pruebas de Figuras vacias
  const [figVacias, setFigVacias] = useState([]);

  let api = helpHttp();
  let urlPokemonsBD = "http://localhost:5000/pokemons";

  const [db, setDb] = useState(null);

  let lista = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72],
    [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
    [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
    [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108],
    [109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
    [121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132],
    [133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144],
    [146, 147, 148, 149, 150, 151, 0, 0, 0, 0, 0, 151],
  ];

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
            console.log("Estoy entrando para ver si lee de nuevos los pkeoms");
            for (
              let y = lista[numPagina - 1][0];
              y <= lista[numPagina - 1][11];
              y++
            ) {
              console.log("estoy entrando");
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
      // setOrdenarPoke(true);
      console.log(pokemons);
    }
  }, [pegarPoke]);

  //aca tambien modificamos
  useEffect(() => {
    //for (let i = 1; i <= lista1.length; i++) {

    for (let i = lista[numPagina - 1][0]; i <= lista[numPagina - 1][11]; i++) {
      let figuritasVacias = {
        id: i,
      };
      setFigVacias((figVacias) => [...figVacias, figuritasVacias]);
    }
  }, [numPagina]);

  // aca modificaremos.
  const pegarFiguras = (e) => {
    let variable;
    //for (let y = 1; y <= 12; y++) {
    for (let y = lista[numPagina - 1][0]; y <= lista[numPagina - 1][11]; y++) {
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

  const sigPagina = (e) => {
    switch (numPagina) {
      case 1:
        setNumPagina(2);
        setBtnAntPagina(true);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke2);
        break;
      case 2:
        setNumPagina(3);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke3);
        break;
      case 3:
        setNumPagina(4);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke4);
        break;
      case 4:
        setNumPagina(5);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke5);
        break;
      case 5:
        setNumPagina(6);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke6);
        break;
      case 6:
        setNumPagina(7);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke7);
        break;
      case 7:
        setNumPagina(8);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke8);
        break;
      case 8:
        setNumPagina(9);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke9);
        break;
      case 9:
        setNumPagina(10);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke10);
        break;
      case 10:
        setNumPagina(11);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke11);
        break;
      case 11:
        setNumPagina(12);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke12);
        break;
      case 12:
        setNumPagina(13);
        setBtnPegarFiguras(true);
        setBtnSigPagina(false);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke13);
        break;
      default:
        break;
    }
  };
  const antPagina = (e) => {
    switch (numPagina) {
      case 2:
        setNumPagina(1);
        setBtnAntPagina(false);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke1);
        break;
      case 3:
        setNumPagina(2);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke2);
        break;
      case 4:
        setNumPagina(3);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke3);
        break;
      case 5:
        setNumPagina(4);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke4);
        break;
      case 6:
        setNumPagina(5);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke5);
        break;
      case 7:
        setNumPagina(6);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke6);
        break;
      case 8:
        setNumPagina(7);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke7);
        break;
      case 9:
        setNumPagina(8);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke8);
        break;
      case 10:
        setNumPagina(9);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke9);
        break;
      case 11:
        setNumPagina(10);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke10);
        break;
      case 12:
        setNumPagina(11);
        setBtnPegarFiguras(true);
        setPegarPoke(true);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke11);
        break;
      case 13:
        setNumPagina(12);
        setBtnSigPagina(true);
        setBtnPegarFiguras(true);
        setPegarPoke(false);
        setPokemon([]);
        setFigVacias([]);
        setPoke([]);
        setFondo(Poke12);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <input
        type="submit"
        value="Pegar Figuras"
        onClick={pegarFiguras}
        disabled={!btnPegarFiguras}
      />
      <input
        type="submit"
        value="Siguiente Pag"
        onClick={sigPagina}
        disabled={!btnSigPagina}
      />
      <input
        type="submit"
        value="Anterior Pag"
        onClick={antPagina}
        disabled={!btnAntPagina}
      />

      {loader && <Loader />}
      <section
        className="album-pagina"
        style={{ backgroundImage: `url(${fondo})` }}
      >
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
