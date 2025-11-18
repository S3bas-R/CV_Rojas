// src/store/useResumeStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useResumeStore = create(
  persist(
    (set) => ({
      // === DATOS PERSONALES ===
      nombre: "Sebastián Rojas",
      titulo: "Desarrollador de Software | Profesional Multifacético",
      telefono: "+593 98 322 3670",
      email: "sebas.educa00@gmail.com",
      ubicacion: "Quito, Ecuador",
      foto: "https://upload.wikimedia.org/wikipedia/commons/7/70/Front_view_of_a_resting_Canis_lupus_ssp.jpg",
      sobreMi: "Mi principal meta es contribuir con mi experiencia adquirida durante estos años, ofreciendo siempre mi máximo esfuerzo y trabajando en conjunto con la empresa para alcanzar objetivos comunes.",
      sobreMiExtra: "Estoy dispuesto a adaptarme a nuevas situaciones y desafíos de manera inmediata. Creo firmemente que los valores como el trabajo en equipo y el compañerismo son fundamentales para el buen desempeño y progreso en cualquier puesto laboral.",
      mostrarMasSobreMi: false,
      disponibilidad: "Inmediata - Tiempo Parcial",

      // === COLORES ===
      colorPrincipal: "#0066FF",

      // === IDIOMAS Y HOBBIES ===
      idiomas: [
        { idioma: "Español", nivel: "Nativo" },
        { idioma: "Inglés", nivel: "Avanzado" }
      ],
      hobbies: ["Fotografía", "Deportes", "Lectura", "Videojuegos", "Música"],

      // === HABILIDADES TÉCNICAS ===
      habilidadesTecnicas: [
        { nombre: "Microsoft Office", nivel: 90 },
        { nombre: "Python", nivel: 75 },
        { nombre: "CSS", nivel: 80 },
        { nombre: "HTML", nivel: 85 },
        { nombre: "SQL", nivel: 70 },
        { nombre: "Fotografía", nivel: 85 },
        { nombre: "Adobe (Renderizado)", nivel: 75 },
      ],

      habilidadesBlandas: [
        "Trabajo en Equipo", "Gestión del Tiempo", "Pensamiento Analítico",
        "Resolución de Problemas", "Comunicación Efectiva", "Aprendizaje Continuo",
        "Liderazgo", "Creatividad"
      ],

      // === FUNCIÓN PARA CAMBIAR CUALQUIER COSA ===
      actualizar: (campo, valor) => set({ [campo]: valor }),

      // Toggle del "Mostrar más"
      toggleSobreMi: () => set((state) => ({ mostrarMasSobreMi: !state.mostrarMasSobreMi })),
    }),
    {
      name: 'cv-sebas-2025', // Se guarda en tu navegador para siempre
    }
  )
)

export default useResumeStore