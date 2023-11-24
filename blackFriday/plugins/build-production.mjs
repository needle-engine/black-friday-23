
import { spawnSync } from "child_process";
import { existsSync, readFileSync } from "fs";


const workingDir = process.cwd();
const needle_config_path = workingDir + "/needle.config.json";
let rel_directory = "dist";
if(existsSync(needle_config_path)){
    const config = JSON.parse(readFileSync(needle_config_path, "utf8"));
    if(config){
        if(config.buildDirectory?.length)
            rel_directory = config.buildDirectory;
    }
}
const directoryToCompress = workingDir + "/" + rel_directory;
const defaultArgs = { shell: true, cwd: workingDir, stdio: 'inherit' }
console.log("Run for: " + directoryToCompress);
spawnSync("npm run pack-gltf \"" + directoryToCompress + "\"", defaultArgs);