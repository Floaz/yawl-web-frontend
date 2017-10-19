# YAWL Web Frontend

This is a frontend for managing YAWL resources.
> YAWL is a BPM/Workflow system, based on a concise and powerful modelling language, that handles complex data transformations, and full integration with organizational resources and external Web Services."

[More about YAWL here](http://www.yawlfoundation.org/)


## Requirements

YAWL Web Admin is based on the Angular framework and Typescript and some other libraries.
The most libraries are downloaded automatically by the package manager npm. But for this to work, you have to install nodejs and angular-cli.

1. Download the current version of [nodejs](https://nodejs.org/en/).
2. Unzip the downloaded archive file and move the extracted files to a path of your choice. E.g. `/usr/local/nodejs/`.
3. Add the bin-directory of nodejs (e.g. `/usr/local/nodejs/bin`) to your PATH environment variable, so that you can use the tools of nodejs in a shell directly without specifying the absolute path.
4. Install angular-cli with `npm -g @angular/cli`. Now you can use the tool `ng`.
5. (Optional) Install yarn (a better package manager than npm) with `npm install -g yarn`.

Detailed information about nodejs and the package manager npm can be found [here](https://nodejs.org/en/docs/).

Instructions were performed on Ubuntu 16.04 using nodejs 8.7.0.


## Deployment for production

1. Goto root path of YAWL Web Admin. (E.g. `cd ~/yawl-web-admin`)
2. Install all dependencies automatically under node_modules with `npm install` or `yarn install`.
3. Start build process with `ng build --prod` and wait.
4. All result files are in the directory `dist`.
5. Copy all files from dist to a webspace.
6. Configure the webspace, that it delivers the index.html file for GET-Path `/` and all 404 errors. This is due to the routing mechanism in YAWL Web Admin. [More about this routing mechanism called HTML5 History PushState](https://angular.io/guide/router#appendix-locationstrategy-and-browser-url-styles).
7. Customize your configuration by editing `config.json`.


## Development version

1. Goto root path of YAWL Web Admin. (E.g. `cd ~/yawl-web-admin`)
2. Install all dependencies automatically under node_modules with `npm install` or `yarn install`.
3. Start serve process with `ng serve` and wait.

`ng serve` builds the application and starts a web server. It runs in the background and watches for changes. If any change is made on the source files, it builds the application again and reloads the browser page.

The dev server can be accessed by visiting [http://localhost:4200](http://localhost:4200).


## Development - IDE

I recommend using [Visual Studio Code](https://code.visualstudio.com/). Visual Studio Code is not the same as Visual Studio! It can be executed on Linux, Windows and Mac OS.
