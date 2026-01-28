import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const SkillsForm = ({ data, updateItem, updateField, addItem, removeItem, t }) => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
                <button onClick={() => addItem('skills')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium">
                    <Plus className="w-4 h-4" /> {t.add}
                </button>
            </div>
            {data.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/50 relative hover:shadow-md transition-all">
                    <button onClick={() => removeItem('skills', skill.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-4 pr-8">
                        <input type="text" value={skill.nombre} onChange={(e) => updateItem('skills', skill.id, 'nombre', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.name} />
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-medium text-gray-700">{t.level}</label>
                                <span className="text-sm font-semibold text-blue-600">{skill.nivel}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={skill.nivel} onChange={(e) => updateItem('skills', skill.id, 'nivel', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
                        </div>
                    </div>
                </div>
            ))}
            <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.softSkills}</label>
                <textarea value={data.softSkills.join(', ')} onChange={(e) => updateField('softSkills', e.target.value.split(',').map(s => s.trim()))} rows={3} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" />
            </div>
        </div>
    );
};
