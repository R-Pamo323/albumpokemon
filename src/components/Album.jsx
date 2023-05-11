import { useState } from "react";
import "../index.css";
import { helpHttp } from "../helpers/helpHttp";
import { useEffect } from "react";
import Loader from "./Loader";

const Album = () => {
  const [pokemons, setPokemon] = useState([]);
  const [loader, setLoader] = useState(false);

  let api = helpHttp();
  let urlPokemonsBD = "http://localhost:5000/pokemons";

  const [db, setDb] = useState(null);
  let lista = ["ditto", "bulbasaur", "pikachu", "blastoise"];

  useEffect(() => {
    setLoader(true);
    api.get(urlPokemonsBD).then((res) => {
      if (!res.err) {
        setDb(res);
      } else {
        setDb([]);
      }
      setLoader(false);
    });
  }, []);

  //Lo que vas a probar es crear otro useffect donde digamos que pokemons no salga hasta que se llene y ahi es donde llenaremos toda la bd para que salga con imagnees

  return (
    <section className="album-pagina">
      {loader && <Loader />}
      {db && (
        <div className="figurita">
          <img src={require("../img/Figuritas.png")} alt={"prueba"} />
          <div className="intro">
            <h1>{db[0].name}</h1>
            <p>
              {db[0].name} adsad asd asd ad asd as das das dsa das das das das
              dsa dasd sad a
            </p>
          </div>
        </div>
      )}
      <div className="figurita">2</div>
      <div className="figurita"></div>
      <div className="figurita">4</div>
      <div className="figurita">5</div>
      <div className="figurita">6</div>
      <div className="figurita">7</div>
      <div className="figurita">8</div>
      <div className="figurita">9</div>
      <div className="figurita">10</div>
      <div className="figurita">11</div>
      <div className="figurita">12</div>
    </section>
  );
};

export default Album;
