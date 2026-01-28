import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const ExtrasForm = ({ data, updateItem, addItem, removeItem, t }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Secciones Adicionales</h2>

            {/* CERTIFICACIONES */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">🏆 Certificaciones</h3>
                    <button onClick={() => addItem('certificaciones')} className="flex items-center gap-2 bg-yellow-600 text-white px-3 py-2 rounded-xl hover:bg-yellow-700 transition-all text-sm font-medium">
                        <Plus className="w-4 h-4" /> Añadir
                    </button>
                </div>
                {data.certificaciones?.map((cert) => (
                    <div key={cert.id} className="bg-white p-4 rounded-xl border border-yellow-200/50 mb-3 relative">
                        <button onClick={() => removeItem('certificaciones', cert.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="space-y-2 pr-6">
                            <input type="text" value={cert.nombre} onChange={(e) => updateItem('certificaciones', cert.id, 'nombre', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="Nombre certificación" />
                            <input type="text" value={cert.emisor} onChange={(e) => updateItem('certificaciones', cert.id, 'emisor', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="Emisor" />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={cert.fecha} onChange={(e) => updateItem('certificaciones', cert.id, 'fecha', e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="Fecha" />
                                <input type="text" value={cert.credencial} onChange={(e) => updateItem('certificaciones', cert.id, 'credencial', e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm" placeholder="ID Credencial" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* VOLUNTARIADO */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">🤝 Voluntariado</h3>
                    <button onClick={() => addItem('voluntariado')} className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-xl hover:bg-green-700 transition-all text-sm font-medium">
                        <Plus className="w-4 h-4" /> Añadir
                    </button>
                </div>
                {data.voluntariado?.map((vol) => (
                    <div key={vol.id} className="bg-white p-4 rounded-xl border border-green-200/50 mb-3 relative">
                        <button onClick={() => removeItem('voluntariado', vol.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="space-y-2 pr-6">
                            <input type="text" value={vol.organizacion} onChange={(e) => updateItem('voluntariado', vol.id, 'organizacion', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="Organización" />
                            <input type="text" value={vol.rol} onChange={(e) => updateItem('voluntariado', vol.id, 'rol', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="Rol" />
                            <input type="text" value={vol.fecha} onChange={(e) => updateItem('voluntariado', vol.id, 'fecha', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="Fecha" />
                            <textarea value={vol.descripcion} onChange={(e) => updateItem('voluntariado', vol.id, 'descripcion', e.target.value)} rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm resize-none" placeholder="Descripción" />
                        </div>
                    </div>
                ))}
            </div>

            {/* PREMIOS */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">🏅 Premios y Reconocimientos</h3>
                    <button onClick={() => addItem('premios')} className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-xl hover:bg-purple-700 transition-all text-sm font-medium">
                        <Plus className="w-4 h-4" /> Añadir
                    </button>
                </div>
                {data.premios?.map((premio) => (
                    <div key={premio.id} className="bg-white p-4 rounded-xl border border-purple-200/50 mb-3 relative">
                        <button onClick={() => removeItem('premios', premio.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="space-y-2 pr-6">
                            <input type="text" value={premio.titulo} onChange={(e) => updateItem('premios', premio.id, 'titulo', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" placeholder="Título del premio" />
                            <input type="text" value={premio.emisor} onChange={(e) => updateItem('premios', premio.id, 'emisor', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" placeholder="Emisor" />
                            <input type="text" value={premio.fecha} onChange={(e) => updateItem('premios', premio.id, 'fecha', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" placeholder="Fecha" />
                            <textarea value={premio.descripcion} onChange={(e) => updateItem('premios', premio.id, 'descripcion', e.target.value)} rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm resize-none" placeholder="Descripción" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
