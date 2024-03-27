
EMFORGE_ENV_NAME="$(get_conf_var "emforge-env-name")"
WASM_CPP_DIR="$(get_conf_var "wasm-cpp-dir")"

micromamba activate $EMFORGE_ENV_NAME

write_template "./jupyterlite/environment.yml.in" "./jupyterlite/environment.yml"

rm -r -f dist
rm -r -f jupyterlite/_output

pushd jupyterlite
jupyter lite build --XeusPythonEnv.empack_config=empack_config.yaml
popd

mv jupyterlite/_output dist

# Download roslib and replace 'window' with '_window'
ROSLIB_SRC="$(curl "https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.js")"
ROSLIB_SRC=${ROSLIB_SRC//window/_window}
echo "$ROSLIB_SRC"> dist/roslib.js

cp "$WASM_CPP_DIR/wasm_cpp/src/pre.js" "dist/pre.js"

micromamba deactivate
