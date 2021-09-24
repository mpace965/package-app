import restify from "restify";
import { getHealth } from "./GetHealth";

const server = restify.createServer();

server.get("/package/health/:packagename/:version", getHealth.handle);

server.listen(8080, () => console.log("listening on port 8080"));
