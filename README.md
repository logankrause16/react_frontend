# Windows Install

## Node
Click https://nodesjs.org/en/download/ and click the Windows Installer Button to download the latest default version. This download includes npm, Node Package Manager

Once the installer finishes installing, open the installer and follow the directions. I suggest following their default install locations.

Once installed, open up command prompt or PowerShell and execute the follow command: `node -v` and then `npm -v` this should return to you the version of node and npm you have installed.

If this does not work, delete the node and npm and try again.

# Linux Install
## Ubuntu
First, be sure your system is up to date with: `sudo apt-get update`

Open a terminal and execute the command `sudo apt install nodejs`
Then: `sudo apt install npm`

## Centos
Use: `sudo yum install nodejs` to install nodejs. This will install both Node and npm for you.


## Git
To pull the repository... you need git. Which you should already have +1.

Clone the repo, then using the `dir` or `cd` command, go into where it is installed. 

Run `npm install` or `npm i` to install all dependent packages.

## Run 
To run the project, open command prompt, PowerShell or your Linux Terminal and execute: `npm start` this will execute `npm i && craco start` to be sure all dependencies are installed and to start resium (the react specific version of cesium)


