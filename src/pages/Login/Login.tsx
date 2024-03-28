import React, { useEffect, useState } from "react"
import LoginLayout from "../../components/Layout/LoginLayout"
import { useNavigate } from "react-router-dom"
import { apiUserService } from "../../services/generic/apiUserService"
import './login.css'
import { useAlert } from "../../context/generic/AlertContext"
import { useAuth } from "../../context/generic/AuthContext"
import { useApp } from "../../context/AppContext"
import { ApiProfileService } from "../../services/apiProfileService"

const Login = () => {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { showAlert } = useAlert();
  const app = useApp();
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const data = await apiUserService.login(username, password)
      loginUser(data.token)
      const profiles = await new ApiProfileService().get();
      if(profiles.length > 0){
        app.selectProfile(profiles[0].id);
      }
      navigate("/dashboard");
    } catch (error) {
      showAlert("Identifiants invalides", "error")
    }
  }

  return (
    <LoginLayout>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-element-container">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-element-container">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-submit-container">
          <button type="submit">Se connecter</button>
        </div>
      </form>
    </LoginLayout>
  )
}

export default Login
