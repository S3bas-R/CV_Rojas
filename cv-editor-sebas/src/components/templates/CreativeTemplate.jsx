import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const CreativeTemplate = ({ data, t }) => {
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
};
