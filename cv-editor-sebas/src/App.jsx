import React, { useState, useEffect, useRef } from 'react';
import { Camera, Trash2, Plus, Download, Palette, User, Briefcase, GraduationCap, Code, Rocket, Settings, MapPin, Phone, Mail, Globe, Calendar, Linkedin, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const translations = {
  es: {
    editorTitle: "Edita tu CV_By Rojas",
    subtitle: "Edita en vivo tu currículum profesional",
    tabs: { personal: "Personal", experience: "Experiencia", education: "Educación", skills: "Habilidades", projects: "Proyectos", design: "Diseño" },
    personal: { title: "Información Personal", fullName: "Nombre Completo", jobTitle: "Título Profesional", email: "Email", phone: "Teléfono", location: "Ubicación", availability: "Disponibilidad", aboutMe: "Sobre Mí", additionalInfo: "Información Adicional", hobbies: "Hobbies (separados por coma)", socialNetworks: "Redes Sociales", linkedin: "LinkedIn", github: "GitHub", portfolio: "Portfolio/Web", twitter: "Twitter" },
    experience: { title: "Experiencia Laboral", add: "Añadir", position: "Puesto", company: "Empresa", date: "Fecha", description: "Descripción..." },
    education: { title: "Educación", add: "Añadir", degree: "Título", institution: "Institución", date: "Fecha" },
    skills: { title: "Habilidades Técnicas", add: "Añadir", name: "Habilidad", level: "Nivel", softSkills: "Habilidades Blandas" },
    projects: { title: "Proyectos", add: "Añadir", name: "Nombre", date: "Fecha", description: "Descripción", technologies: "Tecnologías" },
    design: { title: "Personalización", uploadPhoto: "Subir Foto", photoUrl: "URL imagen", primaryColor: "Color", template: "Plantilla", professional: "Profesional", modern: "Moderno", minimal: "Minimalista", exportPDF: "Exportar PDF", resetAll: "Resetear", autoSave: "Auto-guardado", autoSaveDesc: "Cambios guardados automáticamente", languages: "Idiomas", addLanguage: "+ Añadir", language: "Idioma", languageLevel: "Nivel" },
    cv: { contact: "Contacto", languages: "Idiomas", availability: "Disponibilidad", hobbies: "Hobbies", softSkills: "Soft Skills", profile: "Perfil", experience: "Experiencia", education: "Educación", technicalSkills: "Habilidades", projects: "Proyectos", technologies: "Tecnologías" }
  },
  en: {
    editorTitle: "CV Editor_ By Rojas",
    subtitle: "Edit your resume live",
    tabs: { personal: "Personal", experience: "Experience", education: "Education", skills: "Skills", projects: "Projects", design: "Design" },
    personal: { title: "Personal Info", fullName: "Full Name", jobTitle: "Job Title", email: "Email", phone: "Phone", location: "Location", availability: "Availability", aboutMe: "About Me", additionalInfo: "Additional Info", hobbies: "Hobbies (comma separated)", socialNetworks: "Social Networks", linkedin: "LinkedIn", github: "GitHub", portfolio: "Portfolio", twitter: "Twitter" },
    experience: { title: "Experience", add: "Add", position: "Position", company: "Company", date: "Date", description: "Description..." },
    education: { title: "Education", add: "Add", degree: "Degree", institution: "Institution", date: "Date" },
    skills: { title: "Technical Skills", add: "Add", name: "Skill", level: "Level", softSkills: "Soft Skills" },
    projects: { title: "Projects", add: "Add", name: "Name", date: "Date", description: "Description", technologies: "Technologies" },
    design: { title: "Customization", uploadPhoto: "Upload Photo", photoUrl: "Image URL", primaryColor: "Color", template: "Template", professional: "Professional", modern: "Modern", minimal: "Minimal", exportPDF: "Export PDF", resetAll: "Reset", autoSave: "Auto-save", autoSaveDesc: "Changes saved automatically", languages: "Languages", addLanguage: "+ Add", language: "Language", languageLevel: "Level" },
    cv: { contact: "Contact", languages: "Languages", availability: "Availability", hobbies: "Hobbies", softSkills: "Soft Skills", profile: "Profile", experience: "Experience", education: "Education", technicalSkills: "Skills", projects: "Projects", technologies: "Technologies" }
  }
};

const initialData = {
  nombre: "Sebastián Rojas",
  titulo: "Desarrollador de Software | Profesional Multifacético",
  email: "sebas.educa00@gmail.com",
  telefono: "+593 98 322 3670",
  ubicacion: "Quito, Ecuador",
  foto: "https://Front_view_of_a_resting_Canis_lupus_ssp.jpg",
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

export default function CVEditor() {
  const [activeTab, setActiveTab] = useState('personal');
  const [data, setData] = useState(initialData);
  const [language, setLanguage] = useState('es');
  const printRef = useRef();
  const fileInputRef = useRef();

  const t = translations[language];

  useEffect(() => {
    const saved = localStorage.getItem('cv-data-ultimate');
    if (saved) {
      try { setData(JSON.parse(saved)); } catch (e) { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cv-data-ultimate', JSON.stringify(data));
  }, [data]);

  const updateField = (field, value) => setData(prev => ({ ...prev, [field]: value }));
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
  const removeItem = (field, id) => setData(prev => ({ ...prev, [field]: prev[field].filter(item => item.id !== id) }));
  const updateItem = (field, id, key, value) => setData(prev => ({ ...prev, [field]: prev[field].map(item => item.id === id ? { ...item, [key]: value } : item) }));
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateField('foto', reader.result);
      reader.readAsDataURL(file);
    }
  };
  const exportPDF = () => window.print();
  const resetData = () => {
    if (confirm('¿Resetear todo?')) {
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
    { id: 'extras', icon: Plus, label: 'Extras' },
    { id: 'diseno', icon: Settings, label: t.tabs.design }
  ];

  const renderTemplate = () => {
    const tCv = translations[data.idiomaCv].cv;
    if (data.plantilla === 'modern') return <ModernTemplate data={data} t={tCv} />;
    if (data.plantilla === 'minimal') return <MinimalTemplate data={data} t={tCv} />;
    if (data.plantilla === 'creative') return <CreativeTemplate data={data} t={tCv} />;
    if (data.plantilla === 'tech') return <TechTemplate data={data} t={tCv} />;
    if (data.plantilla === 'executive') return <ExecutiveTemplate data={data} t={tCv} />;
    return <ProfessionalTemplate data={data} t={tCv} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <motion.div
        className="fixed inset-0 opacity-20 pointer-events-none"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ background: `radial-gradient(circle, ${data.colorPrincipal}40 0%, transparent 50%)`, backgroundSize: '200% 200%' }}
      />

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-xl overflow-y-auto shadow-2xl border-r border-gray-200/50">
          <div className="sticky top-0 bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 p-8 z-20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  {t.editorTitle}
                </h1>
                <p className="text-sm text-gray-500 mt-1 font-light">{t.subtitle}</p>
              </div>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-4 py-2 rounded-xl bg-gray-100/80 backdrop-blur text-gray-700 text-sm font-medium cursor-pointer border border-gray-200/50 hover:bg-gray-200/80 transition-all shadow-sm">
                <option value="es">🇪🇸 ES</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </div>
          </div>

          <div className="flex overflow-x-auto bg-white/50 backdrop-blur border-b border-gray-200/30 sticky top-[120px] z-10 px-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-3 whitespace-nowrap transition-all font-medium ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {activeTab === 'personal' && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.personal.title}</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.fullName}</label>
                  <input type="text" value={data.nombre} onChange={(e) => updateField('nombre', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.personal.fullName} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.jobTitle}</label>
                  <input type="text" value={data.titulo} onChange={(e) => updateField('titulo', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.personal.jobTitle} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.email}</label>
                    <input type="email" value={data.email} onChange={(e) => updateField('email', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.personal.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.phone}</label>
                    <input type="tel" value={data.telefono} onChange={(e) => updateField('telefono', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.personal.phone} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.location}</label>
                  <input type="text" value={data.ubicacion} onChange={(e) => updateField('ubicacion', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.personal.location} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.availability}</label>
                  <input type="text" value={data.disponibilidad} onChange={(e) => updateField('disponibilidad', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.personal.availability} />
                </div>
                
                <div className="border-t border-gray-200/50 pt-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">{t.personal.socialNetworks}</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0"><Linkedin className="w-5 h-5 text-blue-600" /></div><input type="text" value={data.linkedin} onChange={(e) => updateField('linkedin', e.target.value)} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="LinkedIn" /></div>
                    <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><Github className="w-5 h-5 text-gray-800" /></div><input type="text" value={data.github} onChange={(e) => updateField('github', e.target.value)} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="GitHub" /></div>
                    <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0"><Globe className="w-5 h-5 text-green-600" /></div><input type="text" value={data.portfolio} onChange={(e) => updateField('portfolio', e.target.value)} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Portfolio" /></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.aboutMe}</label>
                  <textarea value={data.sobreMi} onChange={(e) => updateField('sobreMi', e.target.value)} rows={4} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder={t.personal.aboutMe} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.additionalInfo}</label>
                  <textarea value={data.sobreMiExtra} onChange={(e) => updateField('sobreMiExtra', e.target.value)} rows={3} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder={t.personal.additionalInfo} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.personal.hobbies}</label>
                  <input type="text" value={data.hobbies.join(', ')} onChange={(e) => updateField('hobbies', e.target.value.split(',').map(h => h.trim()))} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.personal.hobbies} />
                </div>
              </div>
            )}

            {activeTab === 'experiencia' && (
              <div className="space-y-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">{t.experience.title}</h2>
                  <button onClick={() => addItem('experiencias')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium">
                    <Plus className="w-4 h-4" /> {t.experience.add}
                  </button>
                </div>
                {data.experiencias.map((exp) => (
                  <div key={exp.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/50 relative hover:shadow-md transition-all">
                    <button onClick={() => removeItem('experiencias', exp.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-3 pr-8">
                      <input type="text" value={exp.puesto} onChange={(e) => updateItem('experiencias', exp.id, 'puesto', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.experience.position} />
                      <input type="text" value={exp.empresa} onChange={(e) => updateItem('experiencias', exp.id, 'empresa', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.experience.company} />
                      <input type="text" value={exp.fecha} onChange={(e) => updateItem('experiencias', exp.id, 'fecha', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.experience.date} />
                      <textarea value={exp.descripcion.join('\n')} onChange={(e) => updateItem('experiencias', exp.id, 'descripcion', e.target.value.split('\n'))} rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder={t.experience.description} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'educacion' && (
              <div className="space-y-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">{t.education.title}</h2>
                  <button onClick={() => addItem('educacion')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium">
                    <Plus className="w-4 h-4" /> {t.education.add}
                  </button>
                </div>
                {data.educacion.map((edu) => (
                  <div key={edu.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/50 relative hover:shadow-md transition-all">
                    <button onClick={() => removeItem('educacion', edu.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-3 pr-8">
                      <input type="text" value={edu.titulo} onChange={(e) => updateItem('educacion', edu.id, 'titulo', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.education.degree} />
                      <input type="text" value={edu.institucion} onChange={(e) => updateItem('educacion', edu.id, 'institucion', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.education.institution} />
                      <input type="text" value={edu.fecha} onChange={(e) => updateItem('educacion', edu.id, 'fecha', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.education.date} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">{t.skills.title}</h2>
                  <button onClick={() => addItem('skills')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium">
                    <Plus className="w-4 h-4" /> {t.skills.add}
                  </button>
                </div>
                {data.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/50 relative hover:shadow-md transition-all">
                    <button onClick={() => removeItem('skills', skill.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-4 pr-8">
                      <input type="text" value={skill.nombre} onChange={(e) => updateItem('skills', skill.id, 'nombre', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.skills.name} />
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-700">{t.skills.level}</label>
                          <span className="text-sm font-semibold text-blue-600">{skill.nivel}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={skill.nivel} onChange={(e) => updateItem('skills', skill.id, 'nivel', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t.skills.softSkills}</label>
                  <textarea value={data.softSkills.join(', ')} onChange={(e) => updateField('softSkills', e.target.value.split(',').map(s => s.trim()))} rows={3} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" />
                </div>
              </div>
            )}

            {activeTab === 'proyectos' && (
              <div className="space-y-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">{t.projects.title}</h2>
                  <button onClick={() => addItem('proyectos')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium">
                    <Plus className="w-4 h-4" /> {t.projects.add}
                  </button>
                </div>
                {data.proyectos.map((proyecto) => (
                  <div key={proyecto.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/50 relative hover:shadow-md transition-all">
                    <button onClick={() => removeItem('proyectos', proyecto.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-3 pr-8">
                      <input type="text" value={proyecto.nombre} onChange={(e) => updateItem('proyectos', proyecto.id, 'nombre', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.projects.name} />
                      <input type="text" value={proyecto.fecha} onChange={(e) => updateItem('proyectos', proyecto.id, 'fecha', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.projects.date} />
                      <textarea value={proyecto.descripcion} onChange={(e) => updateItem('proyectos', proyecto.id, 'descripcion', e.target.value)} rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder={t.projects.description} />
                      <input type="text" value={proyecto.tecnologias} onChange={(e) => updateItem('proyectos', proyecto.id, 'tecnologias', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.projects.technologies} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'extras' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Secciones Adicionales</h2>
                
                {/* CERTIFICACIONES */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">🏆 Certificaciones</h3>
                    <button onClick={() => addItem('certificaciones')} className="flex items-center gap-2 bg-yellow-600 text-white px-3 py-2 rounded-xl hover:bg-yellow-700 transition-all text-sm font-medium">
                      <Plus className="w-4 h-4" /> Añadir
                    </button>
                  </div>
                  {data.certificaciones?.map((cert) => (
                    <div key={cert.id} className="bg-white p-4 rounded-xl border border-yellow-200/50 mb-3 relative">
                      <button onClick={() => removeItem('certificaciones', cert.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-2 pr-6">
                        <input type="text" value={cert.nombre} onChange={(e) => updateItem('certificaciones', cert.id, 'nombre', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="Nombre certificación" />
                        <input type="text" value={cert.emisor} onChange={(e) => updateItem('certificaciones', cert.id, 'emisor', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="Emisor" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" value={cert.fecha} onChange={(e) => updateItem('certificaciones', cert.id, 'fecha', e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="Fecha" />
                          <input type="text" value={cert.credencial} onChange={(e) => updateItem('certificaciones', cert.id, 'credencial', e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="ID Credencial" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* VOLUNTARIADO */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">🤝 Voluntariado</h3>
                    <button onClick={() => addItem('voluntariado')} className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-xl hover:bg-green-700 transition-all text-sm font-medium">
                      <Plus className="w-4 h-4" /> Añadir
                    </button>
                  </div>
                  {data.voluntariado?.map((vol) => (
                    <div key={vol.id} className="bg-white p-4 rounded-xl border border-green-200/50 mb-3 relative">
                      <button onClick={() => removeItem('voluntariado', vol.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-2 pr-6">
                        <input type="text" value={vol.organizacion} onChange={(e) => updateItem('voluntariado', vol.id, 'organizacion', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="Organización" />
                        <input type="text" value={vol.rol} onChange={(e) => updateItem('voluntariado', vol.id, 'rol', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="Rol" />
                        <input type="text" value={vol.fecha} onChange={(e) => updateItem('voluntariado', vol.id, 'fecha', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="Fecha" />
                        <textarea value={vol.descripcion} onChange={(e) => updateItem('voluntariado', vol.id, 'descripcion', e.target.value)} rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm resize-none" placeholder="Descripción" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* PREMIOS */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">🏅 Premios y Reconocimientos</h3>
                    <button onClick={() => addItem('premios')} className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-xl hover:bg-purple-700 transition-all text-sm font-medium">
                      <Plus className="w-4 h-4" /> Añadir
                    </button>
                  </div>
                  {data.premios?.map((premio) => (
                    <div key={premio.id} className="bg-white p-4 rounded-xl border border-purple-200/50 mb-3 relative">
                      <button onClick={() => removeItem('premios', premio.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-2 pr-6">
                        <input type="text" value={premio.titulo} onChange={(e) => updateItem('premios', premio.id, 'titulo', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" placeholder="Título del premio" />
                        <input type="text" value={premio.emisor} onChange={(e) => updateItem('premios', premio.id, 'emisor', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" placeholder="Emisor" />
                        <input type="text" value={premio.fecha} onChange={(e) => updateItem('premios', premio.id, 'fecha', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" placeholder="Fecha" />
                        <textarea value={premio.descripcion} onChange={(e) => updateItem('premios', premio.id, 'descripcion', e.target.value)} rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm resize-none" placeholder="Descripción" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'diseno' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.design.title}</h2>
                
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                  <label className="block text-sm font-medium text-gray-700 mb-4">{t.design.template}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'professional', name: t.design.professional, emoji: '💼' },
                      { id: 'modern', name: t.design.modern, emoji: '🎨' },
                      { id: 'minimal', name: t.design.minimal, emoji: '✨' },
                      { id: 'creative', name: 'Creativo', emoji: '🚀' },
                      { id: 'tech', name: 'Tech', emoji: '💻' },
                      { id: 'executive', name: 'Ejecutivo', emoji: '👔' }
                    ].map(tpl => (
                      <button key={tpl.id} onClick={() => updateField('plantilla', tpl.id)} className={`p-4 rounded-xl border-2 transition-all ${data.plantilla === tpl.id ? 'border-blue-600 bg-blue-50 shadow-md scale-105' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}>
                        <div className="text-2xl mb-1">{tpl.emoji}</div>
                        <div className="text-sm font-semibold text-center text-gray-900">{tpl.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Idioma del CV</label>
                  <div className="flex gap-3">
                    <button onClick={() => updateField('idiomaCv', 'es')} className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${data.idiomaCv === 'es' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>🇪🇸 Español</button>
                    <button onClick={() => updateField('idiomaCv', 'en')} className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${data.idiomaCv === 'en' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>🇬🇧 English</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">{t.design.uploadPhoto}</label>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 shadow-lg" style={{ borderColor: data.colorPrincipal }}>
                      <img src={data.foto} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                      <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm hover:shadow-md mb-3 font-medium">
                        <Camera className="w-4 h-4" /> {t.design.uploadPhoto}
                      </button>
                      <input type="text" value={data.foto} onChange={(e) => updateField('foto', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" placeholder={t.design.photoUrl} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">{t.design.primaryColor}</label>
                  <div className="flex items-center gap-4 mb-4">
                    <input type="color" value={data.colorPrincipal} onChange={(e) => updateField('colorPrincipal', e.target.value)} className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-gray-200 shadow-md" />
                    <input type="text" value={data.colorPrincipal} onChange={(e) => updateField('colorPrincipal', e.target.value)} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono font-medium" />
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {['#0066FF', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(color => (
                      <button key={color} onClick={() => updateField('colorPrincipal', color)} className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:scale-110 hover:shadow-md transition-all" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">{t.design.languages}</h3>
                  {data.idiomas.map((idioma, idx) => (
                    <div key={idx} className="flex gap-3 mb-3">
                      <input type="text" value={idioma.idioma} onChange={(e) => { const n = [...data.idiomas]; n[idx].idioma = e.target.value; updateField('idiomas', n); }} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.design.language} />
                      <input type="text" value={idioma.nivel} onChange={(e) => { const n = [...data.idiomas]; n[idx].nivel = e.target.value; updateField('idiomas', n); }} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.design.languageLevel} />
                      <button onClick={() => updateField('idiomas', data.idiomas.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => updateField('idiomas', [...data.idiomas, { idioma: '', nivel: '' }])} className="text-sm text-blue-600 font-semibold hover:text-blue-700">{t.design.addLanguage}</button>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-200/50">
                  <button onClick={exportPDF} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">
                    <Download className="w-5 h-5" /> {t.design.exportPDF}
                  </button>
                  <button onClick={resetData} className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-200 hover:shadow-md transition-all">
                    <Trash2 className="w-5 h-5" /> {t.design.resetAll}
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">💾</span> {t.design.autoSave}
                  </h3>
                  <p className="text-sm text-gray-600">{t.design.autoSaveDesc}</p>
                </div>
              </div>
            )}
          </div>
        </div>

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
          body * { visibility: hidden; }
          #cv-preview, #cv-preview * { visibility: visible; }
          #cv-preview { position: absolute; left: 0; top: 0; width: 210mm; height: 297mm; margin: 0; padding: 0; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
}

function ProfessionalTemplate({ data, t }) {
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ minHeight: '297mm' }}>
      <header className="bg-gradient-to-br text-white p-8 text-center relative" style={{ background: `linear-gradient(135deg, ${data.colorPrincipal} 0%, ${data.colorPrincipal}dd 100%)` }}>
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-extrabold mb-2">{data.nombre}</h1>
        <p className="text-xl opacity-95">{data.titulo}</p>
        <div className="flex justify-center gap-4 mt-4">
          {data.linkedin && <a href={`https://${data.linkedin}`} className="hover:scale-110 transition"><Linkedin className="w-5 h-5" /></a>}
          {data.github && <a href={`https://${data.github}`} className="hover:scale-110 transition"><Github className="w-5 h-5" /></a>}
          {data.portfolio && <a href={`https://${data.portfolio}`} className="hover:scale-110 transition"><Globe className="w-5 h-5" /></a>}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <aside className="bg-gray-50 p-6 space-y-6 border-r-2" style={{ borderColor: `${data.colorPrincipal}40` }}>
          <section>
            <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.contact}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5" style={{ color: data.colorPrincipal }} /><span className="text-gray-700">{data.telefono}</span></div>
              <div className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5" style={{ color: data.colorPrincipal }} /><span className="text-gray-700 break-all">{data.email}</span></div>
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" style={{ color: data.colorPrincipal }} /><span className="text-gray-700">{data.ubicacion}</span></div>
            </div>
          </section>

          {data.idiomas.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.languages}</h3>
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
            <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.availability}</h3>
            <div className="text-white text-sm font-bold px-3 py-2 rounded-lg text-center" style={{ backgroundColor: data.colorPrincipal }}>{data.disponibilidad}</div>
          </section>

          {data.hobbies.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.hobbies}</h3>
              <ul className="text-sm space-y-1">
                {data.hobbies.filter(h => h.trim()).map((hobby, idx) => (
                  <li key={idx} className="text-gray-700 flex items-center gap-2"><span style={{ color: data.colorPrincipal }}>●</span>{hobby}</li>
                ))}
              </ul>
            </section>
          )}

          {data.softSkills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.softSkills}</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.softSkills.filter(s => s.trim()).map((skill, idx) => (
                  <span key={idx} className="text-xs text-white px-2 py-1 rounded-full" style={{ backgroundColor: data.colorPrincipal }}>{skill}</span>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="md:col-span-2 p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.profile}</h2>
            <p className="text-sm text-gray-700 text-justify leading-relaxed">{data.sobreMi}</p>
            {data.sobreMiExtra && <p className="text-sm text-gray-700 text-justify leading-relaxed mt-2 pt-2 border-t border-dashed" style={{ borderColor: `${data.colorPrincipal}60` }}>{data.sobreMiExtra}</p>}
          </section>

          {data.experiencias.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.experience}</h2>
              <div className="space-y-4">
                {data.experiencias.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: data.colorPrincipal }}>
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: data.colorPrincipal }}></div>
                    <h3 className="font-bold text-gray-800">{exp.puesto}</h3>
                    <p className="text-sm font-semibold" style={{ color: data.colorPrincipal }}>{exp.empresa}</p>
                    <p className="text-xs text-gray-500 italic mb-2">{exp.fecha}</p>
                    <ul className="text-sm text-gray-700 space-y-0.5 list-disc list-inside">
                      {exp.descripcion.filter(d => d.trim()).map((desc, idx) => <li key={idx}>{desc}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.educacion.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.education}</h2>
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
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.technicalSkills}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-800">{skill.nombre}</span>
                      <span className="text-xs text-gray-500">{skill.nivel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${skill.nivel}%` }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${data.colorPrincipal}, ${data.colorPrincipal}dd)` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.proyectos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: data.colorPrincipal, borderColor: data.colorPrincipal }}>{t.projects}</h2>
              <div className="space-y-4">
                {data.proyectos.map((proyecto) => (
                  <div key={proyecto.id} className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: data.colorPrincipal }}>
                    <h3 className="font-bold text-gray-800">{proyecto.nombre}</h3>
                    <p className="text-xs text-gray-500 italic mb-2">{proyecto.fecha}</p>
                    <p className="text-sm text-gray-700 mb-2">{proyecto.descripcion}</p>
                    <p className="text-xs font-semibold" style={{ color: data.colorPrincipal }}>{t.technologies}: {proyecto.tecnologias}</p>
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

function ModernTemplate({ data, t }) {
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ minHeight: '297mm' }}>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <aside className="md:col-span-2 p-8 text-white relative" style={{ background: `linear-gradient(180deg, ${data.colorPrincipal} 0%, ${data.colorPrincipal}cc 100%)` }}>
          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-black mb-2">{data.nombre}</h1>
              <p className="text-lg opacity-90">{data.titulo}</p>
              <div className="flex justify-center gap-3 mt-4">
                {data.linkedin && <a href={`https://${data.linkedin}`}><Linkedin className="w-5 h-5 hover:scale-125 transition" /></a>}
                {data.github && <a href={`https://${data.github}`}><Github className="w-5 h-5 hover:scale-125 transition" /></a>}
                {data.portfolio && <a href={`https://${data.portfolio}`}><Globe className="w-5 h-5 hover:scale-125 transition" /></a>}
              </div>
            </div>

            <section>
              <h3 className="text-xl font-bold mb-4">{t.contact}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg"><Phone className="w-4 h-4" /><span>{data.telefono}</span></div>
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg"><Mail className="w-4 h-4" /><span className="break-all">{data.email}</span></div>
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg"><MapPin className="w-4 h-4" /><span>{data.ubicacion}</span></div>
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
                    <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>

        <main className="md:col-span-3 p-8 space-y-8">
          <section>
            <h2 className="text-3xl font-black mb-4" style={{ color: data.colorPrincipal }}>{t.profile}</h2>
            <p className="text-gray-700 leading-relaxed">{data.sobreMi}</p>
            {data.sobreMiExtra && <p className="text-gray-700 leading-relaxed mt-3">{data.sobreMiExtra}</p>}
          </section>

          {data.experiencias.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.experience}</h2>
              <div className="space-y-6">
                {data.experiencias.map((exp) => (
                  <div key={exp.id} className="border-l-4 pl-6" style={{ borderColor: data.colorPrincipal }}>
                    <h3 className="text-xl font-bold">{exp.puesto}</h3>
                    <p className="font-semibold mb-1" style={{ color: data.colorPrincipal }}>{exp.empresa}</p>
                    <p className="text-sm text-gray-500 italic mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" />{exp.fecha}</p>
                    <ul className="space-y-1 text-gray-700">
                      {exp.descripcion.filter(d => d.trim()).map((desc, idx) => (
                        <li key={idx} className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colorPrincipal }}></span><span className="text-sm">{desc}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.educacion.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.education}</h2>
              <div className="grid gap-4">
                {data.educacion.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 p-4 rounded-xl border-l-4" style={{ borderColor: data.colorPrincipal }}>
                    <h3 className="font-bold">{edu.titulo}</h3>
                    <p className="text-sm font-semibold" style={{ color: data.colorPrincipal }}>{edu.institucion}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.fecha}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.technicalSkills}</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{skill.nombre}</span>
                      <span className="text-sm text-gray-500">{skill.nivel}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${skill.nivel}%` }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ backgroundColor: data.colorPrincipal }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.proyectos.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.projects}</h2>
              <div className="space-y-4">
                {data.proyectos.map((proyecto) => (
                  <div key={proyecto.id} className="bg-gray-50 p-5 rounded-xl border-2 border-gray-100">
                    <h3 className="text-lg font-bold mb-1">{proyecto.nombre}</h3>
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

function MinimalTemplate({ data, t }) {
  return (
    <div className="bg-white shadow-2xl rounded-lg p-12" style={{ minHeight: '297mm' }}>
      <header className="text-center mb-12 pb-8 border-b-2" style={{ borderColor: data.colorPrincipal }}>
        <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2" style={{ borderColor: data.colorPrincipal }}>
          <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-light mb-2">{data.nombre}</h1>
        <p className="text-lg text-gray-600 mb-4">{data.titulo}</p>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.email}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.telefono}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.ubicacion}</span>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {data.linkedin && <a href={`https://${data.linkedin}`} style={{ color: data.colorPrincipal }}><Linkedin className="w-5 h-5" /></a>}
          {data.github && <a href={`https://${data.github}`} style={{ color: data.colorPrincipal }}><Github className="w-5 h-5" /></a>}
          {data.portfolio && <a href={`https://${data.portfolio}`} style={{ color: data.colorPrincipal }}><Globe className="w-5 h-5" /></a>}
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-light mb-4 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.profile}</h2>
        <p className="text-gray-700 leading-relaxed text-justify">{data.sobreMi}</p>
        {data.sobreMiExtra && <p className="text-gray-700 leading-relaxed text-justify mt-3">{data.sobreMiExtra}</p>}
      </section>

      {data.experiencias.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.experience}</h2>
          <div className="space-y-6">
            {data.experiencias.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.puesto}</h3>
                    <p className="text-gray-700">{exp.empresa}</p>
                  </div>
                  <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{exp.fecha}</span>
                </div>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  {exp.descripcion.filter(d => d.trim()).map((desc, idx) => <li key={idx} className="list-disc">{desc}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.educacion.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.education}</h2>
          <div className="space-y-4">
            {data.educacion.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.titulo}</h3>
                  <p className="text-sm text-gray-700">{edu.institucion}</p>
                </div>
                <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{edu.fecha}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.technicalSkills}</h2>
          <div className="grid grid-cols-3 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full border-8 flex items-center justify-center font-bold text-xl" style={{ borderColor: `${data.colorPrincipal}30`, color: data.colorPrincipal }}>{skill.nivel}%</div>
                <p className="text-sm font-semibold">{skill.nombre}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.proyectos.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.projects}</h2>
          <div className="space-y-5">
            {data.proyectos.map((proyecto) => (
              <div key={proyecto.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{proyecto.nombre}</h3>
                  <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{proyecto.fecha}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{proyecto.descripcion}</p>
                <p className="text-xs font-semibold" style={{ color: data.colorPrincipal }}>{proyecto.tecnologias}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.softSkills.length > 0 && (
        <section>
          <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.softSkills}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.softSkills.filter(s => s.trim()).map((skill, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full border-2 text-sm font-medium" style={{ borderColor: data.colorPrincipal, color: data.colorPrincipal }}>{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// PLANTILLA CREATIVA
function CreativeTemplate({ data, t }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 shadow-2xl rounded-3xl overflow-hidden p-12" style={{ minHeight: '297mm' }}>
      <div className="flex items-start gap-8 mb-8">
        <div className="w-48 h-48 rounded-3xl overflow-hidden border-8 border-white shadow-2xl transform -rotate-6" style={{ borderColor: data.colorPrincipal }}>
          <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{data.nombre}</h1>
          <p className="text-2xl text-gray-700 mb-4 font-light">{data.titulo}</p>
          <div className="flex gap-3">
            {data.linkedin && <a href={`https://${data.linkedin}`} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hover:scale-110 transition shadow-lg"><Linkedin className="w-6 h-6" /></a>}
            {data.github && <a href={`https://${data.github}`} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white hover:scale-110 transition shadow-lg"><Github className="w-6 h-6" /></a>}
            {data.portfolio && <a href={`https://${data.portfolio}`} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white hover:scale-110 transition shadow-lg"><Globe className="w-6 h-6" /></a>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow-lg">
          <Mail className="w-6 h-6 mb-2" style={{ color: data.colorPrincipal }} />
          <p className="text-xs text-gray-600 font-semibold mb-1">Email</p>
          <p className="text-sm font-medium text-gray-900 break-all">{data.email}</p>
        </div>
        <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow-lg">
          <Phone className="w-6 h-6 mb-2" style={{ color: data.colorPrincipal }} />
          <p className="text-xs text-gray-600 font-semibold mb-1">Teléfono</p>
          <p className="text-sm font-medium text-gray-900">{data.telefono}</p>
        </div>
        <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow-lg">
          <MapPin className="w-6 h-6 mb-2" style={{ color: data.colorPrincipal }} />
          <p className="text-xs text-gray-600 font-semibold mb-1">Ubicación</p>
          <p className="text-sm font-medium text-gray-900">{data.ubicacion}</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur p-8 rounded-3xl shadow-xl mb-8">
        <h2 className="text-3xl font-black mb-4" style={{ color: data.colorPrincipal }}>{t.profile}</h2>
        <p className="text-gray-700 leading-relaxed">{data.sobreMi} {data.sobreMiExtra}</p>
      </div>

      {data.experiencias.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.experience}</h2>
          <div className="space-y-4">
            {data.experiencias.map((exp) => (
              <div key={exp.id} className="bg-white/70 backdrop-blur p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900">{exp.puesto}</h3>
                <p className="font-semibold" style={{ color: data.colorPrincipal }}>{exp.empresa}</p>
                <p className="text-sm text-gray-500 mb-2">{exp.fecha}</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {exp.descripcion.filter(d => d.trim()).map((desc, idx) => <li key={idx}>• {desc}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.technicalSkills}</h2>
          <div className="grid grid-cols-4 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-white/70 backdrop-blur p-4 rounded-2xl text-center shadow-lg">
                <div className="text-3xl font-black mb-2" style={{ color: data.colorPrincipal }}>{skill.nivel}%</div>
                <p className="text-sm font-semibold text-gray-900">{skill.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// PLANTILLA TECH
function TechTemplate({ data, t }) {
  return (
    <div className="bg-gray-900 text-white shadow-2xl overflow-hidden font-mono" style={{ minHeight: '297mm' }}>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-cyan-400 shadow-xl">
            <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-cyan-200 mb-1">{'>'} whoami</div>
            <h1 className="text-4xl font-bold mb-2">{data.nombre}</h1>
            <p className="text-lg text-cyan-100">{data.titulo}</p>
            <div className="flex gap-3 mt-3">
              {data.linkedin && <a href={`https://${data.linkedin}`} className="text-cyan-200 hover:text-white"><Linkedin className="w-5 h-5" /></a>}
              {data.github && <a href={`https://${data.github}`} className="text-cyan-200 hover:text-white"><Github className="w-5 h-5" /></a>}
              {data.portfolio && <a href={`https://${data.portfolio}`} className="text-cyan-200 hover:text-white"><Globe className="w-5 h-5" /></a>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
          <div className="text-cyan-400 text-sm mb-2">$ cat contact.txt</div>
          <div className="space-y-2 text-sm">
            <p><span className="text-cyan-400">email:</span> {data.email}</p>
            <p><span className="text-cyan-400">phone:</span> {data.telefono}</p>
            <p><span className="text-cyan-400">location:</span> {data.ubicacion}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
          <div className="text-cyan-400 text-sm mb-3">$ cat about.md</div>
          <p className="text-gray-300 text-sm leading-relaxed">{data.sobreMi}</p>
        </div>

        {data.experiencias.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
            <div className="text-cyan-400 text-sm mb-4">$ ls -la experience/</div>
            <div className="space-y-4">
              {data.experiencias.map((exp) => (
                <div key={exp.id} className="border-l-2 border-cyan-500 pl-4">
                  <div className="text-lg font-bold text-white">{exp.puesto}</div>
                  <div className="text-cyan-400 text-sm">{exp.empresa}</div>
                  <div className="text-gray-500 text-xs mb-2">{exp.fecha}</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {exp.descripcion.filter(d => d.trim()).map((desc, idx) => <li key={idx}>→ {desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
            <div className="text-cyan-400 text-sm mb-4">$ ./show_skills.sh</div>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{skill.nombre}</span>
                    <span className="text-cyan-400">{skill.nivel}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${skill.nivel}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// PLANTILLA EJECUTIVA
function ExecutiveTemplate({ data, t }) {
  return (
    <div className="bg-white shadow-2xl" style={{ minHeight: '297mm' }}>
      <div className="border-t-8" style={{ borderColor: data.colorPrincipal }}>
        <div className="p-12">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-5xl font-light tracking-wide text-gray-900 mb-3">{data.nombre}</h1>
              <p className="text-xl text-gray-600 font-light mb-6">{data.titulo}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {data.email}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {data.telefono}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {data.ubicacion}</p>
              </div>
            </div>
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl" style={{ borderColor: data.colorPrincipal }}>
              <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-8 mb-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4 uppercase tracking-widest" style={{ color: data.colorPrincipal }}>{t.profile}</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.sobreMi} {data.sobreMiExtra}</p>
          </div>

          {data.experiencias.length > 0 && (
            <div className="border-t-2 border-gray-200 pt-8 mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-widest" style={{ color: data.colorPrincipal }}>{t.experience}</h2>
              <div className="space-y-6">
                {data.experiencias.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.puesto}</h3>
                        <p className="text-gray-700">{exp.empresa}</p>
                      </div>
                      <span className="text-sm text-gray-500 font-light italic">{exp.fecha}</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 ml-6">
                      {exp.descripcion.filter(d => d.trim()).map((desc, idx) => <li key={idx} className="list-disc">{desc}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.educacion.length > 0 && (
            <div className="border-t-2 border-gray-200 pt-8 mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-widest" style={{ color: data.colorPrincipal }}>{t.education}</h2>
              <div className="space-y-4">
                {data.educacion.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.titulo}</h3>
                      <p className="text-sm text-gray-700">{edu.institucion}</p>
                    </div>
                    <span className="text-sm text-gray-500 font-light italic">{edu.fecha}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="border-t-2 border-gray-200 pt-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-widest" style={{ color: data.colorPrincipal }}>{t.technicalSkills}</h2>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900 w-32">{skill.nombre}</span>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${skill.nivel}%`, backgroundColor: data.colorPrincipal }}></div>
                    </div>
                    <span className="text-xs text-gray-500 w-10 text-right">{skill.nivel}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}