import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfessionalTemplate = ({ data, t }) => {
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
};
