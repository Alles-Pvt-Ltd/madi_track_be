BRANCH="develop"
echo ===================================================
echo Autodeploy server
echo selected Branch $BRANCH
echo ===================================================
echo Connecting to remote server...
    #Connected
   
    pm2 list 

    git stash
    # to stash package-lock.json file changes

    git pull
    git pull origin $BRANCH --no-rebase

    rm -rf node_modules/

    npm install
    npm run build
    pm2 stop 0
    pm2 delete 0
    pm2 start ./dist/server.js
    pm2 list
    echo Deployment Done
    echo ===================================================
    exit
ENDSSH