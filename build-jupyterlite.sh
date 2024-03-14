
EMFORGE_ENV_NAME="$(get_conf_var "emforge-env-name")"

micromamba activate $EMFORGE_ENV_NAME

write_template "./jupyterlite/environment.yml.in" "./jupyterlite/environment.yml"

rm -r -f dist
rm -r -f jupyterlite/_output

pushd jupyterlite
jupyter lite build --XeusPythonEnv.empack_config=empack_config.yaml
popd

mv jupyterlite/_output dist

micromamba deactivate
