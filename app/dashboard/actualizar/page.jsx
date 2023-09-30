"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const ActualizarPage = () => {
  const [libros, setLibros] = React.useState([]); // Estado para guardar los libros
  const [selectedLibro, setSelectedLibro] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [imgInput, setImgInput] = React.useState("");
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
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Libro actualizado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
          setModal(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el libro",
            showConfirmButton: true,
          });
        }
      });
  };

  useEffect(() => {
    ObtenerLibros();
  }, []);
  const librosFiltrados = libros.filter((libro) => {
    //busca los libros que coincidan con el texto ingresado en el input

    return (
      libro.titulo.toLowerCase().includes(search.toLowerCase()) ||
      libro.autor.toLowerCase().includes(search.toLowerCase()) ||
      libro.ISBN.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    console.log(selectedLibro);
    if (selectedLibro) {
      document.getElementById("titulo").value = selectedLibro.titulo;
      document.getElementById("autor").value = selectedLibro.autor;
      document.getElementById("ISBN").value = selectedLibro.ISBN;
      document.getElementById("precio").value = selectedLibro.precio;
      document.getElementById("img").value = selectedLibro.img;
      setImgInput(selectedLibro.img);
    }
  }, [selectedLibro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
    actualizarLibro(value);
  };

  const handleClose = () => {
    setModal(false);
    setSelectedLibro(null);
  };
  return (
    <div className="flex flex-col   h-screen mt-8">
      <h1 className="text-lg text-center text-gray-950 font-bold">
        Actualizar
      </h1>
      <div className="flex justify-center gap-5 flex-wrap">
        <div className="flex flex-col   h-screen mt-8">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Buscar"
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Libro_id</th>
                <th className="px-4 py-2">Titulo</th>
                <th className="px-4 py-2">Autor</th>
              </tr>
            </thead>
            <tbody>
              {librosFiltrados.map((libro) => (
                <LibroTd
                  libro={libro}
                  setSelectedLibro={setSelectedLibro}
                  setModal={setModal}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div
          id="modal"
          className="fixed top-0 left-0  w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
          style={{ display: modal ? "flex" : "none" }}
        >
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="relative flex flex-col  bg-slate-100 p-4 rounded-lg shadow-lg w-1/2"
          >
            <span
              id="close"
              className="absolute top-0 right-0 m-2 text-xl font-bold cursor-pointer"
              onClick={() => setModal(false)}
            >
              X
            </span>
            <label htmlFor="name">Titulo</label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              className="border border-gray-300 p-1 rounded-md"
            />
            <label htmlFor="name">Autor</label>
            <input
              type="text"
              name="autor"
              id="autor"
              className="border border-gray-300 p-1 rounded-md"
            />
            <label htmlFor="name">ISBN</label>
            <input
              type="text"
              name="ISBN"
              id="ISBN"
              className="border border-gray-300 p-1 rounded-md"
            />
            <label htmlFor="name">Precio</label>
            <input
              type="text"
              name="precio"
              id="precio"
              className="border border-gray-300 p-1 rounded-md"
            />
            <label htmlFor="name">img</label>
            <input
              type="text"
              name="img"
              id="img"
              className="border border-gray-300 p-1 rounded-md"
              onChange={(e) => setImgInput(e.target.value)}
            />
            <div className="flex flex-row gap-4 justify-center">
              <img src={imgInput} className="w-36" />
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <button
                onClick={() => handleClose()}
                type="button"
                className="bg-red-500 w-fit p-1 mt-4 rounded-sm text-white px-4"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="bg-blue-500 w-fit p-1 mt-4 rounded-sm text-white px-4"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPage;
const LibroTd = ({ libro, setSelectedLibro, setModal }) => {
  const handleClick = () => {
    setSelectedLibro(libro);
    setModal(true);
  };
  return (
    <tr
      onClick={() => handleClick()}
      className="cursor-pointer hover:bg-gray-200"
    >
      <td className="border px-4 py-2">{libro.libro_id}</td>
      <td className="border px-4 py-2">{libro.titulo}</td>
      <td className="border px-4 py-2">{libro.autor}</td>
    </tr>
  );
};
