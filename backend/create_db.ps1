# Script de PowerShell para crear una base de datos PostgreSQL
# Uso: Ejecuta este script en PowerShell con los datos de tu usuario y base de datos

param(
    [string]$dbName = "mini_registro_db",
    [string]$dbUser = "postgres",
    [string]$dbHost = "localhost",
    [int]$dbPort = 5432
)

Write-Host "Creando base de datos '$dbName' en $dbHost:$dbPort con el usuario '$dbUser'..."

$env:PGPASSWORD = Read-Host -Prompt "Introduce la contraseña de PostgreSQL para el usuario $dbUser"

$createDbCmd = "createdb -h $dbHost -p $dbPort -U $dbUser $dbName"

try {
    iex $createDbCmd
    Write-Host "Base de datos '$dbName' creada exitosamente."
} catch {
    Write-Host "Error al crear la base de datos: $_"
}
