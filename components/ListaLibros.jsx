import React from "react";
import imperio_final from "../assets/el_imperio_final.jpg";
import nombre_del_viento from "../assets/el_nombre_del_viento.jpg";
import senor_anillos from "../assets/el_senor_de_los_anillos.jpg";
import Image from "next/image"; // Importamos el componente Image de Next.js ayuda a optimizar las imágenes
import Link from "next/link";

const libros = [
  {
    id: 1,
    titulo: "El señor de los anillos",
    autor: "J.R.R. Tolkien",
    editorial: "Minotauro",
    fecha: "1954",
    genero: "Fantasía",
    img: senor_anillos,
  },
  {
    id: 2,
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    editorial: "Plaza & Janés",
    fecha: "2007",
    genero: "Fantasía",
    img: nombre_del_viento,
  },
  {
    id: 3,
    titulo: "El imperio final",
    autor: "Brandon Sanderson",
    editorial: "Nova",
    fecha: "2006",
    genero: "Fantasía",
    img: imperio_final,
  },
];

const ListaLibros = () => {
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
      href={`/libros/${libro.id}`}
    >
      <Image src={libro.img} alt="Libro" width={200} height={300} />
      <p className="font-bold">Título: {libro.titulo}</p>
      <p className="font-bold">Autor: {libro.autor}</p>

      <p className="font-bold">Género: {libro.genero}</p>
    </Link>
  );
};
