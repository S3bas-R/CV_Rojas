import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const CustomTemplate = ({ data, t }) => {
    // Valores por defecto en caso de que un registro antiguo no los tenga
    const custom = data.customStyle || {
        fontFamily: "'Inter', sans-serif",
        headerAlignment: "left",
        layout: "two-column",
        backgroundColor: "#ffffff",
        textColor: "#1f2937"
    };

    const headerAlignClass = custom.headerAlignment === 'center' ? 'text-center' 
                           : custom.headerAlignment === 'right' ? 'text-right' 
                           : 'text-left';

    const headerFlexClass = custom.headerAlignment === 'center' ? 'flex-col items-center justify-center'
                          : custom.headerAlignment === 'right' ? 'flex-row-reverse items-center justify-start gap-6'
                          : 'flex-row items-center justify-start gap-6';

    const getLayoutClasses = () => {
        if (custom.layout === 'one-column') {
            return "flex flex-col gap-6";
        }
        return "grid grid-cols-1 md:grid-cols-3 gap-6";
    };

    return (
        <div 
            className="shadow-2xl rounded-sm p-10" 
            style={{ 
                minHeight: '297mm',
                fontFamily: custom.fontFamily,
                backgroundColor: custom.backgroundColor,
                color: custom.textColor
            }}
        >
            {/* Header */}
            <header className={`flex ${headerFlexClass} mb-8 border-b-2 pb-6`} style={{ borderBottomColor: data.colorPrincipal }}>
                {data.foto && (
                    <img 
                        src={data.foto} 
                        alt={data.nombre} 
                        className="w-32 h-32 rounded-full object-cover border-4" 
                        style={{ borderColor: data.colorPrincipal }} 
                    />
                )}
                <div className={`flex-1 ${headerAlignClass}`}>
                    <h1 className="text-4xl font-extrabold uppercase tracking-tight" style={{ color: data.colorPrincipal }}>
                        {data.nombre}
                    </h1>
                    <p className="text-xl font-medium mt-1 mb-3 opacity-90">{data.titulo}</p>
                    
                    <div className={`flex flex-wrap gap-4 text-sm font-medium ${custom.headerAlignment === 'center' ? 'justify-center' : custom.headerAlignment === 'right' ? 'justify-end' : 'justify-start'} opacity-80`}>
                        {data.email && <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {data.email}</div>}
                        {data.telefono && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {data.telefono}</div>}
                        {data.ubicacion && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {data.ubicacion}</div>}
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className={getLayoutClasses()}>
                {/* Lateral / Sidebar (en caso de 2 columnas) */}
                <aside className={custom.layout === 'one-column' ? 'w-full grid grid-cols-1 md:grid-cols-2 gap-6' : 'col-span-1 flex flex-col gap-6'}>
                    
                    {/* Social networks & links */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: data.colorPrincipal }}>
                            {t.contact}
                        </h2>
                        {data.linkedin && (
                            <a href={`https://${data.linkedin}`} className="flex items-center gap-2 text-sm hover:underline">
                                <Linkedin className="w-4 h-4" /> {data.linkedin}
                            </a>
                        )}
                        {data.github && (
                            <a href={`https://${data.github}`} className="flex items-center gap-2 text-sm hover:underline">
                                <Github className="w-4 h-4" /> {data.github}
                            </a>
                        )}
                        {data.portfolio && (
                            <a href={`https://${data.portfolio}`} className="flex items-center gap-2 text-sm hover:underline">
                                <Globe className="w-4 h-4" /> {data.portfolio}
                            </a>
                        )}
                    </div>

                    {/* About me */}
                    {data.sobreMi && (
                        <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: data.colorPrincipal }}>
                                {t.profile}
                            </h2>
                            <p className="text-sm leading-relaxed opacity-90">
                                {data.sobreMi} {data.sobreMiExtra}
                            </p>
                        </div>
                    )}

                    {/* Habilidades */}
                    {data.skills?.length > 0 && (
                        <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: data.colorPrincipal }}>
                                {t.technicalSkills}
                            </h2>
                            <div className="space-y-3">
                                {data.skills.map(skill => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between text-sm mb-1 font-medium">
                                            <span>{skill.nombre}</span>
                                            <span>{skill.nivel}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{ width: `${skill.nivel}%`, backgroundColor: data.colorPrincipal }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Idiomas */}
                    {data.idiomas?.length > 0 && (
                        <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: data.colorPrincipal }}>
                                {t.languages}
                            </h2>
                            <div className="space-y-2">
                                {data.idiomas.map((idioma, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="font-semibold">{idioma.idioma}</span>
                                        <span className="opacity-80">{idioma.nivel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main Content (Experiencia, Educación, Proyectos) */}
                <main className={custom.layout === 'one-column' ? 'w-full' : 'col-span-2'}>
                    <div className="flex flex-col gap-8">
                        
                        {/* Experiencia */}
                        {data.experiencias?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: data.colorPrincipal, color: data.colorPrincipal }}>
                                    {t.experience}
                                </h2>
                                <div className="space-y-6">
                                    {data.experiencias.map(exp => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-bold">{exp.puesto}</h3>
                                                <span className="text-sm font-semibold opacity-80">{exp.fecha}</span>
                                            </div>
                                            <p className="text-md font-medium mb-2 opacity-90">{exp.empresa}</p>
                                            <ul className="list-disc list-inside text-sm space-y-1 opacity-90">
                                                {exp.descripcion.filter(d => d.trim()).map((desc, i) => (
                                                    <li key={i}>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Educación */}
                        {data.educacion?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: data.colorPrincipal, color: data.colorPrincipal }}>
                                    {t.education}
                                </h2>
                                <div className="space-y-5">
                                    {data.educacion.map(edu => (
                                        <div key={edu.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-bold">{edu.titulo}</h3>
                                                <span className="text-sm font-semibold opacity-80">{edu.fecha}</span>
                                            </div>
                                            <p className="text-md font-medium opacity-90">{edu.institucion}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Proyectos */}
                        {data.proyectos?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: data.colorPrincipal, color: data.colorPrincipal }}>
                                    {t.projects}
                                </h2>
                                <div className="space-y-5">
                                    {data.proyectos.map(proj => (
                                        <div key={proj.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-bold">{proj.nombre}</h3>
                                                <span className="text-sm font-semibold opacity-80">{proj.fecha}</span>
                                            </div>
                                            <p className="text-sm italic opacity-80 mb-1">{proj.tecnologias}</p>
                                            <p className="text-sm opacity-90">{proj.descripcion}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certificaciones */}
                        {data.certificaciones?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: data.colorPrincipal, color: data.colorPrincipal }}>
                                    {t.certifications}
                                </h2>
                                <div className="space-y-5">
                                    {data.certificaciones.map(cert => (
                                        <div key={cert.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-bold">{cert.nombre}</h3>
                                                <span className="text-sm font-semibold opacity-80">{cert.fecha}</span>
                                            </div>
                                            <p className="text-md font-medium opacity-90">{cert.emisor}</p>
                                            {cert.credencial && <p className="text-xs opacity-70 mt-1">ID: {cert.credencial}</p>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Voluntariado */}
                        {data.voluntariado?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: data.colorPrincipal, color: data.colorPrincipal }}>
                                    {t.volunteer}
                                </h2>
                                <div className="space-y-5">
                                    {data.voluntariado.map(vol => (
                                        <div key={vol.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-bold">{vol.rol}</h3>
                                                <span className="text-sm font-semibold opacity-80">{vol.fecha}</span>
                                            </div>
                                            <p className="text-md font-medium mb-1 opacity-90">{vol.organizacion}</p>
                                            {vol.descripcion && <p className="text-sm opacity-90">{vol.descripcion}</p>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Premios */}
                        {data.premios?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: data.colorPrincipal, color: data.colorPrincipal }}>
                                    {t.awards}
                                </h2>
                                <div className="space-y-5">
                                    {data.premios.map(premio => (
                                        <div key={premio.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-bold">{premio.titulo}</h3>
                                                <span className="text-sm font-semibold opacity-80">{premio.fecha}</span>
                                            </div>
                                            <p className="text-md font-medium mb-1 opacity-90">{premio.emisor}</p>
                                            {premio.descripcion && <p className="text-sm opacity-90">{premio.descripcion}</p>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};
