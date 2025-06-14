import { useState } from "react";
import ListaUsuarios from "../components/ListaUsuarios";
import "../styles/Home.css"; // Asegúrate de tener un archivo CSS para estilos

function Home() {
    const [Trigger, setTrigger] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.nombre ||
            !form.email ||
            !form.password
        ) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    full_name: form.nombre,
                    email: form.email,
                    password: form.password,
                })
            })
            if (response.status == 400) {
                alert("Error en el registro. Por favor, verifica los datos ingresados.");
                setLoading(false);
                return;
            }
            if (response.status == 409) {
                alert("El email ya está registrado. Por favor, utiliza otro email.");
                setLoading(false);
                return;
            }
            if (response.status == 500) {
                alert("Error del servidor. Por favor, inténtalo más tarde.");
                setLoading(false);
                return;
            }
            if (response.status == 201) {
                alert("Registro exitoso. Bienvenido!");
                setForm({
                    nombre: "",
                    apellido: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setTrigger((prev)=> !prev); 
                setLoading(false);
                return;
            }
        } catch (error) {
            alert("Ocurrió un error al enviar el formulario. Por favor, inténtalo más tarde.", error);
            setLoading(false);
        }
        // manejo el envío del formulario
        console.log("Formulario enviado:", form);
    };

    return (
        <>
        <div className="bg">
            <form onSubmit={handleSubmit} >
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    minLength={8}
                    required
                />
                <button type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrar"}</button>
            </form>
            <div>
                <ListaUsuarios Trigger={Trigger} />
            </div>
        </div>
        </>
    );
}

export default Home;