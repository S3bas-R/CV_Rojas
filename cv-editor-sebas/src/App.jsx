import React, { useState, useRef } from 'react';
import { Palette, User, Briefcase, GraduationCap, Code, Rocket, Plus, Settings, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

import { translations } from './constants/translations';
import { useCV } from './hooks/useCV';

import {
  ProfessionalTemplate, ModernTemplate, MinimalTemplate,
  CreativeTemplate, TechTemplate, ExecutiveTemplate
} from './components/templates';

import {
  PersonalForm, ExperienceForm, EducationForm, SkillsForm,
  ProjectsForm, ExtrasForm, DesignForm, CloudForm
} from './components/editor';

/**
 * Componente Principal de la Aplicación.
 * Estructura general: Barra lateral (editor) y Vista previa.
 * Ahora incluye soporte para autenticación y guardado en la nube.
 */
export default function CVEditor() {
  const [activeTab, setActiveTab] = useState('personal');
  const [language, setLanguage] = useState('es');

  // Custom Hook para manejar la lógica del CV
  const {
    data, updateField, addItem, removeItem, updateItem, resetData
  } = useCV();

  const printRef = useRef();

  // Selección de idioma
  const t = translations[language];

  // Función para renderizar la plantilla seleccionada
  const renderTemplate = () => {
    const tCv = translations[data.idiomaCv].cv;
    const props = { data, t: tCv };

    switch (data.plantilla) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'minimal': return <MinimalTemplate {...props} />;
      case 'creative': return <CreativeTemplate {...props} />;
      case 'tech': return <TechTemplate {...props} />;
      case 'executive': return <ExecutiveTemplate {...props} />;
      default: return <ProfessionalTemplate {...props} />;
    }
  };

  // Definición de las pestañas del editor
  const tabs = [
    { id: 'personal', icon: User, label: t.tabs.personal },
    { id: 'experiencia', icon: Briefcase, label: t.tabs.experience },
    { id: 'educacion', icon: GraduationCap, label: t.tabs.education },
    { id: 'skills', icon: Code, label: t.tabs.skills },
    { id: 'proyectos', icon: Rocket, label: t.tabs.projects },
    { id: 'extras', icon: Plus, label: 'Extras' },
    { id: 'diseno', icon: Settings, label: t.tabs.design },
    { id: 'cloud', icon: Cloud, label: 'Nube' }
  ];

  // Función para exportar a PDF (Imprimir)
  const exportPDF = () => window.print();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fondo Animado */}
      <motion.div
        className="fixed inset-0 opacity-20 pointer-events-none"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ background: `radial-gradient(circle, ${data.colorPrincipal}40 0%, transparent 50%)`, backgroundSize: '200% 200%' }}
      />

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

        {/* PANEL IZQUIERDO: EDITOR */}
        <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-xl overflow-y-auto shadow-2xl border-r border-gray-200/50 h-screen sticky top-0">

          {/* Header del Editor */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 p-6 z-20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  {t.editorTitle}
                </h1>
                <p className="text-xs text-gray-500 mt-1 font-light ml-14">{t.subtitle}</p>
              </div>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium cursor-pointer border hover:bg-gray-200 transition-all">
                <option value="es">🇪🇸 ES</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </div>
          </div>

          {/* Navegación de Pestañas */}
          <div className="flex overflow-x-auto bg-white/50 backdrop-blur border-b border-gray-200/30 sticky top-[88px] z-10 px-4 py-2 gap-1 no-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 whitespace-nowrap transition-all font-medium rounded-lg text-sm ${activeTab === tab.id ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Contenido del Formulario */}
          <div className="p-6 pb-20">
            {activeTab === 'personal' && <PersonalForm data={data} updateField={updateField} t={t.personal} />}
            {activeTab === 'experiencia' && <ExperienceForm data={data} updateItem={updateItem} addItem={addItem} removeItem={removeItem} t={t.experience} />}
            {activeTab === 'educacion' && <EducationForm data={data} updateItem={updateItem} addItem={addItem} removeItem={removeItem} t={t.education} />}
            {activeTab === 'skills' && <SkillsForm data={data} updateItem={updateItem} updateField={updateField} addItem={addItem} removeItem={removeItem} t={t.skills} />}
            {activeTab === 'proyectos' && <ProjectsForm data={data} updateItem={updateItem} addItem={addItem} removeItem={removeItem} t={t.projects} />}
            {activeTab === 'extras' && <ExtrasForm data={data} updateItem={updateItem} addItem={addItem} removeItem={removeItem} t={t} />}
            {activeTab === 'diseno' && <DesignForm data={data} updateField={updateField} t={t.design} exportPDF={exportPDF} resetData={resetData} />}
            {activeTab === 'cloud' && <CloudForm data={data} t={t} />}
          </div>
        </div>

        {/* PANEL DERECHO: VISTA PREVIA */}
        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-[210mm] mx-auto transition-all duration-500 ease-in-out transform origin-top scale-95 lg:scale-100">
            <div ref={printRef} id="cv-preview">
              {renderTemplate()}
            </div>
          </div>
        </div>

      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cv-preview, #cv-preview * { visibility: visible; }
          #cv-preview { position: absolute; left: 0; top: 0; width: 210mm; height: 297mm; margin: 0; padding: 0; }
          @page { size: A4; margin: 0; }
          /* Ocultar scrollbars al imprimir */
          ::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </div>
  );
}