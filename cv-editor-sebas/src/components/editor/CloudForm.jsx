import React, { useState, useEffect } from 'react';
import { Cloud, LogIn, Save, UserPlus, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabase';

export const CloudForm = ({ data, setData, t }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [token, setToken] = useState(null); // Initialize token as null, will be set by effect

    // Effect to check and set token from Supabase session on component mount
    useEffect(() => {
        // Obtenemos la sesión actual
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('CloudForm - Sesión actual:', session);
            setToken(session?.access_token || null);
        }).catch(err => {
            console.error("Error getting session:", err);
            setToken(null);
        });

        // Escuchamos cambios en la autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('CloudForm - Cambio de auth:', _event, session);
            setToken(session?.access_token || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Log cuando cambia el token para debugging
    useEffect(() => {
        console.log('CloudForm - Token actualizado:', token ? 'Existe' : 'No existe');
    }, [token]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', msg: 'Procesando...' });

        try {
            let res, error;
            if (isLogin) {
                const { data, error: authError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                res = data;
                error = authError;
            } else {
                const { data, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                })
                res = data;
                error = authError;
            }

            if (error) throw error;

            if (isLogin) {
                // setToken(res.session.access_token); // Token is now set by onAuthStateChange listener
                setStatus({ type: 'success', msg: '¡Bienvenido de vuelta!' });
            } else {
                setStatus({ type: 'success', msg: 'Registro exitoso. Revisa tu email para confirmar.' });
                // En Supabase, el login no es automático tras registro si se requiere confirmación de email
            }
        } catch (err) {
            setStatus({ type: 'error', msg: err.message || 'Error en la solicitud' });
        }
    };

    const handleSaveCV = async () => {
        if (!token) return setStatus({ type: 'error', msg: 'Debes iniciar sesión primero.' });
        setStatus({ type: 'loading', msg: 'Guardando en la nube...' });

        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) throw new Error("No se pudo obtener el usuario. Intenta iniciar sesión nuevamente.");

            const { error } = await supabase
                .from('cv_data')
                .upsert({ user_id: user.id, data: data }, { onConflict: 'user_id' })

            if (error) throw error;

            setStatus({ type: 'success', msg: '¡CV Guardado exitosamente en la nube!' });
        } catch (err) {
            setStatus({ type: 'error', msg: err.message || 'Error al guardar.' });
        }
    };

    const handleLoadCV = async () => {
        if (!token) return setStatus({ type: 'error', msg: 'Debes iniciar sesión primero.' });
        setStatus({ type: 'loading', msg: 'Cargando CV...' });

        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) throw new Error("No se pudo obtener el usuario.");

            const { data: cvData, error } = await supabase
                .from('cv_data')
                .select('data')
                .eq('user_id', user.id)
                .single();

            if (error) throw error;

            if (cvData && cvData.data) {
                if (setData) {
                    setData(cvData.data);
                    setStatus({ type: 'success', msg: '¡CV cargado exitosamente!' });
                } else {
                    setStatus({ type: 'error', msg: 'Error interno: setData no disponible.' });
                }
            } else {
                setStatus({ type: 'error', msg: 'No se encontró ningún CV guardado.' });
            }
        } catch (err) {
            setStatus({ type: 'error', msg: err.message || 'Error al cargar.' });
        }
    };

    const handleLogout = async () => { // Made async to await supabase.auth.signOut()
        await supabase.auth.signOut();
        // localStorage.removeItem('auth_token'); // Supabase handles session storage
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
                        <p className="text-sm text-blue-700 mb-4">Has iniciado sesión correctamente.</p>
                        <button onClick={handleLogout} className="text-sm text-red-600 font-semibold hover:text-red-700">Cerrar Sesión</button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button onClick={handleSaveCV} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex justify-center items-center gap-3">
                            <Save className="w-5 h-5" /> Guardar CV en la Nube
                        </button>

                        <button onClick={handleLoadCV} className="w-full bg-white border-2 border-purple-100 text-purple-700 font-semibold py-4 rounded-xl hover:bg-purple-50 transition-all flex justify-center items-center gap-3">
                            <Cloud className="w-5 h-5" /> Recuperar CV Guardado
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
