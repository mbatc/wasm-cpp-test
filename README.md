# Setup

> You'll need micromamba installed on your machine to build this project.

1. Clone this repo (`git clone https://github.com/mbatc/wasm-cpp-test.git`)
2. Install [bash-builder](https://github.com/mbatc/bash-builder) utility script.

```sh
mkdir -p ~/.local/bin | curl https://raw.githubusercontent.com/mbatc/bash-builder/main/bash-builder>~/.local/bin/bash-builder | chmod u+x ~/.local/bin/bash-builder
```

3. `cd` into the wasm-cpp-test directory.
3. Run `bash-builder . setup.sh` to setup dependencies and create micromamba environments.
4. Run `bash-builder . build.sh` to build and pack the site.
5. Run `python -m http.server --directory dist` and visit `http://localhost:8000` to view the page.
