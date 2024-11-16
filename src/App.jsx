import { TerminalContextProvider } from "react-terminal";
import Terminal from "./Terminal";

function App() {
  return (
    <div className="container">
      <TerminalContextProvider>
        <h1>Bienvenido al Simulador Web de Terminal</h1>
        <div>
          <p>
            Este simulador interactivo está diseñado para ayudarte a aprender y practicar comandos de terminal y 
            conceptos básicos de sistemas operativos en un entorno seguro y accesible.
          </p>
          <p>
            Explora, experimenta y domina el uso de la terminal sin riesgo de afectar un sistema real. 
            Personaliza tu experiencia y adquiere conocimientos prácticos que te serán útiles tanto 
            en el ámbito académico como profesional.
          </p>
          <h3>Características principales:</h3>
          <ul>
            <li>✔️ Simulación realista de una terminal de comandos.</li>
            <li>✔️ Entorno intuitivo y accesible para usuarios de todos los niveles.</li>
            <li>✔️ Herramientas educativas diseñadas para reforzar el aprendizaje práctico.</li>
          </ul>
          <p>
            Escribe <code>help</code> o explora los comandos disponibles para comenzar tu aprendizaje. 
            ¡Prepárate para descubrir el poder de la terminal!
          </p>
        </div>
        <Terminal/>
      </TerminalContextProvider> 
    </div>
  )
}

export default App
