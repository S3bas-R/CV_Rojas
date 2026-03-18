/**
 * Datos iniciales para el formulario del CV.
 * Incluye datos de ejemplo completamente ficticios.
 */
export const initialData = {
    nombre: "Juan Pérez",
    titulo: "Desarrollador Full Stack Senior",
    email: "juan.perez@email.com",
    telefono: "+593 99 123 4567",
    ubicacion: "Quito, Ecuador",
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/70/Front_view_of_a_resting_Canis_lupus_ssp.jpg",
    disponibilidad: "Inmediata",
    linkedin: "https://linkedin.com/in/juanperez-demo",
    github: "https://github.com/juanperez-demo",
    portfolio: "https://juanperez.dev",
    twitter: "@juanp_dev",
    sobreMi: "Apasionado por la tecnología y el desarrollo de software. Me especializo en crear aplicaciones web escalables y eficientes. Busco oportunidades para aplicar mis conocimientos en React, Node.js y arquitectura de software.",
    sobreMiExtra: "Siempre estoy aprendiendo nuevas tecnologías. Me gusta contribuir a proyectos de código abierto y participar en hackathones. Creo en el código limpio y la mejora continua.",
    idiomas: [{ idioma: "Español", nivel: "Nativo" }, { idioma: "Inglés", nivel: "Avanzado (C1)" }],
    hobbies: ["Fotografía", "Ciclismo", "Videojuegos", "Cocina"],
    experiencias: [
        { id: 1, puesto: "Senior Frontend Developer", empresa: "Tech Solutions Inc.", fecha: "Ene 2022 - Presente", descripcion: ["Liderazgo técnico de equipo frontend", "Migración de legacy code a React", "Optimización de rendimiento web"] },
        { id: 2, puesto: "Web Developer", empresa: "Agencia Creativa Digital", fecha: "Jun 2019 - Dic 2021", descripcion: ["Desarrollo de sitios web corporativos", "Implementación de e-commerce con Shopify", "Mantenimiento de bases de datos"] }
    ],
    educacion: [
        { id: 1, titulo: "Ingeniería en Sistemas", institucion: "Universidad Politécnica Salesiana", fecha: "2015 - 2020" },
        { id: 2, titulo: "Certificación AWS Solutions Architect", institucion: "Amazon Web Services", fecha: "2023" }
    ],
    certificaciones: [
        { id: 1, nombre: "Meta Frontend Developer", emisor: "Coursera", fecha: "2022", credencial: "META-12345" }
    ],
    voluntariado: [
        { id: 1, organizacion: "Tech for Good", rol: "Mentor de Programación", fecha: "2021 - Presente", descripcion: "Enseñanza de programación básica a jóvenes" }
    ],
    premios: [
        { id: 1, titulo: "Hackathon Winner 2021", emisor: "Campus Party", fecha: "2021", descripcion: "Primer lugar en categoría Fintech" }
    ],
    skills: [
        { id: 1, nombre: "React", nivel: 90 },
        { id: 2, nombre: "Node.js", nivel: 85 },
        { id: 3, nombre: "TypeScript", nivel: 80 },
        { id: 4, nombre: "PostgreSQL", nivel: 75 }
    ],
    softSkills: ["Resolución de problemas", "Comunicación efectiva", "Adaptabilidad"],
    proyectos: [
        { id: 1, nombre: "E-commerce Dashboard", fecha: "2023", descripcion: "Panel de administración para tiendas online con análisis de datos en tiempo real", tecnologias: "React, Tremor, Tailwind CSS" },
        { id: 2, nombre: "Task Manager App", fecha: "2022", descripcion: "Aplicación de gestión de tareas colaborativa", tecnologias: "Vue.js, Firebase" }
    ],
    colorPrincipal: "#0066FF",
    plantilla: "professional",
    idiomaCv: "es",
    customStyle: {
        fontFamily: "'Inter', sans-serif",
        headerAlignment: "left", /* left, center o right */
        layout: "two-column", /* one-column, two-column */
        backgroundColor: "#ffffff",
        textColor: "#1f2937"
    }
};
