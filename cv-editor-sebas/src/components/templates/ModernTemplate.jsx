import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe, Calendar, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export const ModernTemplate = ({ data, t }) => {
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

                    {data.certificaciones?.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.certifications}</h2>
                            <div className="space-y-4">
                                {data.certificaciones.map((cert) => (
                                    <div key={cert.id} className="bg-gray-50 p-5 rounded-xl border-2 border-gray-100">
                                        <h3 className="text-lg font-bold mb-1">{cert.nombre}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{cert.fecha}</p>
                                        <p className="text-sm font-bold" style={{ color: data.colorPrincipal }}>{cert.emisor}</p>
                                        {cert.credencial && <p className="text-xs text-gray-700 mt-1">ID: {cert.credencial}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.voluntariado?.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.volunteer}</h2>
                            <div className="space-y-4">
                                {data.voluntariado.map((vol) => (
                                    <div key={vol.id} className="bg-gray-50 p-5 rounded-xl border-2 border-gray-100">
                                        <h3 className="text-lg font-bold mb-1">{vol.rol}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{vol.fecha}</p>
                                        <p className="text-sm font-bold" style={{ color: data.colorPrincipal }}>{vol.organizacion}</p>
                                        {vol.descripcion && <p className="text-sm text-gray-700 mt-2">{vol.descripcion}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.premios?.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-black mb-6" style={{ color: data.colorPrincipal }}>{t.awards}</h2>
                            <div className="space-y-4">
                                {data.premios.map((premio) => (
                                    <div key={premio.id} className="bg-gray-50 p-5 rounded-xl border-2 border-gray-100">
                                        <h3 className="text-lg font-bold mb-1">{premio.titulo}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{premio.fecha}</p>
                                        <p className="text-sm font-bold" style={{ color: data.colorPrincipal }}>{premio.emisor}</p>
                                        {premio.descripcion && <p className="text-sm text-gray-700 mt-2">{premio.descripcion}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};
