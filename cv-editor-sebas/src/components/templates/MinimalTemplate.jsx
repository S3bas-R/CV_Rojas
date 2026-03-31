import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const MinimalTemplate = ({ data, t }) => {
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

            {data.certificaciones?.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.certifications}</h2>
                    <div className="space-y-4">
                        {data.certificaciones.map((cert) => (
                            <div key={cert.id} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{cert.nombre}</h3>
                                    <p className="text-sm text-gray-700">{cert.emisor}</p>
                                    {cert.credencial && <p className="text-xs text-gray-500 mt-1">ID: {cert.credencial}</p>}
                                </div>
                                <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{cert.fecha}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.voluntariado?.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.volunteer}</h2>
                    <div className="space-y-4">
                        {data.voluntariado.map((vol) => (
                            <div key={vol.id}>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold">{vol.rol}</h3>
                                    <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{vol.fecha}</span>
                                </div>
                                <p className="text-sm text-gray-700">{vol.organizacion}</p>
                                {vol.descripcion && <p className="text-sm text-gray-600 mt-1">{vol.descripcion}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.premios?.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-light mb-6 pb-2 border-b" style={{ color: data.colorPrincipal }}>{t.awards}</h2>
                    <div className="space-y-4">
                        {data.premios.map((premio) => (
                            <div key={premio.id}>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold">{premio.titulo}</h3>
                                    <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">{premio.fecha}</span>
                                </div>
                                <p className="text-sm text-gray-700">{premio.emisor}</p>
                                {premio.descripcion && <p className="text-sm text-gray-600 mt-1">{premio.descripcion}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
