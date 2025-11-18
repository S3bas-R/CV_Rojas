import React, { useState, useEffect, useRef } from 'react';
import { Camera, Trash2, Plus, Download, Palette, User, Briefcase, GraduationCap, Code, Rocket, Settings, MapPin, Phone, Mail, Globe, Calendar, Linkedin, Github, Twitter, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// TRADUCCIONES
const translations = {
  es: {
    editorTitle: "Editor CV Pro",
    subtitle: "Edita en vivo tu currículum profesional",
    tabs: {
      personal: "Personal",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      projects: "Proyectos",
      design: "Diseño"
    },
    personal: {
      title: "Información Personal",
      fullName: "Nombre Completo",
      jobTitle: "Título Profesional",
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      availability: "Disponibilidad",
      aboutMe: "Sobre Mí",
      additionalInfo: "Información Adicional",
      hobbies: "Hobbies (separados por coma)",
      socialNetworks: "Redes Sociales",
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio/Web",
      twitter: "Twitter",
      instagram: "Instagram"
    },
    experience: {
      title: "Experiencia Laboral",
      add: "Añadir",
      position: "Puesto de trabajo",
      company: "Empresa",
      date: "Fecha (Ej: Enero 2020 - Diciembre 2023)",
      description: "Una responsabilidad por línea..."
    },
    education: {
      title: "Educación",
      add: "Añadir",
      degree: "Título o certificación",
      institution: "Institución",
      date: "2018 - 2022 o 'Completado'"
    },
    skills: {
      title: "Habilidades Técnicas",
      add: "Añadir",
      name: "Nombre de la habilidad",
      level: "Nivel",
      softSkills: "Habilidades Blandas (separadas por coma)"
    },
    projects: {
      title: "Proyectos",
      add: "Añadir",
      name: "Nombre del proyecto",
      date: "Fecha",
      description: "Descripción del proyecto",
      technologies: "Tecnologías: React, Node.js, MongoDB"
    },
    design: {
      title: "Personalización",
      uploadPhoto: "Subir Foto",
      photoUrl: "O pega una URL de imagen",
      primaryColor: "Color Principal",
      template: "Plantilla",
      professional: "Profesional",
      modern: "Moderno",
      minimal: "Minimalista",
      exportPDF: "Exportar a PDF",
      resetAll: "Resetear Todo",
      autoSave: "Guardado Automático",
      autoSaveDesc: "Todos tus cambios se guardan automáticamente en tu navegador. ¡Nunca perderás tu trabajo!",
      languages: "Idiomas",
      addLanguage: "+ Añadir idioma",
      language: "Idioma",
      languageLevel: "Nivel"
    },
    cv: {
      contact: "Contacto",
      languages: "Idiomas",
      availability: "Disponibilidad",
      hobbies: "Hobbies",
      softSkills: "Habilidades Blandas",
      profile: "Perfil Profesional",
      experience: "Experiencia Laboral",
      education: "Educación",
      technicalSkills: "Habilidades Técnicas",
      projects: "Proyectos",
      technologies: "Tecnologías"
    }
  },
  en: {
    editorTitle: "CV Editor Pro",
    subtitle: "Edit your professional resume live",
    tabs: {
      personal: "Personal",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      design: "Design"
    },
    personal: {
      title: "Personal Information",
      fullName: "Full Name",
      jobTitle: "Job Title",
      email: "Email",
      phone: "Phone",
      location: "Location",
      availability: "Availability",
      aboutMe: "About Me",
      additionalInfo: "Additional Information",
      hobbies: "Hobbies (comma separated)",
      socialNetworks: "Social Networks",
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio/Website",
      twitter: "Twitter",
      instagram: "Instagram"
    },
    experience: {
      title: "Work Experience",
      add: "Add",
      position: "Job Position",
      company: "Company",
      date: "Date (e.g., January 2020 - December 2023)",
      description: "One responsibility per line..."
    },
    education: {
      title: "Education",
      add: "Add",
      degree: "Degree or certification",
      institution: "Institution",
      date: "2018 - 2022 or 'Completed'"
    },
    skills: {
      title: "Technical Skills",
      add: "Add",
      name: "Skill name",
      level: "Level",
      softSkills: "Soft Skills (comma separated)"
    },
    projects: {
      title: "Projects",
      add: "Add",
      name: "Project name",
      date: "Date",
      description: "Project description",
      technologies: "Technologies: React, Node.js, MongoDB"
    },
    design: {
      title: "Customization",
      uploadPhoto: "Upload Photo",
      photoUrl: "Or paste an image URL",
      primaryColor: "Primary Color",
      template: "Template",
      professional: "Professional",
      modern: "Modern",
      minimal: "Minimal",
      exportPDF: "Export to PDF",
      resetAll: "Reset All",
      autoSave: "Auto Save",
      autoSaveDesc: "All your changes are automatically saved in your browser. You'll never lose your work!",
      languages: "Languages",
      addLanguage: "+ Add language",
      language: "Language",
      languageLevel: "Level"
    },
    cv: {
      contact: "Contact",
      languages: "Languages",
      availability: "Availability",
      hobbies: "Hobbies",
      softSkills: "Soft Skills",
      profile: "Professional Profile",
      experience: "Work Experience",
      education: "Education",
      technicalSkills: "Technical Skills",
      projects: "Projects",
      technologies: "Technologies"
    }
  }
};

// STORE INICIAL
const initialData = {
  nombre: "Sebastián Rojas",
  titulo: "Desarrollador de Software | Profesional Multifacético",
  email: "sebas.educa00@gmail.com",
  telefono: "+593 98 322 3670",
  ubicacion: "Quito, Ecuador",
  foto: "https://upload.wikimedia.org/wikipedia/commons/7/70/Front_view_of_a_resting_Canis_lupus_ssp.jpg",
  disponibilidad: "Inmediata - Tiempo Parcial",
  
  // REDES SOCIALES
  linkedin: "https://linkedin.com/in/tu-perfil",
  github: "https://github.com/tu-usuario",
  portfolio: "https://tu-portfolio.com",
  twitter: "",
  instagram: "",
  
  sobreMi: "Mi principal meta es contribuir con mi experiencia adquirida durante estos años, ofreciendo siempre mi máximo esfuerzo y trabajando en conjunto con la empresa para alcanzar objetivos comunes.",
  sobreMiExtra: "Estoy dispuesto a adaptarme a nuevas situaciones y desafíos de manera inmediata. Creo firmemente que los valores como el trabajo en equipo y el compañerismo son fundamentales para el buen desempeño y progreso en cualquier puesto laboral.",
  
  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "Avanzado" }
  ],
  
  hobbies: ["Fotografía", "Deportes", "Lectura", "Videojuegos", "Música"],
  
  experiencias: [
    {
      id: 1,
      puesto: "Polifuncional Grúas",
      empresa: "United Crane \"USA\"",
      fecha: "Julio - Septiembre 2024",
      descripcion: ["Manejo de seguridad ciudadana", "Asistente de operaciones de la grúa", "Control de paquetes y encargado de herramientas de trabajo"]
    },
    {
      id: 2,
      puesto: "Trabajador Operativo",
      empresa: "Tiendas Industriales Asociadas (TÍA) S.A.",
      fecha: "Mayo 2023 - Enero 2024",
      descripcion: ["Atención al cliente", "Vendedor", "Cajero", "Carga y descarga de alimentos y bebidas", "Perchero y seccionista"]
    },
    {
      id: 3,
      puesto: "Barista y Mesero",
      empresa: "Restaurante La Tagliatella",
      fecha: "Junio - Noviembre 2022",
      descripcion: ["Preparación de cafés, postres y bebidas", "Carga y descarga de alimentos y bebidas", "Atención al público personalizada"]
    }
  ],
  
  educacion: [
    { id: 1, titulo: "Software Development", institucion: "Pontificia Universidad Católica del Ecuador", fecha: "Actualmente cursando" },
    { id: 2, titulo: "Maestría en Administración de Empresas", institucion: "Pontificia Universidad Católica del Ecuador", fecha: "Actualmente cursando" },
    { id: 3, titulo: "Licenciatura en Turismo", institucion: "Universidad Central del Ecuador", fecha: "Completado" }
  ],
  
  skills: [
    { id: 1, nombre: "Microsoft Office", nivel: 90 },
    { id: 2, nombre: "Python", nivel: 75 },
    { id: 3, nombre: "CSS", nivel: 80 },
    { id: 4, nombre: "HTML", nivel: 85 },
    { id: 5, nombre: "SQL", nivel: 70 },
    { id: 6, nombre: "Fotografía", nivel: 85 }
  ],
  
  softSkills: ["Trabajo en Equipo", "Gestión del Tiempo", "Pensamiento Analítico", "Resolución de Problemas", "Comunicación Efectiva", "Aprendizaje Continuo"],
  
  proyectos: [
    {
      id: 1,
      nombre: "Sistema de Verificación de Cédula Ecuatoriana",
      fecha: "Enero 2024",
      descripcion: "Desarrollo de una aplicación web para validar automáticamente números de cédula ecuatoriana mediante algoritmos de verificación.",
      tecnologias: "HTML, CSS, Python"
    },
    {
      id: 2,
      nombre: "Plataforma de Alquiler de Autos de Lujo",
      fecha: "Agosto 2024",
      descripcion: "Diseño y desarrollo de un sitio web completo para una empresa de alquiler de vehículos de alta gama.",
      tecnologias: "HTML, CSS, SQL, Adobe"
    }
  ],
  
  colorPrincipal: "#0066FF",
  plantilla: "professional", // professional, modern, minimal
  idiomaCv: "es"
};

