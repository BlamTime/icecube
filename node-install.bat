@echo off
setlocal

set "targetFolder=%~dp0node_modules"

if exist "%targetFolder%" (
    echo The folder already exists
    pause
) else (
    echo The folder did not exist. Dowloading CURS...
    npm install curs
)

endlocal