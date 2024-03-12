
EMROBOSTACK_ENV_NAME="$(get_conf_var "emrobostack-env-name")"
EMFORGE_ENV_NAME="$(get_conf_var "emforge-env-name")"

micromamba activate $EMROBOSTACK_ENV_NAME
micromamba install \
      ros-humble-rclpy \
      ros-humble-osrf-testing-tools-cpp \
      ros-humble-rcutils \
      ros-humble-rosidl-parser \
      ros-humble-std-msgs \
      ros-humble-wasm-cpp \
      ros-humble-rmw-wasm-cpp \
      "ros2-distro-mutex=0.5.*" \
      -c $MAMBA_ROOT_PREFIX/envs/$EMFORGE_ENV_NAME/conda-bld \
      -c https://repo.mamba.pm/emscripten-forge \
      -c https://repo.mamba.pm/conda-forge -y

micromamba update \
      ros-humble-wasm-cpp \
      ros-humble-rmw-wasm-cpp \
      "ros2-distro-mutex=0.5.*" \
      -c $MAMBA_ROOT_PREFIX/envs/$EMFORGE_ENV_NAME/conda-bld \
      -c https://repo.mamba.pm/emscripten-forge \
      -c https://repo.mamba.pm/conda-forge -y

micromamba deactivate
