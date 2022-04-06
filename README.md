# word-mastermind
Word guessing game based on the Mastermind game I played as a kid, where you find the exact positions of colored pegs.

# origins
* I created a new Repo in GitHub called word-mastermind
* I cloned the Repo in desktop GitHub using C:\MyCode\word-mastermind as the local folder
* I opened C:\MyCode\word-mastermind in Visual Code
* I opened a Terminal in Visual Code and
* * npx create-react-app wm --use-npm
* * cd wm
* * npm audit fix --force repeatedly but it kept complaining about vulnerabilities
* * google search
* * delete node_modules, delete package-lock.json, npm install
* * npm audit fix --force repeatedly but it still kept complaining about vulnerabilities
* * google search
* * try install everything the npm audit report complains about individually
* * * npm i --save-dev react-scripts@5.0.0
* * * not working, does not behave like the site says
* * * more npm install and npm audit fix --force and still has vulnerabilities
* * * found something about using powershell and npm-windows-upgrade, followed that, no difference

THIS IS SO ANNOYING!

IT IS A NEW COMPUTER WITH A NEW FIRST TIME INSTALL AND IT WON'T STOP COMPLAINING ABOUT VULNERABILITIES!

NONE OF MY GOOGLE HITS WORK! AARRGHH!!!

Danielle Barker says the production build may not have any vulnerabilities. She says to do this to find out:

 npm audit --production

This came back with 0 vulnerabilities, so I will stop worrying about it.

# commands from terminal
From C:\MyCode\word-mastermind\wm folder
* npm start to run the development server
* npm run build to build for production
