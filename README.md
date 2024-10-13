# 📚 Proyecto de Titulación: Aprendizaje de Bases de Datos en React Native

Este proyecto fue desarrollado en conjunto por **[Sebastián](https://github.com/SebaGallegos)** y **[Nicolás](https://github.com/NikoMalek)**.
La aplicación tiene como objetivo facilitar el *aprendizaje interactivo de bases de datos* mediante la visualización de consultas en *álgebra relacional* y *cálculo relacional*, 
mostrando tanto los resultados en tablas como su equivalente en SQL.
Las consultas se generan utilizando expresiones regulares para extraer la consulta y transformarla en lenguaje SQL.

## 🚀 Funcionalidades Principales

- *Interprete de SQL con SQLite*: Interprete de SQL con SQLite: Los usuarios pueden ingresar, modificar y eliminar tablas en una base de datos SQLite integrada en la aplicación mediante comandos SQL (CREATE, UPDATE, DROP, etc.). 
- *Álgebra Relacional*: Interfaz dedicada para la construcción de consultas en álgebra relacional. Los usuarios pueden seleccionar símbolos y operadores del álgebra relacional desde un conjunto de botones, y ver el resultado tanto en formato de tabla como en su equivalente en SQL.
- *Cálculo Relacional*: Similar a la sección de álgebra relacional, esta pantalla permite la creación de consultas utilizando el cálculo relacional, con una visualización del resultado y su equivalente en SQL.

## 🛠️ Estructura de la Aplicación

### 1. Pantalla de Interprete SQL

Esta pantalla permite al usuario interactuar directamente con una base de datos SQLite. El usuario puede *ingresar* consultas SQL para *crear, modificar o eliminar tablas* y visualizar los resultados de sus operaciones en tiempo real.

<p align="center">
  <img src="https://github.com/user-attachments/assets/cee61713-162e-4e0a-8967-b37496445fcc" alt="Sql" width="250"/>
</p>

### 2. Pantalla de Álgebra Relacional

En esta sección, los usuarios pueden construir consultas en álgebra relacional utilizando una serie de botones que representan operadores comunes. La consulta se traduce automáticamente a SQL y se muestra el resultado en una tabla.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8cc14502-6183-4f4a-84b7-8256f86d3f09" alt="Sql" width="250"/>
</p>

### 3. Pantalla de Cálculo Relacional

Similar a la pantalla de álgebra relacional, pero enfocada en el cálculo relacional. Los usuarios ingresan sus consultas y la aplicación las convierte en SQL, mostrando el resultado en una tabla.

<p align="center">
  <img src="https://github.com/user-attachments/assets/f8917c52-e1ba-403b-8afa-0d2160450d84" alt="Sql" width="250"/>
</p>

## 🛠️ Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. *Clonar el repositorio*:
   ```bash
   git clone https://github.com/SebaGallegos/app-algebra-calculo.git
   cd app-algebra-calculo
2. Instalar las dependencias:
   ```bash
   npm install
