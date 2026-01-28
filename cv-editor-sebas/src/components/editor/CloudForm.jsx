import React, { useState } from 'react';
import { Cloud, LogIn, Save, UserPlus, Check, AlertCircle } from 'lucide-react';

export const CloudForm = ({ data, t }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [token, setToken] = useState(localStorage.getItem('auth_token'));

    const handleAuth = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', msg: 'Procesando...' });

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: isLogin ? 'login' : 'register', email, password })
            });
            const json = await res.json();

            if (res.ok) {
                if (isLogin) {
                    localStorage.setItem('auth_token', json.token);
                    setToken(json.token);
                    setStatus({ type: 'success', msg: '¡Bienvenido de vuelta!' });
                } else {
                    setStatus({ type: 'success', msg: 'Registro exitoso. Ahora puedes iniciar sesión.' });
                    setIsLogin(true);
                }
            } else {
                setStatus({ type: 'error', msg: json.error || 'Error en la solicitud' });
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Error de conexión con el servidor.' });
        }
    };

    const handleSaveCV = async () => {
        if (!token) return setStatus({ type: 'error', msg: 'Debes iniciar sesión primero.' });
        setStatus({ type: 'loading', msg: 'Guardando en la nube...' });

        try {
            const res = await fetch('/api/cv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ data })
            });

            if (res.ok) {
                setStatus({ type: 'success', msg: '¡CV Guardado exitosamente en la nube!' });
            } else {
                setStatus({ type: 'error', msg: 'Error al guardar.' });
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Error de conexión.' });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setStatus({ type: '', msg: '' });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-blue-500" /> Nube & Sincronización
            </h2>

            {status.msg && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'error' ? 'bg-red-50 text-red-700' : status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                    {status.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                    {status.msg}
                </div>
            )}

            {!token ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex gap-4 mb-6">
                        <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 font-medium border-b-2 transition-all ${isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Iniciar Sesión</button>
                        <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 font-medium border-b-2 transition-all ${!isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Registrarse</button>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ejemplo@correo.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="******" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all flex justify-center items-center gap-2">
                            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                            {isLogin ? 'Ingresar' : 'Crear Cuenta'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                        <h3 className="font-bold text-blue-900 mb-2">Sesión Activa</h3>
                        <p className="text-sm text-blue-700 mb-4">Has iniciado sesión correctamente. Puedes guardar tu progreso en la nube para acceder desde cualquier dispositivo.</p>
                        <button onClick={handleLogout} className="text-sm text-red-600 font-semibold hover:text-red-700">Cerrar Sesión</button>
                    </div>

                    <button onClick={handleSaveCV} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex justify-center items-center gap-3">
                        <Save className="w-5 h-5" /> Guardar CV en la Nube
                    </button>
                </div>
            )}
        </div>
    );
};
