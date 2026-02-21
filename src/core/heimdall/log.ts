import { appendFile, mkdir } from "node:fs/promises";

export async function heimdallLog(obj: unknown){
 await mkdir("logs",{recursive:true})
 await appendFile("logs/vulcano.ndjson",JSON.stringify(obj)+"\n")
}
