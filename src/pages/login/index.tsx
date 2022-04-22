import { ConnectAccount } from "../../Auth/auth";
import Login from "../../components/login";

const LoginPage = () => {
  return <Login onClick={ConnectAccount} />;
};

export default LoginPage;
