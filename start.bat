@echo OFF

echo Discord Change Status
echo Made By Scoooolzs#7975
echo Detecting Node.js enviroment...
goto :check

:check
where node.exe >nul 2>&1 && goto :have || goto :nothave

:have
echo You have Node.js environment. Running project...
node .

:nothave
echo You dont have Node.js environment. Redirecting you to node.js download website...
start http://nodejs.org/en/download
