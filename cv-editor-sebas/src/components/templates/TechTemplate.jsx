import React from 'react';
import { Linkedin, Github, Globe } from 'lucide-react';

export const TechTemplate = ({ data, t }) => {
    return (
        <div className="bg-gray-900 text-white shadow-2xl overflow-hidden font-mono" style={{ minHeight: '297mm' }}>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8">
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-cyan-400 shadow-xl">
                        <img src={data.foto} alt={data.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-cyan-200 mb-1">{'>'} whoami</div>
                        <h1 className="text-4xl font-bold mb-2">{data.nombre}</h1>
                        <p className="text-lg text-cyan-100">{data.titulo}</p>
                        <div className="flex gap-3 mt-3">
                            {data.linkedin && <a href={`https://${data.linkedin}`} className="text-cyan-200 hover:text-white"><Linkedin className="w-5 h-5" /></a>}
                            {data.github && <a href={`https://${data.github}`} className="text-cyan-200 hover:text-white"><Github className="w-5 h-5" /></a>}
                            {data.portfolio && <a href={`https://${data.portfolio}`} className="text-cyan-200 hover:text-white"><Globe className="w-5 h-5" /></a>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
                    <div className="text-cyan-400 text-sm mb-2">$ cat contact.txt</div>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-cyan-400">email:</span> {data.email}</p>
                        <p><span className="text-cyan-400">phone:</span> {data.telefono}</p>
                        <p><span className="text-cyan-400">location:</span> {data.ubicacion}</p>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
                    <div className="text-cyan-400 text-sm mb-3">$ cat about.md</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{data.sobreMi}</p>
                </div>

                {data.experiencias.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
                        <div className="text-cyan-400 text-sm mb-4">$ ls -la experience/</div>
                        <div className="space-y-4">
                            {data.experiencias.map((exp) => (
                                <div key={exp.id} className="border-l-2 border-cyan-500 pl-4">
                                    <div className="text-lg font-bold text-white">{exp.puesto}</div>
                                    <div className="text-cyan-400 text-sm">{exp.empresa}</div>
                                    <div className="text-gray-500 text-xs mb-2">{exp.fecha}</div>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                        {exp.descripcion.filter(d => d.trim()).map((desc, idx) => <li key={idx}>→ {desc}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.skills.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30">
                        <div className="text-cyan-400 text-sm mb-4">$ ./show_skills.sh</div>
                        <div className="space-y-3">
                            {data.skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">{skill.nombre}</span>
                                        <span className="text-cyan-400">{skill.nivel}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${skill.nivel}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
