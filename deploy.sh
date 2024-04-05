BRANCH="develop"
echo ===================================================
echo Autodeploy server
echo selected Branch $BRANCH
echo ===================================================
echo Connecting to remote server...
    #Connected
    git stash
    # to stash package-lock.json file changes

    git pull
    git pull origin $BRANCH --no-rebase

    rm -rf node_modules/

    npm install
    npm run build
    echo Build is  Done
    echo ===================================================
    pm2 stop ./dist/server.js
    pm2 delete ./dist/server.js
    pm2 start ./dist/server.js
    pm2 list
    echo Deployment Done
    echo ===================================================
    exit
ENDSSH