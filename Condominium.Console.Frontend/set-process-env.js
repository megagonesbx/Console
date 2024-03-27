const fs = require("fs");
const { exit } = require("process");

class ProcessEnv {
    environmentPath = "environment.ts";
    browserPath = ".";
    regexReplaceProcess =
        /(\/\*mockup-process-env-begins\*\/).*\/\*mockup-process-env-end\*\//;
    stringReplaceProcess = "";
    env = "";
    filesName = [];
    contentMain = "";

    constructor() {
        this.readFilesOfBrowser();
        this.createEnvString();
        this.addProcessEnvToMain();
    }

    addProcessEnvToMain() {
        this.filesName.forEach((fileName) => {
            let targetPath = this.browserPath + "/" + fileName;
            fs.readFile(targetPath, "utf8", (err, data) => {
                if (err) {
                    console.log("Error al leer el archivo", err);
                    exit(1);
                }
                this.deleteProcessOfMain(data);
                this.addProcessToMain();
                this.saveMain(targetPath);
            });
        });
    }

    readFilesOfBrowser() {
        fs.readdirSync(this.browserPath).forEach((fileName) => {
            if (/(main-).*\.js$/.test(fileName)) {
                this.filesName.push(fileName);
            }
        });
    }

    createEnvString() {
        fs.readFile(this.environmentPath, "utf8", (err, data) => {
            if (err) {
                console.log("Error al leer el archivo", err);
                exit(1);
            }
            Object.keys(process.env).forEach((key) => {
                if (new RegExp("\\b" + key + "\\b").test(data)) {
                    this.env =
                        this.env +
                        key +
                        ": " +
                        `${process.env[key]
                            ? "'" + process.env[key] + "'"
                            : undefined
                        },`;
                }
            });
            this.stringReplaceProcess = `/*mockup-process-env-begins*/var process={env: {${this.env}}};/*mockup-process-env-end*/`;
        });
    }

    deleteProcessOfMain(main) {
        this.contentMain = main.replace(this.regexReplaceProcess, "");
    }

    addProcessToMain() {
        this.contentMain = this.stringReplaceProcess + this.contentMain;
    }

    saveMain(targetPath) {
        fs.writeFile(targetPath, this.contentMain, "utf8", (err) => {
            if (err) {
                console.log("Error al escribir en el archivo");
                exit(1);
            }
        });
    }
}

new ProcessEnv();