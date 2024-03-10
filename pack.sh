
micromamba activate $(get_conf_var "emforge-env-name")

rm -r -f $PROJECT_DIR/dist
mkdir $PROJECT_DIR/dist

WASM_ENV=$(get_conf_var "emrobostack-env-name")

empack pack env \
    --env-prefix "$MAMBA_ROOT_PREFIX/envs/$WASM_ENV" \
    --config $PROJECT_DIR/empack_config.yaml \
    --outdir $PROJECT_DIR/dist \
    --no-use-cache

cp -a $MAMBA_ROOT_PREFIX/envs/$WASM_ENV/lib_js/pyjs/. $PROJECT_DIR/dist
cp -a $PROJECT_DIR/site/. $PROJECT_DIR/dist
cp -a $(get_conf_var "wasm-js-dir")/src/. $PROJECT_DIR/dist/wasm_js

micromamba deactivate
