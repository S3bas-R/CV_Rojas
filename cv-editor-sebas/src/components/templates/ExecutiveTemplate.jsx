import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ExecutiveTemplate = ({ data, t }) => {
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
                        <div className="border-t-2 border-gray-200 pt-8 mb-8">
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

                    {data.certificaciones?.length > 0 && (
                        <div className="border-t-2 border-gray-200 pt-8 mb-8">
                            <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-widest" style={{ color: data.colorPrincipal }}>{t.certifications}</h2>
                            <div className="space-y-4">
                                {data.certificaciones.map((cert) => (
                                    <div key={cert.id} className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{cert.nombre}</h3>
                                            <p className="text-gray-700">{cert.emisor}</p>
                                            {cert.credencial && <p className="text-xs text-gray-500 mt-1">ID: {cert.credencial}</p>}
                                        </div>
                                        <span className="text-sm text-gray-500 font-light italic">{cert.fecha}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.voluntariado?.length > 0 && (
                        <div className="border-t-2 border-gray-200 pt-8 mb-8">
                            <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-widest" style={{ color: data.colorPrincipal }}>{t.volunteer}</h2>
                            <div className="space-y-4">
                                {data.voluntariado.map((vol) => (
                                    <div key={vol.id}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{vol.rol}</h3>
                                                <p className="text-gray-700">{vol.organizacion}</p>
                                            </div>
                                            <span className="text-sm text-gray-500 font-light italic">{vol.fecha}</span>
                                        </div>
                                        {vol.descripcion && <p className="text-sm text-gray-600 mt-1">{vol.descripcion}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.premios?.length > 0 && (
                        <div className="border-t-2 border-gray-200 pt-8 mb-8">
                            <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-widest" style={{ color: data.colorPrincipal }}>{t.awards}</h2>
                            <div className="space-y-4">
                                {data.premios.map((premio) => (
                                    <div key={premio.id}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{premio.titulo}</h3>
                                                <p className="text-gray-700">{premio.emisor}</p>
                                            </div>
                                            <span className="text-sm text-gray-500 font-light italic">{premio.fecha}</span>
                                        </div>
                                        {premio.descripcion && <p className="text-sm text-gray-600 mt-1">{premio.descripcion}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
