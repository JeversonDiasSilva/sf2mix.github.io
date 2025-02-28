(async function() {
    const folderPath = (path) => path.substring(0, path.length - path.split('/').pop().length);
    let scriptPath = (typeof window.EJS_pathtodata === "string") ? window.EJS_pathtodata : folderPath((new URL(document.currentScript.src)).pathname);
    if (!scriptPath.endsWith('/')) scriptPath += '/';

    // Atualizando URLs para o novo repositório no GitHub
    window.EJS_pathtodata = "https://jeversondiassilva.github.io/sf2mix.github.io/data/";
    window.EJS_gameUrl = "https://jeversondiassilva.github.io/sf2mix.github.io/downloads/sfz3mix.zip";

    window.EJS_player = "#game";
    window.EJS_core = "arcade";
    window.EJS_gameName = "sfz3mix";
    window.EJS_color = "#000000";
    window.EJS_startOnLoaded = true;
    window.EJS_VirtualGamepadSettings = [
        {"type":"button","text":"4","id":"a","location":"right","right":145,"top":80,"bold":true,"input_value":0},
        {"type":"button","text":"5","id":"b","location":"right","right":75,"top":80,"bold":true,"input_value":8},
        {"type":"button","text":"6","id":"c","location":"right","right":5,"top":80,"bold":true,"input_value":11},
        {"type":"button","text":"1","id":"x","location":"right","right":145,"top":10,"bold":true,"input_value":1},
        {"type":"button","text":"2","id":"y","location":"right","right":75,"top":10,"bold":true,"input_value":9},
        {"type":"button","text":"3","id":"z","location":"right","right":5,"top":10,"bold":true,"input_value":10},
        {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
        {"type":"button","text":"Coin","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2},
        {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3}
    ];

    function loadScript(file) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];
                } else {
                    return scriptPath + file;
                }
            }();
            script.onload = resolve;
            script.onerror = () => {
                filesmissing(file).then(e => resolve());
            }
            document.head.appendChild(script);
        })
    }

    function loadStyle(file) {
        return new Promise(function(resolve, reject) {
            let css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];
                } else {
                    return scriptPath + file;
                }
            }();
            css.onload = resolve;
            css.onerror = () => {
                filesmissing(file).then(e => resolve());
            }
            document.head.appendChild(css);
        })
    }

    async function filesmissing(file) {
        console.error("Failed to load " + file);
        let minifiedFailed = file.includes(".min.") && !file.includes("socket");
        console[minifiedFailed ? "warn" : "error"]("Failed to load " + file + " because it's likely that the minified files are missing.\nTo fix this you have 3 options:\n1. You can download the zip from the latest release here: https://github.com/EmulatorJS/EmulatorJS/releases/latest - Stable\n2. You can download the zip from here: https://cdn.emulatorjs.org/latest/data/emulator.min.zip and extract it to the data/ folder. (easiest option) - Beta\n3. You can build the files by running `npm i && npm run build` in the data/minify folder. (hardest option) - Beta\nNote: you will probably need to do the same for the cores, extract them to the data/cores/ folder.");
        if (minifiedFailed) {
            console.log("Attempting to load non-minified files");
            if (file === "emulator.min.js") {
                await loadScript('emulator.js');
                await loadScript('nipplejs.js');
                await loadScript('shaders.js');
                await loadScript('storage.js');
                await loadScript('gamepad.js');
                await loadScript('GameManager.js');
                await loadScript('socket.io.min.js');
            } else {
                await loadStyle('emulator.css');
            }
        }
    }

    await loadScript('emulator.min.js');
    await loadStyle('emulator.min.css');

    const config = {};
    config.gameUrl = window.EJS_gameUrl;
    config.dataPath = scriptPath;
    config.system = window.EJS_core;
    config.biosUrl = window.EJS_biosUrl;
    config.gameName = window.EJS_gameName;
    config.color = window.EJS_color;
    config.adUrl = window.EJS_AdUrl;
    config.adMode = window.EJS_AdMode;
    config.adTimer = window.EJS_AdTimer;
    config.adSize = window.EJS_AdSize;
    config.alignStartButton = window.EJS_alignStartButton;
    config.VirtualGamepadSettings = window.EJS_VirtualGamepadSettings;
    config.buttonOpts = window.EJS_Buttons;
    config.volume = window.EJS_volume;
    config.defaultControllers = window.EJS_defaultControls;
    config.startOnLoad = window.EJS_startOnLoaded;
    config.fullscreenOnLoad = window.EJS_fullscreenOnLoaded;
    config.filePaths = window.EJS_paths;
    config.loadState = window.EJS_loadStateURL;
    config.cacheLimit = window.EJS_CacheLimit;
    config.cheats = window.EJS_cheats;
    config.defaultOptions = window.EJS_defaultOptions;
    config.gamePatchUrl = window.EJS_gamePatchUrl;
    config.gameParentUrl = window.EJS_gameParentUrl;
    config.netplayUrl = window.EJS_netplayServer;
    config.gameId = window.EJS_gameID;
    config.backgroundImg = window.EJS_backgroundImage;
    config.backgroundBlur = window.EJS_backgroundBlur;
    config.backgroundColor = window.EJS_backgroundColor;
    config.controlScheme = window.EJS_controlScheme;
    config.threads = window.EJS_threads;
    config.disableCue = window.EJS_disableCue;
    config.startBtnName = window.EJS_startButtonName;
    config.softLoad = window.EJS_softLoad;
    config.screenRecording = window.EJS_screenRecording;
    config.externalFiles = window.EJS_externalFiles;
    config.disableDatabases = window.EJS_disableDatabases;
    config.disableLocalStorage = window.EJS_disableLocalStorage;

    if (typeof window.EJS_language === "string" && window.EJS_language !== "en-US") {
        try {
            let path;
            if ('undefined' != typeof EJS_paths && typeof EJS_paths[window.EJS_language] === 'string') {
                path = EJS_paths[window.EJS_language];
            } else {
                path = scriptPath + "localization/" + window.EJS_language + ".json";
            }
            config.language = window.EJS_language;
            config.langJson = JSON.parse(await (await fetch(path)).text());
        } catch (e) {
            config.langJson = {};
        }
    }

    window.EJS_emulator = new EmulatorJS(EJS_player, config);
})();
