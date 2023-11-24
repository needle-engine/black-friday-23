import { mkdirSync } from "fs";

const workingDir = process.cwd();
// just a workaround for copy-files being unable to create target directories
mkdirSync(workingDir + "/dist/assets", { recursive: true });
mkdirSync(workingDir + "/dist/include", { recursive: true });