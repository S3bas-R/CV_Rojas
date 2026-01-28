import React from 'react';
import { Linkedin, Github, Globe } from 'lucide-react';

export const PersonalForm = ({ data, updateField, t }) => {
    return (
        <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.title}</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.fullName}</label>
                <input type="text" value={data.nombre} onChange={(e) => updateField('nombre', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.fullName} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.jobTitle}</label>
                <input type="text" value={data.titulo} onChange={(e) => updateField('titulo', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.jobTitle} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
                    <input type="email" value={data.email} onChange={(e) => updateField('email', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.email} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
                    <input type="tel" value={data.telefono} onChange={(e) => updateField('telefono', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.phone} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.location}</label>
                <input type="text" value={data.ubicacion} onChange={(e) => updateField('ubicacion', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.location} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.availability}</label>
                <input type="text" value={data.disponibilidad} onChange={(e) => updateField('disponibilidad', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.availability} />
            </div>

            <div className="border-t border-gray-200/50 pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">{t.socialNetworks}</h3>
                <div className="space-y-3">
                    <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0"><Linkedin className="w-5 h-5 text-blue-600" /></div><input type="text" value={data.linkedin} onChange={(e) => updateField('linkedin', e.target.value)} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="LinkedIn" /></div>
                    <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><Github className="w-5 h-5 text-gray-800" /></div><input type="text" value={data.github} onChange={(e) => updateField('github', e.target.value)} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="GitHub" /></div>
                    <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0"><Globe className="w-5 h-5 text-green-600" /></div><input type="text" value={data.portfolio} onChange={(e) => updateField('portfolio', e.target.value)} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Portfolio" /></div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.aboutMe}</label>
                <textarea value={data.sobreMi} onChange={(e) => updateField('sobreMi', e.target.value)} rows={4} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder={t.aboutMe} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.additionalInfo}</label>
                <textarea value={data.sobreMiExtra} onChange={(e) => updateField('sobreMiExtra', e.target.value)} rows={3} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder={t.additionalInfo} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.hobbies}</label>
                <input type="text" value={data.hobbies.join(', ')} onChange={(e) => updateField('hobbies', e.target.value.split(',').map(h => h.trim()))} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder={t.hobbies} />
            </div>
        </div>
    );
};