export default function CVEditor() {
  const [activeTab, setActiveTab] = useState('personal');
  const [data, setData] = useState(initialData);
  const [language, setLanguage] = useState('es');
  const printRef = useRef();
  const fileInputRef = useRef();

  const t = translations[language];

  // AUTO-SAVE
  useEffect(() => {
    const saved = localStorage.getItem('cv-data-ultimate');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cv-data-ultimate', JSON.stringify(data));
  }, [data]);

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (field) => {
    const newItem = field === 'experiencias' 
      ? { id: Date.now(), puesto: '', empresa: '', fecha: '', descripcion: [''] }
      : field === 'educacion'
      ? { id: Date.now(), titulo: '', institucion: '', fecha: '' }
      : field === 'proyectos'
      ? { id: Date.now(), nombre: '', fecha: '', descripcion: '', tecnologias: '' }
      : { id: Date.now(), nombre: '', nivel: 50 };
    
    setData(prev => ({ ...prev, [field]: [...prev[field], newItem] }));
  };

  const removeItem = (field, id) => {
    setData(prev => ({ ...prev, [field]: prev[field].filter(item => item.id !== id) }));
  };

  const updateItem = (field, id, key, value) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].map(item => item.id === id ? { ...item, [key]: value } : item)
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('foto', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const exportPDF = () => {
    window.print();
  };

  const resetData = () => {
    if (confirm('¿Seguro que quieres resetear todo el CV?')) {
      setData(initialData);
      localStorage.removeItem('cv-data-ultimate');
    }
  };

  const tabs = [
    { id: 'personal', icon: User, label: t.tabs.personal },
    { id: 'experiencia', icon: Briefcase, label: t.tabs.experience },
    { id: 'educacion', icon: GraduationCap, label: t.tabs.education },
    { id: 'skills', icon: Code, label: t.tabs.skills },
    { id: 'proyectos', icon: Rocket, label: t.tabs.projects },
    { id: 'diseno', icon: Settings, label: t.tabs.design }
  ];

  // RENDER TEMPLATE
  const renderTemplate = () => {
    const tCv = translations[data.idiomaCv].cv;
    
    if (data.plantilla === 'modern') {
      return <ModernTemplate data={data} t={tCv} />;
    } else if (data.plantilla === 'minimal') {
      return <MinimalTemplate data={data} t={tCv} />;
    } else {
      return <ProfessionalTemplate data={data} t={tCv} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <motion.div
        className="fixed inset-0 opacity-20 pointer-events-none"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${data.colorPrincipal}40 0%, transparent 50%)`,
          backgroundSize: '200% 200%'
        }}
      />

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        
        {/* EDITOR */}
        <div className="w-full lg:w-2/5 bg-white overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg z-20">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Palette className="w-8 h-8" />
                {t.editorTitle}
              </h1>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 rounded-lg bg-white/20 text-white text-sm font-semibold cursor-pointer hover:bg-white/30 transition"
              >
                <option value="es">🇪🇸 ES</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </div>
            <p className="text-sm opacity-90">{t.subtitle}</p>
          </div>

          {/* TABS */}
          <div className="flex overflow-x-auto bg-gray-50 border-b sticky top-[88px] z-10">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* CONTENIDO */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* TAB PERSONAL */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.personal.title}</h2>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.fullName}</label>
                      <input
                        type="text"
                        value={data.nombre}
                        onChange={(e) => updateField('nombre', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.jobTitle}</label>
                      <input
                        type="text"
                        value={data.titulo}
                        onChange={(e) => updateField('titulo', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.email}</label>
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.phone}</label>
                        <input
                          type="tel"
                          value={data.telefono}
                          onChange={(e) => updateField('telefono', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.location}</label>
                      <input
                        type="text"
                        value={data.ubicacion}
                        onChange={(e) => updateField('ubicacion', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.availability}</label>
                      <input
                        type="text"
                        value={data.disponibilidad}
                        onChange={(e) => updateField('disponibilidad', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition"
                      />
                    </div>

                    {/* REDES SOCIALES */}
                    <div className="border-t-2 pt-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">{t.personal.socialNetworks}</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Linkedin className="w-5 h-5 text-blue-600" />
                          <input
                            type="text"
                            value={data.linkedin}
                            onChange={(e) => updateField('linkedin', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.personal.linkedin}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Github className="w-5 h-5 text-gray-800" />
                          <input
                            type="text"
                            value={data.github}
                            onChange={(e) => updateField('github', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.personal.github}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-green-600" />
                          <input
                            type="text"
                            value={data.portfolio}
                            onChange={(e) => updateField('portfolio', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.personal.portfolio}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Twitter className="w-5 h-5 text-sky-500" />
                          <input
                            type="text"
                            value={data.twitter}
                            onChange={(e) => updateField('twitter', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.personal.twitter}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Instagram className="w-5 h-5 text-pink-600" />
                          <input
                            type="text"
                            value={data.instagram}
                            onChange={(e) => updateField('instagram', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.personal.instagram}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.aboutMe}</label>
                      <textarea
                        value={data.sobreMi}
                        onChange={(e) => updateField('sobreMi', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.additionalInfo}</label>
                      <textarea
                        value={data.sobreMiExtra}
                        onChange={(e) => updateField('sobreMiExtra', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal.hobbies}</label>
                      <input
                        type="text"
                        value={data.hobbies.join(', ')}
                        onChange={(e) => updateField('hobbies', e.target.value.split(',').map(h => h.trim()))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition"
                      />
                    </div>
                  </div>
                )}

                {/* TAB EXPERIENCIA */}
                {activeTab === 'experiencia' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{t.experience.title}</h2>
                      <button
                        onClick={() => addItem('experiencias')}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        <Plus className="w-4 h-4" /> {t.experience.add}
                      </button>
                    </div>

                    {data.experiencias.map((exp) => (
                      <div key={exp.id} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 relative">
                        <button
                          onClick={() => removeItem('experiencias', exp.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="space-y-3">
                          <input
                            type="text"
                            value={exp.puesto}
                            onChange={(e) => updateItem('experiencias', exp.id, 'puesto', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.experience.position}
                          />
                          <input
                            type="text"
                            value={exp.empresa}
                            onChange={(e) => updateItem('experiencias', exp.id, 'empresa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.experience.company}
                          />
                          <input
                            type="text"
                            value={exp.fecha}
                            onChange={(e) => updateItem('experiencias', exp.id, 'fecha', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.experience.date}
                          />
                          <textarea
                            value={exp.descripcion.join('\n')}
                            onChange={(e) => updateItem('experiencias', exp.id, 'descripcion', e.target.value.split('\n'))}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none resize-none"
                            placeholder={t.experience.description}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB EDUCACIÓN */}
                {activeTab === 'educacion' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{t.education.title}</h2>
                      <button
                        onClick={() => addItem('educacion')}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        <Plus className="w-4 h-4" /> {t.education.add}
                      </button>
                    </div>

                    {data.educacion.map((edu) => (
                      <div key={edu.id} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 relative">
                        <button
                          onClick={() => removeItem('educacion', edu.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="space-y-3">
                          <input
                            type="text"
                            value={edu.titulo}
                            onChange={(e) => updateItem('educacion', edu.id, 'titulo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.education.degree}
                          />
                          <input
                            type="text"
                            value={edu.institucion}
                            onChange={(e) => updateItem('educacion', edu.id, 'institucion', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.education.institution}
                          />
                          <input
                            type="text"
                            value={edu.fecha}
                            onChange={(e) => updateItem('educacion', edu.id, 'fecha', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.education.date}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB SKILLS */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{t.skills.title}</h2>
                      <button
                        onClick={() => addItem('skills')}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        <Plus className="w-4 h-4" /> {t.skills.add}
                      </button>
                    </div>

                    {data.skills.map((skill) => (
                      <div key={skill.id} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 relative">
                        <button
                          onClick={() => removeItem('skills', skill.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="space-y-3">
                          <input
                            type="text"
                            value={skill.nombre}
                            onChange={(e) => updateItem('skills', skill.id, 'nombre', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.skills.name}
                          />
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-semibold text-gray-700">{t.skills.level}: {skill.nivel}%</label>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.nivel}
                              onChange={(e) => updateItem('skills', skill.id, 'nivel', parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, ${data.colorPrincipal} 0%, ${data.colorPrincipal} ${skill.nivel}%, #e5e7eb ${skill.nivel}%, #e5e7eb 100%)`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-8">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.skills.softSkills}</label>
                      <textarea
                        value={data.softSkills.join(', ')}
                        onChange={(e) => updateField('softSkills', e.target.value.split(',').map(s => s.trim()))}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* TAB PROYECTOS */}
                {activeTab === 'proyectos' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{t.projects.title}</h2>
                      <button
                        onClick={() => addItem('proyectos')}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        <Plus className="w-4 h-4" /> {t.projects.add}
                      </button>
                    </div>

                    {data.proyectos.map((proyecto) => (
                      <div key={proyecto.id} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 relative">
                        <button
                          onClick={() => removeItem('proyectos', proyecto.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="space-y-3">
                          <input
                            type="text"
                            value={proyecto.nombre}
                            onChange={(e) => updateItem('proyectos', proyecto.id, 'nombre', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.projects.name}
                          />
                          <input
                            type="text"
                            value={proyecto.fecha}
                            onChange={(e) => updateItem('proyectos', proyecto.id, 'fecha', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.projects.date}
                          />
                          <textarea
                            value={proyecto.descripcion}
                            onChange={(e) => updateItem('proyectos', proyecto.id, 'descripcion', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none resize-none"
                            placeholder={t.projects.description}
                          />
                          <input
                            type="text"
                            value={proyecto.tecnologias}
                            onChange={(e) => updateItem('proyectos', proyecto.id, 'tecnologias', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.projects.technologies}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB DISEÑO */}
                {activeTab === 'diseno' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.design.title}</h2>
                    
                    {/* PLANTILLA */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">{t.design.template}</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => updateField('plantilla', 'professional')}
                          className={`p-4 rounded-lg border-2 transition ${
                            data.plantilla === 'professional'
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-bold text-center">{t.design.professional}</div>
                        </button>
                        <button
                          onClick={() => updateField('plantilla', 'modern')}
                          className={`p-4 rounded-lg border-2 transition ${
                            data.plantilla === 'modern'
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-bold text-center">{t.design.modern}</div>
                        </button>
                        <button
                          onClick={() => updateField('plantilla', 'minimal')}
                          className={`p-4 rounded-lg border-2 transition ${
                            data.plantilla === 'minimal'
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-bold text-center">{t.design.minimal}</div>
                        </button>
                      </div>
                    </div>

                    {/* IDIOMA DEL CV */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Idioma del CV</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateField('idiomaCv', 'es')}
                          className={`flex-1 py-3 rounded-lg border-2 transition font-semibold ${
                            data.idiomaCv === 'es'
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          🇪🇸 Español
                        </button>
                        <button
                          onClick={() => updateField('idiomaCv', 'en')}
                          className={`flex-1 py-3 rounded-lg border-2 transition font-semibold ${
                            data.idiomaCv === 'en'
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          🇬🇧 English
                        </button>
                      </div>
                    </div>

                    {/* FOTO */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">{t.design.uploadPhoto}</label>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg" style={{ borderColor: data.colorPrincipal }}>
                          <img src={data.foto} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition mb-2"
                          >
                            <Camera className="w-4 h-4" /> {t.design.uploadPhoto}
                          </button>
                          <input
                            type="text"
                            value={data.foto}
                            onChange={(e) => updateField('foto', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none text-sm"
                            placeholder={t.design.photoUrl}
                          />
                        </div>
                      </div>
                    </div>

                    {/* COLOR */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">{t.design.primaryColor}</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={data.colorPrincipal}
                          onChange={(e) => updateField('colorPrincipal', e.target.value)}
                          className="w-20 h-20 rounded-lg cursor-pointer border-4 border-gray-300"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={data.colorPrincipal}
                            onChange={(e) => updateField('colorPrincipal', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none font-mono"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {['#0066FF', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444'].map(color => (
                          <button
                            key={color}
                            onClick={() => updateField('colorPrincipal', color)}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* IDIOMAS */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3">{t.design.languages}</h3>
                      {data.idiomas.map((idioma, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={idioma.idioma}
                            onChange={(e) => {
                              const newIdiomas = [...data.idiomas];
                              newIdiomas[idx].idioma = e.target.value;
                              updateField('idiomas', newIdiomas);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.design.language}
                          />
                          <input
                            type="text"
                            value={idioma.nivel}
                            onChange={(e) => {
                              const newIdiomas = [...data.idiomas];
                              newIdiomas[idx].nivel = e.target.value;
                              updateField('idiomas', newIdiomas);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 outline-none"
                            placeholder={t.design.languageLevel}
                          />
                          <button
                            onClick={() => {
                              const newIdiomas = data.idiomas.filter((_, i) => i !== idx);
                              updateField('idiomas', newIdiomas);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => updateField('idiomas', [...data.idiomas, { idioma: '', nivel: '' }])}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        {t.design.addLanguage}
                      </button>
                    </div>

                    {/* ACCIONES */}
                    <div className="mt-8 space-y-3">
                      <button
                        onClick={exportPDF}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition"
                      >
                        <Download className="w-5 h-5" /> {t.design.exportPDF}
                      </button>
                      
                      <button
                        onClick={resetData}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition"
                      >
                        <Trash2 className="w-5 h-5" /> {t.design.resetAll}
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
                      <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="text-2xl">💾</span> {t.design.autoSave}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t.design.autoSaveDesc}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div ref={printRef} id="cv-preview">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-preview, #cv-preview * {
            visibility: visible;
          }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

// PLANTILLA PROFESIONAL
function ProfessionalTemplate({ data, t }) {
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ minHeight: '297mm' }}>
      <header className="bg-gradient-to-br text-white p-8 text-center relative overflow-hidden" style={{ 
        background: `linear-gradient(135deg, ${data.colorPrincipal} 0%, ${data.colorPrincipal}dd 100%)`
      }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        
        <div className="relative z-10">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">{data.nombre}</h1>
          <p className="text-xl opacity-95">{data.titulo}</p>
          
          {/* REDES SOCIALES EN HEADER */}
          <div className="flex justify-center gap-4 mt-4">
            {data.linkedin && (
              <a href={data.linkedin} className="text-white hover:scale-110 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.github && (
              <a href={data.github} className="text-white hover:scale-110 transition">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.portfolio && (
              <a href={data.portfolio} className="text-white hover:scale-110 transition">
                <Globe className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a href={data.twitter} className="text-white hover:scale-110 transition">
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <aside className="bg-gray-50 p-6 space-y-6 border-r-2" style={{ borderColor: `${data.colorPrincipal}40` }}>
          <section>
            <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
              {t.contact}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: data.colorPrincipal }} />
                <span className="text-gray-700 break-words">{data.telefono}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: data.colorPrincipal }} />
                <span className="text-gray-700 break-words">{data.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: data.colorPrincipal }} />
                <span className="text-gray-700">{data.ubicacion}</span>
              </div>
            </div>
          </section>

          {data.idiomas.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
                {t.languages}
              </h3>
              <div className="space-y-2 text-sm">
                {data.idiomas.map((idioma, idx) => (
                  <div key={idx}>
                    <div className="font-semibold text-gray-800">{idioma.idioma}</div>
                    <div className="text-gray-600 text-xs">{idioma.nivel}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
              {t.availability}
            </h3>
            <div className="text-white text-sm font-bold px-3 py-2 rounded-lg text-center" style={{ backgroundColor: data.colorPrincipal }}>
              {data.disponibilidad}
            </div>
          </section>

          {data.hobbies.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
                {t.hobbies}
              </h3>
              <ul className="text-sm space-y-1">
                {data.hobbies.filter(h => h.trim()).map((hobby, idx) => (
                  <li key={idx} className="text-gray-700 flex items-center gap-2">
                    <span style={{ color: data.colorPrincipal }}>●</span>
                    {hobby}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.softSkills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
                {t.softSkills}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {data.softSkills.filter(s => s.trim()).map((skill, idx) => (
                  <span key={idx} className="text-xs text-white px-2 py-1 rounded-full" style={{ backgroundColor: data.colorPrincipal }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="md:col-span-2 p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
              {t.profile}
            </h2>
            <p className="text-sm text-gray-700 text-justify leading-relaxed mb-2">
              {data.sobreMi}
            </p>
            {data.sobreMiExtra && (
              <p className="text-sm text-gray-700 text-justify leading-relaxed pt-2 border-t border-dashed" style={{ borderColor: `${data.colorPrincipal}60` }}>
                {data.sobreMiExtra}
              </p>
            )}
          </section>

          {data.experiencias.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
                {t.experience}
              </h2>
              <div className="space-y-4">
                {data.experiencias.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: data.colorPrincipal }}>
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: data.colorPrincipal }}></div>
                    <h3 className="font-bold text-gray-800">{exp.puesto}</h3>
                    <p className="text-sm font-semibold" style={{ color: data.colorPrincipal }}>{exp.empresa}</p>
                    <p className="text-xs text-gray-500 italic mb-2">{exp.fecha}</p>
                    <ul className="text-sm text-gray-700 space-y-0.5 list-disc list-inside">
                      {exp.descripcion.filter(d => d.trim()).map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.educacion.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
                {t.education}
              </h2>
              <div className="space-y-3">
                {data.educacion.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 p-3 rounded-lg border-l-4" style={{ borderColor: data.colorPrincipal }}>
                    <h3 className="font-bold text-gray-800 text-sm">{edu.titulo}</h3>
                    <p className="text-sm" style={{ color: data.colorPrincipal }}>{edu.institucion}</p>
                    <p className="text-xs text-gray-500 italic">{edu.fecha}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
                {t.technicalSkills}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-800">{skill.nombre}</span>
                      <span className="text-xs text-gray-500">{skill.nivel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.nivel}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${data.colorPrincipal}, ${data.colorPrincipal}dd)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.proyectos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>
                {t.projects}
              </h2>
              <div className="space-y-4">
                {data.proyectos.map((proyecto) => (
                  <div key={proyecto.id} className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: data.colorPrincipal }}>
                    <h3 className="font-bold text-gray-800">{proyecto.nombre}</h3>
                    <p className="text-xs text-gray-500 italic mb-2">{proyecto.fecha}</p>
                    <p className="text-sm text-gray-700 mb-2">{proyecto.descripcion}</p>
                    <p className="text-xs font-semibold" style={{ color: data.colorPrincipal }}>
                      {t.technologies}: {proyecto.tecnologias}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

// PLANTILLA MODERNA
function ModernTemplate({ data, t }) {
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ minHeight: '297mm' }}>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* SIDEBAR MODERNO */}
        <aside className="md:col-span-2 p-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${data.colorPrincipal} 0%, ${data.colorPrincipal}cc 100%)` }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform rotate-3 hover:rotate-0 transition duration-300">
                <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-black mb-2">{data.nombre}</h1>
              <p className="text-lg opacity-90 font-light">{data.titulo}</p>
              
              {/* REDES */}
              <div className="flex justify-center gap-3 mt-4">
                {data.linkedin && <a href={data.linkedin}><Linkedin className="w-5 h-5 hover:scale-125 transition" /></a>}
                {data.github && <a href={data.github}><Github className="w-5 h-5 hover:scale-125 transition" /></a>}
                {data.portfolio && <a href={data.portfolio}><Globe className="w-5 h-5 hover:scale-125 transition" /></a>}
              </div>
            </div>

            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {t.contact}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
                  <Phone className="w-4 h-4" />
                  <span>{data.telefono}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{data.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
                  <MapPin className="w-4 h-4" />
                  <span>{data.ubicacion}</span>
                </div>
              </div>
            </section>

            {data.idiomas.length > 0 && (
              <section>
                <h3 className="text-xl font-bold mb-4">{t.languages}</h3>
                <div className="space-y-2">
                  {data.idiomas.map((idioma, idx) => (
                    <div key={idx} className="bg-white/10 p-3 rounded-lg">
                      <div className="font-bold">{idioma.idioma}</div>
                      <div className="text-sm opacity-80">{idioma.nivel}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.softSkills.length > 0 && (
              <section>
                <h3 className="text-xl font-bold mb-4">{t.softSkills}</h3>
                <div className="flex flex-wrap gap-2">
                  {data.softSkills.filter(s => s.trim()).map((skill, idx) => (
                    <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.hobbies.length > 0 && (
              <section>
                <h3 className="text-xl font-bold mb-4">{t.hobbies}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {data.hobbies.filter(h => h.trim()).map((hobby, idx) => (
                    <div key={idx} className="bg-white/10 p-2 rounded-lg text-center">
                      {hobby}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="md:col-span-3 p-8 space-y-8">
          <section>
            <h2 className="text-3xl font-black mb-4" style={{ color: data.colorPrincipal }}>
              {t.profile}
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.sobreMi}</p>
            {data.sobreMiExtra && (
              <p className="text-gray-700 leading-relaxed mt-3 pt-3 border-t-2 border-dashed" style={{ borderColor: `${data.colorPrincipal}40` }}>
                {data.sobreMiExtra}
              </p>
            )}
          </section>

          {data.experiencias.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>
                {t.experience}
              </h2>
              <div className="space-y-6">
                {data.experiencias.map((exp) => (
                  <div key={exp.id} className="border-l-4 pl-6 pb-4" style={{ borderColor: data.colorPrincipal }}>
                    <h3 className="text-xl font-bold text-gray-900">{exp.puesto}</h3>
                    <p className="font-semibold mb-1" style={{ color: data.colorPrincipal }}>{exp.empresa}</p>
                    <p className="text-sm text-gray-500 italic mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {exp.fecha}
                    </p>
                    <ul className="space-y-1 text-gray-700">
                      {exp.descripcion.filter(d => d.trim()).map((desc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colorPrincipal }}></span>
                          <span className="text-sm">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.educacion.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>
                {t.education}
              </h2>
              <div className="grid gap-4">
                {data.educacion.map((edu) => (
                  <div key={edu.id} className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border-l-4" style={{ borderColor: data.colorPrincipal }}>
                    <h3 className="font-bold text-gray-900">{edu.titulo}</h3>
                    <p className="text-sm font-semibold" style={{ color: data.colorPrincipal }}>{edu.institucion}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.fecha}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>
                {t.technicalSkills}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">{skill.nombre}</span>
                      <span className="text-sm text-gray-500">{skill.nivel}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.nivel}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: data.colorPrincipal }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.proyectos.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>
                {t.projects}
              </h2>
              <div className="space-y-4">
                {data.proyectos.map((proyecto) => (
                  <div key={proyecto.id} className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border-2 border-gray-100 hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{proyecto.nombre}</h3>
                    <p className="text-xs text-gray-500 mb-3">{proyecto.fecha}</p>
                    <p className="text-sm text-gray-700 mb-3">{proyecto.descripcion}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Code className="w-4 h-4" style={{ color: data.colorPrincipal }} />
                      <span className="font-semibold" style={{ color: data.colorPrincipal }}>{proyecto.tecnologias}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

// PLANTILLA MINIMALISTA
function MinimalTemplate({ data, t }) {
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden p-12" style={{ minHeight: '297mm' }}>
      {/* HEADER MINIMALISTA */}
      <header className="text-center mb-12 pb-8 border-b-2" style={{ borderColor: data.colorPrincipal }}>
        <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2" style={{ borderColor: data.colorPrincipal }}>
          <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-light tracking-wide mb-2 text-gray-900">{data.nombre}</h1>
        <p className="text-lg text-gray-600 mb-4">{data.titulo}</p>
        
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {data.email}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {data.telefono}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {data.ubicacion}</span>
        </div>

        {/* REDES */}
        <div className="flex justify-center gap-4 mt-4">
          {data.linkedin && <a href={data.linkedin} style={{ color: data.colorPrincipal }}><Linkedin className="w-5 h-5 hover:scale-110 transition" /></a>}
          {data.github && <a href={data.github} style={{ color: data.colorPrincipal }}><Github className="w-5 h-5 hover:scale-110 transition" /></a>}
          {data.portfolio && <a href={data.portfolio} style={{ color: data.colorPrincipal }}><Globe className="w-5 h-5 hover:scale-110 transition" /></a>}
        </div>
      </header>

      {/* PERFIL */}
      <section className="mb-10">
        <h2 className="text-2xl font-light mb-4 pb-2 border-b" style={{ color: data.colorPrincipal }}>
          {t.profile}
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">{data.sobreMi}</p>
        {data.sobreMiExtra && (
          <p className="text-gray-700 leading-relaxed text-justify mt-3">{data.sobreMiExtra}</p>
        )}
      </section>

      {/* EXPERIENCIA */}
      {data.experiencias.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>
            {t.experience}
          </h2>
          <div className="space-y-6">
            {data.experiencias.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.puesto}</h3>
                    <p className="text-gray-700">{exp.empresa}</p>
                  </div>
                  <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{exp.fecha}</span>
                </div>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  {exp.descripcion.filter(d => d.trim()).map((desc, idx) => (
                    <li key={idx} className="list-disc">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCACIÓN */}
      {data.educacion.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>
            {t.education}
          </h2>
          <div className="space-y-4">
            {data.educacion.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.titulo}</h3>
                  <p className="text-sm text-gray-700">{edu.institucion}</p>
                </div>
                <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{edu.fecha}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {data.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>
            {t.technicalSkills}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full border-8 flex items-center justify-center font-bold text-xl" style={{ 
                  borderColor: `${data.colorPrincipal}30`,
                  color: data.colorPrincipal
                }}>
                  {skill.nivel}%
                </div>
                <p className="text-sm font-semibold text-gray-800">{skill.nombre}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROYECTOS */}
      {data.proyectos.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>
            {t.projects}
          </h2>
          <div className="space-y-5">
            {data.proyectos.map((proyecto) => (
              <div key={proyecto.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{proyecto.nombre}</h3>
                  <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{proyecto.fecha}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{proyecto.descripcion}</p>
                <p className="text-xs font-semibold" style={{ color: data.colorPrincipal }}>
                  {proyecto.tecnologias}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER CON SKILLS BLANDAS */}
      {data.softSkills.length > 0 && (
        <section>
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>
            {t.softSkills}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.softSkills.filter(s => s.trim()).map((skill, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full border-2 text-sm font-medium" style={{ 
                borderColor: data.colorPrincipal,
                color: data.colorPrincipal
              }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>