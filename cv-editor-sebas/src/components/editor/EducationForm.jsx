import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm = ({ data, updateItem, addItem, removeItem, t }) => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
                <button onClick={() => addItem('educacion')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium">
                    <Plus className="w-4 h-4" /> {t.add}
                </button>
            </div>
            {data.educacion.map((edu) => (
                <div key={edu.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/50 relative hover:shadow-md transition-all">
                    <button onClick={() => removeItem('educacion', edu.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-3 pr-8">
                        <input type="text" value={edu.titulo} onChange={(e) => updateItem('educacion', edu.id, 'titulo', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.degree} />
                        <input type="text" value={edu.institucion} onChange={(e) => updateItem('educacion', edu.id, 'institucion', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.institution} />
                        <input type="text" value={edu.fecha} onChange={(e) => updateItem('educacion', edu.id, 'fecha', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.date} />
                    </div>
                </div>
            ))}
        </div>
    );
};
