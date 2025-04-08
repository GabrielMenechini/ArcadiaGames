import { Link } from "react-router";

const Login = () => {
    const id = 10;
    return (<div>
        Login
        <Link to={`/home/${id}`}>Ir para Home</Link>

    </div>
    );
};

export default Login;