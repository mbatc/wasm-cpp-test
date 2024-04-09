
# Configure environment names
configure_var "emforge-env-name"     "emscripten-forge"
configure_var "emrobostack-env-name" "emrobostack-wasm"
configure_var "emsdk-version"        "3.1.45"

# Configure paths
configure_path "emsdk-dir" "$HOME/emsdk"

# Configure repositories
setup_repo "emscripten-forge-dir" "https://github.com/mbatc/emscripten-forge-recipes.git" "main"
setup_repo "wasm-cpp-dir"         "https://github.com/mbatc/rmw_wasm.git"                 "mbatchelor/roslibjs"
setup_repo "wasm-js-dir"          "https://github.com/ros2wasm/wasm_js.git"               "main"

EMFORGE_ENV_NAME="$(get_conf_var "emforge-env-name")"
EMROBOSTACK_ENV_NAME="$(get_conf_var "emrobostack-env-name")"
EMFORGE_DIR="$(get_conf_var "emscripten-forge-dir")"

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
  micromamba config append channels https://repo.mamba.pm/robostack-wasm --env

  # For building jupyterlite site
  micromamba install -c conda-forge jupyterlite-xeus-python -y

  micromamba deactivate
fi

if mamba_env_exists $EMROBOSTACK_ENV_NAME; then
  echo "-- Skip setting up $EMROBOSTACK_ENV_NAME mamba environment. $EMROBOSTACK_ENV_NAME already exists"
else
  echo "-- Setting up $EMROBOSTACK_ENV_NAME mamba environment."
  micromamba create \
      --platform emscripten-wasm32 \
      -n $EMROBOSTACK_ENV_NAME \
      -f $PROJECT_DIR/envs/wasm-env.yaml \
      -c https://repo.mamba.pm/robostack-wasm \
      -c https://repo.mamba.pm/emscripten-forge \
      --yes
  micromamba deactivate
fi
