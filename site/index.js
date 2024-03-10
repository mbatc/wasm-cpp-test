const banner =
  "\n\
  ______ __  __  _____  _____ _____  _____ _____ _______ ______ _   _     \n\
 |  ____|  \\/  |/ ____|/ ____|  __ \\|_   _|  __ \\__   __|  ____| \\ | |\n\
 | |__  | \\  / | (___ | |    | |__) | | | | |__) | | |  | |__  |  \\| |  \n\
 |  __| | |\\/| |\\___ \\| |    |  _  /  | | |  ___/  | |  |  __| | . ` | \n\
 | |____| |  | |____) | |____| | \\ \\ _| |_| |      | |  | |____| |\\  | \n\
 |______|_|  |_|_____/_\\_____|_|_ \\_\\_____|_|___   |_|  |______|_| \\_|\n\
              |  ____/ __ \\|  __ \\ / ____|  ____|                       \n\
              | |__ | |  | | |__) | |  __| |__                            \n\
              |  __|| |  | |  _  /| | |_ |  __|                           \n\
              | |   | |__| | | \\ \\| |__| | |____                        \n\
              |_|    \\____/|_|  \\_\\\\_____|______|                     \n\
";
console.log("This page is powered by:\n", banner);

async function makePyJS(print, error) {
  const pyjs = await createModule({ print: print, error: print });

  await pyjs.bootstrap_from_empack_packed_environment(
    `./empack_env_meta.json` /* packages_json_url */,
    "." /* package_tarballs_root_url */,
    false /* verbose */
  );

  return pyjs;
}

async function load_text(loc){
  return await (await fetch(loc)).text();
}

async function run_py_file(path) {
  console.log(`Running ${path}`);
  src = await load_text(path);
  pyjs.exec(src)
}

window.onload = async function(){
  // const statusText = document.getElementById("load-status-text");
  // statusText.textContent = "Downloading data";
  console.log("Download data...");
  try {
    pyjs = await makePyJS(print, print);
    // statusText.textContent = "Loading Environment...";
    console.log("...done");
  } catch (error) {
    console.error(error);
    // statusText.textContent = "Failed to init pyjs: " + error;
    console.log("Failed to init pyjs: " + error);
  }

  await run_py_file('./py/init.py');
  loadDefaultCode();
};

function runPythonCode() {
  // Get the input value from the textarea
  var input = document.getElementById("pythonInput");
  var pythonCode = input.value;
  input.value = '';
  var result = '';

  try {
      result = '' + pyjs.exec(pythonCode);
  } catch (e) {
      console.error('An error occurred:', e.message);
      console.error('Stack trace:', e.stack);
      result = e.message + "<br>" + e.stack;
  }

  // Display the output in the output log
  var outputLog = document.getElementById("outputLog");
  outputLog.innerHTML += "<pre><code class=\"language-python\">" + pythonCode + "</code></pre>" + "<hr><pre>" + result + "</pre><hr>";
  outputLog.scrollTop = outputLog.scrollHeight;
}

function loadDefaultCode() {
  var input = document.getElementById("pythonInput");

  load_text('./py/default.py')
  .then(text => input.value = text);
}
