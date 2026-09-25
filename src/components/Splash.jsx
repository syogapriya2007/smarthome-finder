import { useNavigate } from "react-router-dom";
import "./Splash.css";

function Splash() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="splash-page">

      <div
        className="splash-logo"
        onClick={goToLogin}
      >
        <img
  src="/images/smarthome_logo.svg"
  alt="SmartHome"
/>
      </div>

      <p className="splash-text">
        Find a home you'll love.
      </p>

      <button
        className="enter-button"
        onClick={goToLogin}
      >
        Get Started →
      </button>

      <p className="click-text">
        Click the logo to continue
      </p>

    </div>
  );
}

export default Splash;