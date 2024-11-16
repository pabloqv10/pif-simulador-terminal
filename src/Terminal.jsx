import { useState, useContext } from "react";
import { ReactTerminal, TerminalContext } from "react-terminal";

function Terminal() {
    const { setBufferedContent, setTemporaryContent } = useContext(TerminalContext);
    const [theme, setTheme] = useState("matrix");
    const [controlBar, setControlBar] = useState(true);
    const [controlButtons, setControlButtons] = useState(true);
    const [prompt, setPrompt] = useState("-> /");

    const showHelpInfo = () => {
      return (
        <span>
          <strong>clear</strong> : Limpia la consola. <br />
          <strong>change_theme &lt;THEME&gt;</strong> : Puedes cambiar el tema de la
          terminal. Los temas permitidos son los siguientes - light, dark, material-light, material-dark,
          material-ocean, matrix and dracula. <br />
          <hr />
          <strong>cd help</strong> : Muestra la información del comando cd. <br />
          <strong>cd &lt;ruta&gt;</strong> : Navega a la ruta especificada. <br />
          <hr />
          <strong>ls help</strong> : Muestra la información del comando ls. <br />
          <strong>ls</strong> : Listar Contenidos de Directorio. <br />
          <strong>ls -a</strong> : Muestra archivos y directorios ocultos que comienzan con. además de los elementos no ocultos. <br />
        </span>
      )
    }
  
    const commands = {
      help: showHelpInfo,
      ayuda: showHelpInfo,

      cd: (command) => {
        if (command == 'help') {
          return (
            <span>
              <p>
                  El comando <code>cd</code> se utiliza para navegar entre directorios. Te permite moverte desde el directorio de trabajo actual a una nueva ubicación en el sistema de archivos.
              </p>
              <p>
                  Cuando ejecutas el comando <code>cd</code> por sí mismo, te llevará al directorio de inicio. También puedes pasar una ruta específica para cambiar a ella. Por ejemplo:
              </p>
              <ul>
                  <li><code>cd /usr/local</code> – Cambia al directorio <code>/usr/local</code></li>
                  <li><code>cd ..</code> – Te mueve un nivel atrás hacia el directorio principal</li>
                  <li><code>cd ~/pictures</code> – Cambia a la carpeta <code>pictures</code> en tu directorio de inicio</li>
              </ul>
            </span>
          )
        } else if (command == '') {
          setPrompt("-> /")
        } else {
          setPrompt(`-> /${command}`)
        }
      },

      ls: (command) => {
        console.log(command)
        if (command == 'help') {
          return (
            <span>
              <p>
                El comando <code>ls</code> es uno de los comandos de Linux más utilizados. Lista el contenido de un directorio, mostrando todos los archivos y subdirectorios contenidos en su interior.
              </p>
              <p>
                Sin opciones o argumentos, <code>ls</code> mostrará el contenido del directorio de trabajo actual. 
                Puedes pasar un nombre de ruta para listar archivos y carpetas en esa ubicación en su lugar.
              </p>
            </span>
          )
        } else if (command == '-a') {
          return (
            <pre>
              <span className="folder">.</span>&nbsp;<br />
              <span className="folder">..</span>&nbsp;<br />
              <span className="folder">Documentos</span>&nbsp;<br />
              <span className="folder">Imágenes</span>&nbsp;<br />
              <span className="folder">Música</span>&nbsp;<br />
              <span className="folder">Videos</span>&nbsp;<br />
              <span className="folder">.config</span>&nbsp;<br />
              <span className="folder">.local</span>&nbsp;<br />
              <span className="folder">.cache</span>&nbsp;<br />
              <span className="file">.bashrc</span>&nbsp;<br />
              <span className="file">notas.txt</span>&nbsp;<br />
              <span className="file">foto1.jpg</span>&nbsp;<br />
              <span className="file">archivo.pdf</span>&nbsp;<br />
              <span className="file">musica.mp3</span>&nbsp;<br />
              <span className="file">script.sh</span>&nbsp;
          </pre>
          )
        } else {
          return (
            <pre>
              <span className="folder">Documentos</span>&nbsp;
              <span className="folder">Imágenes</span>&nbsp;
              <span className="folder">Música</span>&nbsp;
              <span className="folder">Videos</span>&nbsp;
              <span className="folder">Descargas</span>&nbsp;
              <span className="file">notas.txt</span>&nbsp;
              <span className="file">foto1.jpg</span>&nbsp;
              <span className="file">archivo.pdf</span>&nbsp;
              <span className="file">musica.mp3</span>&nbsp;
              <span className="file">script.sh</span>&nbsp;
            </pre>
          )
        }
      },
  
      change_theme: (theme) => {
        const validThemes = [
          "light",
          "dark",
          "material-light",
          "material-dark",
          "material-ocean",
          "matrix",
          "dracula",
        ];
        if (!validThemes.includes(theme)) {
          return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`;
        }
        setTheme(theme);
      },
  
      toggle_control_bar: () => {
        setControlBar(!controlBar);
      },
  
      toggle_control_buttons: () => {
        setControlButtons(!controlButtons);
      },
  
      evaluate_math_expression: async (expr) => {
        const response = await fetch(
          `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`
        );
        return await response.text();
      },

      wait: async (timeout) => {
        setTemporaryContent("Waiting...");
        await new Promise(resolve => setTimeout(() => {
            resolve(void 0);
        }, parseInt(timeout) * 1000));
        return 'Over!';
      },

      count_to: async (nb) => {
        setTemporaryContent("Counting...");
        nb = parseInt(nb);
        await Promise.all(
          new Array(nb).fill({}).map((value, index) => new Promise((resolve) => {
            const timer = setTimeout(() => {
              setBufferedContent((previous) => (<>
                {previous}
                <span>
                    {index + 1}
                </span>
                {index + 1 < nb ? <br/> : ''}
              </>));
              clearTimeout(timer);
              resolve(void 0);
            }, index * 1000);
          }))
        );
        return <><br/>Finished</>;
      }
    };
  
    const welcomeMessage = (
      <span>
        Escribe el comando &quot;help&quot; o &quot;ayuda&quot; para ver la lista de comandos disponibles. <br />
      </span>
    );

    return (<ReactTerminal
      prompt={prompt}
      theme={theme}
      showControlBar={controlBar}
      showControlButtons={controlButtons}
      welcomeMessage={welcomeMessage}
      commands={commands}
      defaultHandler={(command) => {
        return `Este comando "${command}" no es válido en nuestro simulador.`;
      }}
    />);
}

export default Terminal;