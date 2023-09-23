import Link from "next/link";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col">
      <nav className="flex items-center justify-center w-full gap-5 mt-5">
        <Link href="/dashboard/insertar" className="link">
          Insertar
        </Link>
        <Link href="/dashboard/actualizar" className="link">
          Actualizar
        </Link>
        <Link href="/dashboard/eliminar" className="link">
          Eliminar
        </Link>
        <Link href="/dashboard/consultar" className="link">
          Consultar
        </Link>
      </nav>
      {children}
    </div>
  );
}

export default DashboardLayout;
