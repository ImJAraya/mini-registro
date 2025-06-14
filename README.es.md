# Mini Registro

Aplicación web fullstack: React.js para el frontend y Python/Flask para el backend API.

## Características principales
- Registro y listado de usuarios.
- Backend con Flask y SQLAlchemy (PostgreSQL recomendado).
- Frontend con React.js (Vite).
- Uso de archivo `.env` para configuración.
- Encriptación de contraseñas.

## Instalación y uso

### 1. Backend
1. Ve a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Crea el archivo `.env` a partir del ejemplo:
   ```bash
   copy .env.example .env
   # o en Linux/Mac: cp .env.example .env
   ```
4. Configura tu base de datos en `.env` (ejemplo para PostgreSQL):
   ```env
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/tu_db
   ```
5. Inicia el backend:
   ```bash
   python app.py
   ```

### 2. Frontend
1. Ve a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el frontend:
   ```bash
   npm run dev
   ```

## Notas
- El backend corre por defecto en `http://localhost:5000`.
- El frontend corre por defecto en `http://localhost:5173`.
- No subas tu archivo `.env` real al repositorio, usa `.env.example` como plantilla.

## Recursos útiles
- Documentación Flask: https://flask.palletsprojects.com/
- Documentación React: https://react.dev/
- Documentación SQLAlchemy: https://docs.sqlalchemy.org/
