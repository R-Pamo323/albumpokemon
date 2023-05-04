import { Link } from "react-router-dom";
const Home = ({ auth, handleAuth }) => {
  return (
    <div className="container">
      <Link className="active" to="figuritas/">
        <img src={require("../img/Figuritas.png")} alt={"Figuritas"} />
      </Link>
      <Link className="active" to="album/">
        <img src={require("../img/albumPokemon.jpg")} alt={"Album"} />
      </Link>
      <Link className="active" to="quiosko/">
        <img src={require("../img/Quisoko.png")} alt={"Quiosko"} />
      </Link>
      <button onClick={handleAuth}>
        {auth ? "Cerrar Sesion" : "Iniciar Sesion"}
      </button>
    </div>
  );
};

export default Home;
