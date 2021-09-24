import restify from "restify";
import { getHealth } from "./GetHealth";

const server = restify.createServer();

server.use(restify.plugins.queryParser());

server.get(
  "/package/health/:packageName/:packageVersion",
  async (res, req, next) => await getHealth.handle(res, req, next)
);

server.listen(8080, () => console.log("listening on port 8080"));
