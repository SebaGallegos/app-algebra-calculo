# 📚 Proyecto de Titulación: Aplicación Móvil para computar respuestas a consultas en Álgebra y Cálculo Relacional

Este proyecto fue desarrollado en conjunto por **[Sebastián](https://github.com/SebaGallegos)** y **[Nicolás](https://github.com/NikoMalek)**.
La aplicación tiene como objetivo facilitar el *aprendizaje interactivo de bases de datos* mediante la visualización de consultas en *álgebra relacional* y *cálculo relacional*, 
mostrando tanto los resultados en tablas como su equivalente en SQL.
Las consultas se generan utilizando expresiones regulares para extraer la consulta y transformarla en lenguaje SQL.

## 🚀 Funcionalidades Principales

- *Interprete de SQL con SQLite*: Interprete de SQL con SQLite: Los usuarios pueden ingresar, modificar y eliminar tablas en una base de datos SQLite integrada en la aplicación mediante comandos SQL (CREATE, UPDATE, DROP, etc.). 
- *Álgebra Relacional*: Interfaz dedicada para la construcción de consultas en álgebra relacional. Los usuarios pueden seleccionar símbolos y operadores del álgebra relacional desde un conjunto de botones, y ver el resultado tanto en formato de tabla como en su equivalente en SQL.
- *Cálculo Relacional de Tuplas*: Similar a la sección de álgebra relacional, esta pantalla permite la creación de consultas utilizando el cálculo relacional de tuplas, con una visualización del resultado y su equivalente en SQL.

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

## Software requerido

Para ejecutar este proyecto se requiere instalar Node.js versión [v20.12.2](https://nodejs.org/dist/v20.12.2/).

> [!NOTE]
> No se ha probado la ejecución de la aplicación en las versiones más recientes de Node.js, por ende, se recomienda trabajar en la versión especificada ya que es posible que alguna característica no funcione de manera correcta.

## 🛠️ Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. *Clonar el repositorio*:
   ```bash
   git clone https://github.com/SebaGallegos/app-algebra-calculo.git
   cd app-algebra-calculo
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar la aplicación:
   ```bash
   npm run start
   ```
   **Importante:** registrarse en [Expo](https://expo.dev/signup) para poder ejecutar la aplicación. Una vez registrado, iniciar sesión mediante el siguiente comando:

   ```
   > npx expo login
   
   Log in to EAS with email or username (exit and run 'npx expo login --help' for other login options)
   √ Email or username ... tuusuario
   √ Password ... tucontraseña
   ```
4. Escanear el código QR que aparece en la consola con la aplicación *Expo* disponible para [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www&pli=1) e [iOS](https://apps.apple.com/us/app/expo-go/id982107779).
5. Una vez escaneado el código QR, la aplicación se ejecutará en el teléfono móvil.

## ⚙️ Compilación de la aplicación

Para compilar la aplicación en Android, se puede realizar mediante la plataforma de [Expo](https://docs.expo.dev/build/setup/), aquí dejaremos los siguientes pasos:

1. Instalar el paquete `eas-cli` mediante el siguiente comando
   ```bash
   npm install -g eas-cli
   ```
2. Iniciar sesión en la plataforma de *Expo* mediante el comando
   ```bash
   eas login
   ```
3. Iniciar el trabajo de compilación, esto se hará a través de internet mediante el siguiente comando:
   ```bash
   eas build --platform android --profile preview
   ```

   **Importante:** El argumento `--profile preview` indica a la plataforma de construcción que debe generar un archivo APK (indicado en el archivo [eas.json](https://github.com/SebaGallegos/app-algebra-calculo/blob/main/eas.json)), ya que por defecto, al compilar se genera un archivo AAB, que es el utilizado por Google Play Store para poder distribuir la aplicación a través de su tienda en Android, pero que no se puede instalar manualmente para poder testear la aplicación. Para más información visite la [documentación](https://docs.expo.dev/build-reference/apk/).
   
4. Esperar a que termine la compilación, una vez finalizada, podemos acceder a través de la URL que nos suministra la herramienta y descargar el archivo APK.
