import { useState } from "react";
import { dataDigitalBestSeller } from "../data";
import Slider from "react-slick";
import "../index.css";

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const FormFiguritas = ({
  id,
  name,
  sprites,
  height,
  weight,
  type,
  ability,
}) => {
  if (!name || !sprites || !height || !weight || !type || !ability) return null;

  return (
    <div className="principal">
      <div className="card">
        <div className="card-top category">
          <img src={sprites} alt={name} />
          <h1>
            {id} - {capitalizarPrimeraLetra(name)}
          </h1>
        </div>
        <div className="card-bottom-1 category">
          <p className="sombreado">PESO:</p>
          <p className="descripcion">{weight}kg</p>
          <p className="sombreado">ALTURA:</p>
          <p className="descripcion">{height}m</p>
        </div>
        <div className="card-bottom-2">
          <p className="sombreado">HABILIDAD</p>
          <p className="sombreado">TIPO</p>
          <p className="descripcion">{capitalizarPrimeraLetra(ability)}</p>
          <p className="descripcion">{capitalizarPrimeraLetra(type)}</p>
        </div>
      </div>
    </div>
  );
};

export default FormFiguritas;
