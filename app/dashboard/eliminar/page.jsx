"use client";
import axios from "axios";
import React from "react";

const EliminarPage = () => {
  const eliminarLibro = async (libro_id) => {
    const url = "http://localhost:3001/eliminarLibro";
    axios.post(url, libro_id).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        alert("Libro eliminado");
      } else {
        alert("Error al eliminar el libro");
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
    eliminarLibro(value);
  };
  return (
    <div className="flex flex-col items-center  h-screen mt-8">
      <h1 className="text-4xl text-center text-blue-500">Eliminar</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-1/2 bg-slate-100 p-4 rounded-lg shadow-lg"
      >
        <h3>Ingrese el id del libro que desea eliminar</h3>
        <label htmlFor="name">Id</label>
        <input type="number" name="libro_id" id="libro_id" />
        <button
          type="submit"
          className="bg-blue-500 w-full p-2 mt-4 rounded-sm"
        >
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default EliminarPage;
