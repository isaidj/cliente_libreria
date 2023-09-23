"use client";
import React, { useEffect } from "react";
// import imperio_final from "../assets/el_imperio_final.jpg";
// import nombre_del_viento from "../assets/el_nombre_del_viento.jpg";
// import senor_anillos from "../assets/el_senor_de_los_anillos.jpg";
import Image from "next/image"; // Importamos el componente Image de Next.js ayuda a optimizar las imágenes
import Link from "next/link";
import axios from "axios";

const ListaLibros = () => {
  const [libros, setlibros] = React.useState([]); // Estado para guardar los libros
  const obtenerLibros = async () => {
    //esta funcion es asincrona y obtiene los libros de la api

    axios.get("http://localhost:3001/libros").then((res) => {
      console.log(res.data);
      setlibros(res.data);
    });
  };

  //una vez que se renderiza el componente se ejecuta la funcion obtenerLibros en el useEffect
  useEffect(() => {
    obtenerLibros();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center text-blue-500">Lista de libros</h1>
      <div className="flex justify-center gap-5 flex-wrap">
        {libros.map((libro) => (
          <Libro key={libro.id} libro={libro} />
        ))}
      </div>
    </div>
  );
};

export default ListaLibros;

const Libro = ({ libro }) => {
  return (
    <Link
      className="bg-gray-200 p-5 my-5 shadow-lg rounded flex flex-col items-center"
      href={`/libros/${libro.libro_id}`}
    >
      <img src={libro.img} alt="Libro" width={200} height={300} />
      <h1 className="text-2xl font-bold">{libro.libro_id}</h1>
      <p className="font-bold">Título: {libro.titulo}</p>
      <p className="font-bold">Autor: {libro.autor}</p>

      <p className="font-bold">Precio: {libro.precio}</p>
    </Link>
  );
};
