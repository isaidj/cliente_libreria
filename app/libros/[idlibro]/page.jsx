"use client";
import React, { useEffect } from "react";
import axios from "axios";
const LibroPage = ({ params }) => {
  console.log(params);
  const [libro, setlibro] = React.useState(null); //null mientras no se obtenga el libro

  // const obtenerLibro = async () => {
  //   //Por medio query params
  //   axios
  //     .get("http://localhost:3001/libro?id=" + params.idlibro)
  //     .then((res) => {
  //       console.log(res.data);
  //       setlibro(res.data);
  //     });
  // };
  const obtenerLibroPorParametro = async () => {
    //Por medio de params
    axios
      .get("http://localhost:3001/libro", { params: { id: params.idlibro } })
      .then((res) => {
        console.log(res.data);
        setlibro(res.data[0]);
      });
  };
  useEffect(() => {
    // obtenerLibro();
    obtenerLibroPorParametro();
  }, []);
  return libro !== null ? ( //si libro es diferente de null se muestra el libro
    <div className="flex flex-col items-center justify-center mt-10">
      <img src={libro.img} alt={libro.titulo} width="300" height="500" />

      <p className="font-bold">Título: {libro.titulo}</p>
      <p className="font-bold">Autor: {libro.autor}</p>

      <div className="flex flex-row">
        <p className="font-bold">Precio: {libro.precio}</p>
      </div>
    </div>
  ) : (
    //si libro es igual a null se muestra cargando
    <div>
      <h1>Cargando...</h1>
    </div>
  );
};
export default LibroPage;
