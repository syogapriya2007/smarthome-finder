import { useNavigate } from "react-router-dom";
import "./Splash.css";

function Splash() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const logoSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320">

      <defs>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563EB"/>
          <stop offset="50%" stop-color="#6366F1"/>
          <stop offset="100%" stop-color="#9333EA"/>
        </linearGradient>

        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#22C55E"/>
          <stop offset="100%" stop-color="#14B8A6"/>
        </linearGradient>

        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#06B6D4"/>
          <stop offset="50%" stop-color="#6366F1"/>
          <stop offset="100%" stop-color="#9333EA"/>
        </linearGradient>
      </defs>

      <!-- HOUSE ROOF -->
      <path
        d="M95 125 L250 20 L405 125"
        fill="none"
        stroke="url(#houseGradient)"
        stroke-width="24"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- HOUSE BODY -->
      <path
        d="M135 105 V205 Q135 220 150 220 H350 Q365 220 365 205 V105"
        fill="none"
        stroke="url(#houseGradient)"
        stroke-width="20"
        stroke-linecap="round"
      />

      <!-- WINDOW -->
      <rect
        x="218"
        y="120"
        width="64"
        height="64"
        rx="8"
        fill="url(#houseGradient)"
      />

      <path
        d="M250 120 V184 M218 152 H282"
        stroke="white"
        stroke-width="6"
      />

      <!-- DOOR -->
      <rect
        x="175"
        y="165"
        width="38"
        height="55"
        rx="6"
        fill="url(#houseGradient)"
      />

      <!-- LEAF -->
      <path
        d="M125 230 C75 190 92 145 165 130 C175 180 160 215 125 230Z"
        fill="url(#leafGradient)"
      />

      <path
        d="M115 215 C130 195 145 170 160 145"
        fill="none"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
      />

      <!-- FLOWING WAVE -->
      <path
        d="M55 230 C170 285 270 225 380 235 C490 245 555 185 650 230"
        fill="none"
        stroke="url(#waveGradient)"
        stroke-width="18"
        stroke-linecap="round"
      />

      <!-- SECOND WAVE -->
      <path
        d="M95 250 C190 285 280 250 365 255 C470 262 535 225 610 245"
        fill="none"
        stroke="#A5B4FC"
        stroke-width="5"
        stroke-linecap="round"
        opacity="0.8"
      />

      <!-- SMART HOME TEXT -->
      <text
        x="410"
        y="125"
        font-family="Arial, Helvetica, sans-serif"
        font-size="47"
        font-weight="700"
        fill="#172554"
      >
        Smart
      </text>

      <text
        x="410"
        y="180"
        font-family="Arial, Helvetica, sans-serif"
        font-size="47"
        font-weight="700"
        fill="url(#houseGradient)"
      >
        Home
      </text>

      <!-- TAGLINE -->
      <text
        x="412"
        y="215"
        font-family="Arial, Helvetica, sans-serif"
        font-size="14"
        font-weight="600"
        letter-spacing="3"
        fill="#64748B"
      >
        FIND YOUR HAPPY PLACE
      </text>

    </svg>
  `;

  const logoUrl =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(logoSvg);

  return (
    <div className="splash-page">

      {/* Decorative circles */}
      <div className="decoration decoration-one"></div>
      <div className="decoration decoration-two"></div>

      {/* SmartHome Logo */}
      <div
        className="splash-logo"
        onClick={goToLogin}
        title="Continue to SmartHome"
      >
        <img
          src={logoUrl}
          alt="SmartHome Logo"
        />
      </div>

      {/* Main text */}
      <p className="splash-text">
        Find a home you'll love.
      </p>

      {/* Button */}
      <button
        className="enter-button"
        onClick={goToLogin}
      >
        Get Started <span>→</span>
      </button>

      {/* Bottom text */}
      <p className="click-text">
        Click the logo to continue
      </p>

    </div>
  );
}

export default Splash;