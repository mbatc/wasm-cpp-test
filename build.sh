
LAST_BUILD_NUMBER=$(get_conf_var "build-number")
# Increment build number for next build
let BUILD_NUMBER=$LAST_BUILD_NUMBER+1
set_conf_var "build-number" $BUILD_NUMBER

BUILD_NUMBER="$(get_conf_var "build-number")"
WASM_CPP_DIR="$(get_conf_var "wasm-cpp-dir")"
EMFORGE_DIR="$(get_conf_var "emscripten-forge-dir")"

write_template "./recipes/ros-humble-rmw-wasm-cpp/recipe.yaml.in" "./recipes/ros-humble-rmw-wasm-cpp/recipe.yaml"
write_template "./recipes/ros-humble-wasm-cpp/recipe.yaml.in"     "./recipes/ros-humble-wasm-cpp/recipe.yaml"

micromamba activate "$(get_conf_var "emforge-env-name")"
boa build recipes --target-platform=emscripten-wasm32 -m $EMFORGE_DIR/conda_build_config.yaml
micromamba deactivate

source "$PROJECT_DIR/build-jupyterlite.sh"
