# Manage Funds App

Aplicación web para la gestión de fondos de inversión y transacciones

## Requisitos previos

Asegúrate de tener instaladas las siguientes versiones antes de continuar:

| Herramienta | Versión recomendada |
| ----------- | ------------------- |
| Node.js     | 22.18.0             |
| Angular CLI | 20.1.6              |

Si tienes una versión distinta de Node.js, usa **nvm** para instalar la versión correcta:

**macOS / Linux:**

```bash
nvm install 22.18.0
nvm use 22.18.0
```

**Windows** ([nvm-windows](https://github.com/coreybutler/nvm-windows)):

```bash
nvm install 22.18.0
nvm use 22.18.0
```

Luego instala Angular CLI globalmente:

```bash
npm install -g @angular/cli@20
```

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/gjoiver/manage-funds-app.git
cd manage-funds-app
npm install
```

## Ejecución en desarrollo

```bash
npm run start
```

La aplicación estará disponible en `http://localhost:4200/`. Se recargará automáticamente al modificar cualquier archivo fuente.

## Compilación para producción

```bash
npm run build
```

Los artefactos se generan en el directorio `dist/`. La build de producción aplica optimizaciones automáticas de rendimiento.

## Pruebas unitarias

Las pruebas usan **Jest** con `jest-preset-angular`. Para ejecutarlas con reporte de cobertura:

```bash
npm run test
```

## Estructura del proyecto

```
src/
└── app/
    ├── features/
    │   ├── funds/          # Feature de gestión de fondos
    │   └── transactions/   # Feature de transacciones
    └── shared/
        ├── components/     # Componentes reutilizables
        ├── constants/      # Constantes globales
        ├── entities/       # Tipos e interfaces compartidas
        └── services/       # Servicios compartidos
```
