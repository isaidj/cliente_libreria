"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

const ActualizarPage = () => {
  const [libros, setLibros] = React.useState([]); // Estado para guardar los libros
  const [selectedLibro, setSelectedLibro] = React.useState(null);
  const insertLibro = async (libro) => {
    const url = "http://localhost:3001/insertarLibro";
    axios.post(url, libro).then((res) => {
      console.log(res.data);
    });
  };

  const ObtenerLibros = async () => {
    //esta funcion es asincrona y obtiene los libros de la api
    axios.get("http://localhost:3001/libros").then((res) => {
      console.log(res.data);
      setLibros(res.data);
    });
  };
  const actualizarLibro = async (libro) => {
    const url = "http://localhost:3001/actualizarLibro";
    console.log(libro);
    axios
      .post(url, {
        libro_id: selectedLibro.libro_id,
        titulo: libro.titulo,
        autor: libro.autor,
        ISBN: libro.ISBN,
        precio: libro.precio,
        img: libro.img,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    ObtenerLibros();
  }, []);

  useEffect(() => {
    console.log(selectedLibro);
    if (selectedLibro) {
      document.getElementById("titulo").value = selectedLibro.titulo;
      document.getElementById("autor").value = selectedLibro.autor;
      document.getElementById("ISBN").value = selectedLibro.ISBN;
      document.getElementById("precio").value = selectedLibro.precio;
      document.getElementById("img").value = selectedLibro.img;
    }
  }, [selectedLibro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
    actualizarLibro(value);
  };
  return (
    <div className="flex flex-col   h-screen mt-8">
      <h1 className="text-4xl text-center text-blue-500">Actualizar</h1>
      <div className="flex justify-center gap-5 flex-wrap">
        <div className="flex flex-col   h-screen mt-8">
          {libros.map((libro) => (
            <Libro
              key={libro.id}
              libro={libro}
              setSelectedLibro={setSelectedLibro}
            />
          ))}
        </div>

        <div className="flex flex-col items-center  h-screen mt-8">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col  bg-slate-100 p-4 rounded-lg shadow-lg"
          >
            <label htmlFor="name">Titulo</label>
            <input type="text" name="titulo" id="titulo" />
            <label htmlFor="name">Autor</label>
            <input type="text" name="autor" id="autor" />
            <label htmlFor="name">ISBN</label>
            <input type="text" name="ISBN" id="ISBN" />
            <label htmlFor="name">Precio</label>
            <input type="text" name="precio" id="precio" />
            <label htmlFor="name">img</label>
            <input type="text" name="img" id="img" />
            <button
              type="submit"
              className="bg-blue-500 w-full p-2 mt-4 rounded-sm"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPage;
const Libro = ({ libro, setSelectedLibro }) => {
  return (
    <div
      className="bg-gray-200 p-5 flex gap-2 hover:bg-sky-500 cursor-pointer"
      onClick={() => setSelectedLibro(libro)}
    >
      <h1 className="text-2xl font-bold">{libro.libro_id}</h1>
      <p className="font-bold">Título: {libro.titulo}</p>
    </div>
  );
};
