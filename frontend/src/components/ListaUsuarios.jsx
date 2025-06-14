import { useEffect, useState } from "react";
import "../styles/ListaUsuarios.css"; // Asegúrate de tener un archivo CSS para estilos

function ListaUsuarios({Trigger}) {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios");
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUsuarios();
    }, [Trigger]);

    return (
        <div>
            <h1>Lista de usuarios</h1>
            {usuarios.length > 0 ? (
                <ul>
                    {usuarios.map((usuario) => (
                        <li key={usuario.id}>
                            Nombre: {usuario.full_name} <br /> 
                            ID: {usuario.id} <br />  
                            Email: {usuario.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios registrados.</p>
            )}
            
        </div>
    );
}

export default ListaUsuarios;