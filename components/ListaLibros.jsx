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
  const [libroSeleccionado, setLibroSeleccionado] = React.useState(null);
  const obtenerLibros = async () => {
    //esta funcion es asincrona y obtiene los libros de la api

    axios.get("http://localhost:3001/libros").then((res) => {
      console.log(res.data);
      setlibros(res.data);
      setLibroSeleccionado(res.data[0]);
    });
  };

  //una vez que se renderiza el componente se ejecuta la funcion obtenerLibros en el useEffect
  useEffect(() => {
    obtenerLibros();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg  text-gray-950 font-bold">Libros pincipales</h1>
      <div className="flex ">
        <div
          className=" flex flex-col items-center justify-evenly w-80 h-auto  0 rounded-md overflow-hidden "
          style={{ border: "1px solid #e2e8f0" }}
        >
          {libroSeleccionado && (
            <>
              <div className="relative w-full h-auto flex flex-col items-center justify-center">
                <img
                  src={libroSeleccionado.img}
                  alt="Libro"
                  // width={100}
                  // height={200}
                  className="rounded-md w-36 inset-0  z-10"
                />
                <img
                  src={libroSeleccionado.img}
                  alt="Libro"
                  // width={100}
                  // height={200}
                  className="absolute bottom-0 right-0   w-full h-full z-0 blur-xl object-fill"
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs  text-slate-500">
                  {libroSeleccionado.autor}
                </p>
                <p
                  className="text-xs font-bold"
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {libroSeleccionado.titulo}
                </p>
                <p className="font-bold">ISBN: {libroSeleccionado.isbn}</p>
                <p className="font-bold">Precio: {libroSeleccionado.precio}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row gap-4 flex-wrap">
          {libros.map((libro) => (
            <Libro
              key={libro.id}
              libro={libro}
              setLibroSeleccionado={setLibroSeleccionado}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaLibros;

const Libro = ({ libro, setLibroSeleccionado }) => {
  const onHover = () => {
    setLibroSeleccionado(libro);
    const img = document.getElementById(libro.img);
    img.style.transform = "scale(1.05)";
    img.style.transition = "transform 0.2s ease-in-out";
  };
  return (
    <Link
      className="relative flex flex-col items-center justify-end w-40  mb-4"
      href={`/libros/${libro.libro_id}`}
      id={libro.libro_id}
      onMouseOver={onHover}
      onMouseOut={() => {
        const img = document.getElementById(libro.img);
        img.style.transform = "scale(1)";
      }}
    >
      <img
        src={libro.img}
        alt="Libro"
        width={100}
        height={200}
        id={libro.img}
        className="rounded-md h-fit shadow-xl mb-2 "
      />

      <p className="text-xs  text-slate-500">{libro.autor}</p>
      <p className="text-xs font-bold whitespace-nowrap">{libro.titulo}</p>

      {/* <p className="font-bold">Precio: {libro.precio}</p> */}
    </Link>
  );
};
