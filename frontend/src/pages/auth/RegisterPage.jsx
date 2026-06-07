import { useNavigate, Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";
import { registerUser } from "../../services/auth.service";
import { Film } from "lucide-react";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            await registerUser(data);
            navigate("/login");
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                        <Film className="w-10 h-10 text-rose-500 group-hover:scale-110 transition-transform" />
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
                    <p className="text-slate-400">Join us to keep track of your favorite movies</p>
                </div>

                <div className="glass-panel rounded-2xl p-8">
                    <RegisterForm onSubmit={handleRegister} />
                </div>
                
                <p className="text-center mt-6 text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-rose-400 hover:text-rose-300 font-medium transition-colors">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;