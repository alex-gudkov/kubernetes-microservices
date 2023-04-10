@echo off
setlocal enabledelayedexpansion

for /r %%f in (*.yaml) do (
  set "filename=%%~nf"
  set "extension=%%~xf"
  ren "%%f" "!filename!.yml"
)

echo All YAML files have been renamed to YML.