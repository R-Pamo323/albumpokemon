import "../index.css";

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const FigAlbum = ({ id, name, sprites, height, weight, type, ability }) => {
  if (!name || !sprites || !height || !weight || !type || !ability) return null;

  return (
    /*<div className="figurita">
      <img img src={sprites} alt={name} />
      <div className="intro">
        <h1>{capitalizarPrimeraLetra(name)}</h1>
        <p>
          {capitalizarPrimeraLetra(name)}, es un Pokemons de tipo:
          {capitalizarPrimeraLetra(type)} con su habilidad especial:
          {capitalizarPrimeraLetra(ability)}, tambien posee un peso de: {weight}{" "}
          y una altura de: {height}
        </p>
      </div>
    </div>*/
    <div className="figurita">
      <img src={sprites} alt={name} />
      <div className="card-body">
        <h1 className="card-title">{capitalizarPrimeraLetra(name)}</h1>
        <p className="card-sub-title">
          Peso: <b>{weight}kg</b> - Altura: <b>{height}cm</b>
        </p>
        <p className="card-info">
          Es el Pokémon número: <b>{id}</b> de la Pokédex, es de tipo:{" "}
          <b>{capitalizarPrimeraLetra(type)}</b> y su habilidad especial es:{" "}
          <b>{capitalizarPrimeraLetra(ability)}</b>.
        </p>
      </div>
    </div>
  );
};

export default FigAlbum;
