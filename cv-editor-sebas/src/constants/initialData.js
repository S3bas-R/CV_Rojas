/**
 * Datos iniciales para el formulario del CV.
 * Incluye datos de ejemplo para que el usuario no empiece de cero.
 */
export const initialData = {
    nombre: "Sebastián Rojas",
    titulo: "Desarrollador de Software | Profesional Multifacético",
    email: "sebas.educa00@gmail.com",
    telefono: "+593 98 322 3670",
    ubicacion: "Quito, Ecuador",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300", // Fixed broken link
    disponibilidad: "Inmediata - Tiempo Parcial",
    linkedin: "linkedin.com/in/tu-perfil",
    github: "github.com/tu-usuario",
    portfolio: "tu-portfolio.com",
    twitter: "",
    sobreMi: "Mi principal meta es contribuir con mi experiencia adquirida durante estos años, ofreciendo siempre mi máximo esfuerzo y trabajando en conjunto con la empresa para alcanzar objetivos comunes.",
    sobreMiExtra: "Estoy dispuesto a adaptarme a nuevas situaciones y desafíos de manera inmediata. Creo firmemente que los valores como el trabajo en equipo y el compañerismo son fundamentales para el buen desempeño y progreso en cualquier puesto laboral.",
    idiomas: [{ idioma: "Español", nivel: "Nativo" }, { idioma: "Inglés", nivel: "Avanzado" }],
    hobbies: ["Fotografía", "Deportes", "Lectura", "Videojuegos", "Música"],
    experiencias: [
        { id: 1, puesto: "Polifuncional Grúas", empresa: "United Crane \"USA\"", fecha: "Julio - Sept 2024", descripcion: ["Manejo de seguridad ciudadana", "Asistente de operaciones", "Control de herramientas"] },
        { id: 2, puesto: "Trabajador Operativo", empresa: "TÍA S.A.", fecha: "Mayo 2023 - Enero 2024", descripcion: ["Atención al cliente", "Vendedor", "Cajero"] }
    ],
    educacion: [
        { id: 1, titulo: "Software Development", institucion: "PUCE", fecha: "Cursando" },
        { id: 2, titulo: "MBA", institucion: "PUCE", fecha: "Cursando" }
    ],
    certificaciones: [
        { id: 1, nombre: "AWS Solutions Architect", emisor: "Amazon Web Services", fecha: "2024", credencial: "AWS-123456" }
    ],
    voluntariado: [
        { id: 1, organizacion: "PUCE - Servicio Comunitario", rol: "Desarrollador de Software", fecha: "Diciembre 2024", descripcion: "Asistencia técnica a usuarios" }
    ],
    premios: [
        { id: 1, titulo: "Mejor Proyecto Innovador", emisor: "PUCE", fecha: "2024", descripcion: "Reconocimiento por desarrollo de sistema de verificación" }
    ],
    skills: [
        { id: 1, nombre: "Python", nivel: 75 },
        { id: 2, nombre: "HTML/CSS", nivel: 85 },
        { id: 3, nombre: "SQL", nivel: 70 }
    ],
    softSkills: ["Trabajo en Equipo", "Liderazgo", "Comunicación"],
    proyectos: [
        { id: 1, nombre: "Sistema Verificación Cédula", fecha: "Enero 2024", descripcion: "App web para validar cédulas ecuatorianas", tecnologias: "HTML, CSS, Python" }
    ],
    colorPrincipal: "#0066FF",
    plantilla: "professional",
    idiomaCv: "es"
};
