import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";
const Inicio = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const ObtenerClientesApi = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClientes(resultado);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    ObtenerClientesApi();
  }, []);
  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Estas seguro de eliminar este cliente?");
    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        await respuesta.json();
        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }

    console.log("Eliminando...", id);
  };
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
