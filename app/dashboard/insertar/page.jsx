"use client";
import axios from "axios";
import React from "react";

const InsertarPage = () => {
  const insertLibro = async (libro) => {
    const url = "http://localhost:3001/insertarLibro";
    axios.post(url, libro).then((res) => {
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
    insertLibro(value);
  };
  return (
    <div className="flex flex-col items-center  h-screen mt-8">
      <h1 className="text-4xl text-center text-blue-500">Insertar</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-1/2 bg-slate-100 p-4 rounded-lg shadow-lg"
      >
        <label htmlFor="name">Titulo</label>
        <input type="text" name="titulo" id="titulo" />
        <label htmlFor="name">Autor</label>
        <input type="text" name="autor" id="autor" />
        <label htmlFor="name">ISBN</label>
        <input type="text" name="isbn" id="isbn" />
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
  );
};

export default InsertarPage;
