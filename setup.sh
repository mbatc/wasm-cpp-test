
# Configure environment names
configure_var "emforge-env-name"     "emscripten-forge"
configure_var "emrobostack-env-name" "emrobostack-wasm"
configure_var "pyjs-runner-env-name" "pyjs-runner"
configure_var "emsdk-version"        "3.1.45"

# Configure paths
configure_path "emsdk-dir" "$HOME/emsdk"

# Configure repositories
setup_repo "emscripten-forge-dir" "https://github.com/emscripten-forge/recipes.git"      "fixes_tobi"
setup_repo "wasm-cpp-dir"         "https://github.com/ros2wasm/rmw_wasm.git"             "main"
setup_repo "pyjs-code-runner-dir" "https://github.com/emscripten-forge/pyjs-code-runner" "main"

EMFORGE_ENV_NAME="$(get_conf_var "emforge-env-name")"
EMROBOSTACK_ENV_NAME="$(get_conf_var "emrobostack-env-name")"
EMFORGE_DIR="$(get_conf_var "emscripten-forge-dir")"

PYJS_RUNNER_ENV_NAME="$(get_conf_var "pyjs-runner-env-name")"
PYJS_RUNNER_DIR="$(get_conf_var "pyjs-code-runner-dir")"

EMSDK_VERSION="$(get_conf_var "emsdk-version")"
EMSDK_DIR=$(get_conf_var "emsdk-dir")

if mamba_env_exists $EMFORGE_ENV_NAME; then
  echo "-- Skip setting up emscripten forge environment for mamba. $EMFORGE_ENV_NAME already exists"
else
  echo "-- Setting up emscripten forge environment for mamba ($EMFORGE_ENV_NAME)"
  micromamba create \
      -n $EMFORGE_ENV_NAME \
      -f $EMFORGE_DIR/ci_env.yml \
      --yes
  micromamba activate $EMFORGE_ENV_NAME
  playwright install

  bash "$EMFORGE_DIR/emsdk/setup_emsdk.sh" $EMSDK_VERSION $EMSDK_DIR

  python -m pip install git+https://github.com/DerThorsten/boa.git@python_api_v2

  micromamba config append channels https://repo.mamba.pm/emscripten-forge --env
  micromamba deactivate
fi

if mamba_env_exists $EMROBOSTACK_ENV_NAME; then
  echo "-- Skip setting up $EMROBOSTACK_ENV_NAME mamba environment. $EMROBOSTACK_ENV_NAME already exists"
else
  echo "-- Setting up $EMROBOSTACK_ENV_NAME mamba environment."
  micromamba create \
      --platform emscripten-wasm32
      -n $EMROBOSTACK_ENV_NAME \
      -f $PROJECT_DIR/envs/wasm-env.yaml \
      --yes
  micromamba deactivate
fi

if mamba_env_exists $EMROBOSTACK_ENV_NAME; then
  echo "-- Skip setting up $EMROBOSTACK_ENV_NAME mamba environment. $EMROBOSTACK_ENV_NAME already exists"
else
  echo "-- Setting up $EMROBOSTACK_ENV_NAME mamba environment."
  micromamba create \
      --platform emscripten-wasm32
      -n $EMROBOSTACK_ENV_NAME \
      -f $PROJECT_DIR/envs/wasm-env.yaml \
      --yes
  micromamba deactivate
fi

if mamba_env_exists $PYJS_RUNNER_ENV_NAME; then
  echo "-- Skip setting up $PYJS_RUNNER_ENV_NAME mamba environment. $PYJS_RUNNER_ENV_NAME already exists"
else
  echo "-- Setting up $PYJS_RUNNER_ENV_NAME mamba environment."
  micromamba create -n "$PYJS_RUNNER_ENV_NAME" -c conda-forge python --yes
  micromamba activate "$PYJS_RUNNER_ENV_NAME"
  python -m pip install -e "$PYJS_RUNNER_DIR"
  playwright install
  micromamba deactivate
fi
