import React, { useRef } from 'react';
import { Download, Trash2, Camera } from 'lucide-react';

export const DesignForm = ({ data, updateField, t, exportPDF, resetData }) => {
    const fileInputRef = useRef();

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => updateField('foto', reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.title}</h2>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                <label className="block text-sm font-medium text-gray-700 mb-4">{t.template}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { id: 'professional', name: t.professional, emoji: '💼' },
                        { id: 'modern', name: t.modern, emoji: '🎨' },
                        { id: 'minimal', name: t.minimal, emoji: '✨' },
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
                <label className="block text-sm font-medium text-gray-700 mb-4">{t.uploadPhoto}</label>
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 shadow-lg" style={{ borderColor: data.colorPrincipal }}>
                        <img src={data.foto} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm hover:shadow-md mb-3 font-medium">
                            <Camera className="w-4 h-4" /> {t.uploadPhoto}
                        </button>
                        <input type="text" value={data.foto} onChange={(e) => updateField('foto', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" placeholder={t.photoUrl} />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">{t.primaryColor}</label>
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
                <h3 className="font-semibold text-gray-900 mb-4">{t.languages}</h3>
                {data.idiomas.map((idioma, idx) => (
                    <div key={idx} className="flex gap-3 mb-3">
                        <input type="text" value={idioma.idioma} onChange={(e) => { const n = [...data.idiomas]; n[idx].idioma = e.target.value; updateField('idiomas', n); }} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.language} />
                        <input type="text" value={idioma.nivel} onChange={(e) => { const n = [...data.idiomas]; n[idx].nivel = e.target.value; updateField('idiomas', n); }} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.languageLevel} />
                        <button onClick={() => updateField('idiomas', data.idiomas.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-xl transition-all">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
                <button onClick={() => updateField('idiomas', [...data.idiomas, { idioma: '', nivel: '' }])} className="text-sm text-blue-600 font-semibold hover:text-blue-700">{t.addLanguage}</button>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200/50">
                <button onClick={exportPDF} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">
                    <Download className="w-5 h-5" /> {t.exportPDF}
                </button>
                <button onClick={resetData} className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-200 hover:shadow-md transition-all">
                    <Trash2 className="w-5 h-5" /> {t.resetAll}
                </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">💾</span> {t.autoSave}
                </h3>
                <p className="text-sm text-gray-600">{t.autoSaveDesc}</p>
            </div>
        </div>
    );
};
