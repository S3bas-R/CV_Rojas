import { useState, useEffect } from 'react';
import { initialData } from '../constants/initialData';

/**
 * Hook personalizado para manejar la lógica y estado del CV.
 * Se encarga de cargar y guardar datos en localStorage, y provee funciones para manipular el estado.
 */
export const useCV = () => {
    const [data, setData] = useState(initialData);

    // Cargar datos al iniciar
    useEffect(() => {
        const saved = localStorage.getItem('cv-data-ultimate');
        if (saved) {
            try { setData(JSON.parse(saved)); } catch (e) { console.error("Error cargando datos", e); }
        }
    }, []);

    // Guardar datos al cambiar
    useEffect(() => {
        localStorage.setItem('cv-data-ultimate', JSON.stringify(data));
    }, [data]);

    /**
     * Actualiza un campo simple del estado.
     * @param {string} field - Nombre de la propiedad a actualizar.
     * @param {any} value - Nuevo valor.
     */
    const updateField = (field, value) => setData(prev => ({ ...prev, [field]: value }));

    /**
     * Añade un nuevo item a una lista (experiencia, educación, etc).
     * @param {string} field - Nombre del array en el estado.
     */
    const addItem = (field) => {
        const newItem = field === 'experiencias' ? { id: Date.now(), puesto: '', empresa: '', fecha: '', descripcion: [''] }
            : field === 'educacion' ? { id: Date.now(), titulo: '', institucion: '', fecha: '' }
                : field === 'proyectos' ? { id: Date.now(), nombre: '', fecha: '', descripcion: '', tecnologias: '' }
                    : field === 'certificaciones' ? { id: Date.now(), nombre: '', emisor: '', fecha: '', credencial: '' }
                        : field === 'voluntariado' ? { id: Date.now(), organizacion: '', rol: '', fecha: '', descripcion: '' }
                            : field === 'premios' ? { id: Date.now(), titulo: '', emisor: '', fecha: '', descripcion: '' }
                                : { id: Date.now(), nombre: '', nivel: 50 };

        setData(prev => ({ ...prev, [field]: [...(prev[field] || []), newItem] }));
    };

    /**
     * Elimina un item de una lista por ID.
     * @param {string} field - Nombre del array.
     * @param {number} id - ID del item a eliminar.
     */
    const removeItem = (field, id) => setData(prev => ({ ...prev, [field]: prev[field].filter(item => item.id !== id) }));

    /**
     * Actualiza un campo específico de un item dentro de una lista.
     * @param {string} field - Nombre del array.
     * @param {number} id - ID del item.
     * @param {string} key - Propiedad del item a modificar.
     * @param {any} value - Nuevo valor.
     */
    const updateItem = (field, id, key, value) => setData(prev => ({ ...prev, [field]: prev[field].map(item => item.id === id ? { ...item, [key]: value } : item) }));

    /**
     * Resetea todos los datos a su estado inicial.
     */
    const resetData = () => {
        if (confirm('¿Resetear todo y volver a los datos por defecto?')) {
            setData(initialData);
            localStorage.removeItem('cv-data-ultimate');
        }
    };

    return {
        data,
        updateField,
        addItem,
        removeItem,
        updateItem,
        resetData
    };
};
