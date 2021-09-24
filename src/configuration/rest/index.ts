import restify from "restify";
import { getHealth } from "./GetHealth";
import { getReleases } from "./GetReleases";

const server = restify.createServer();

server.use(restify.plugins.queryParser());

server.get(
  "/package/health/:packageName/:packageVersion",
  async (res, req, next) => await getHealth.handle(res, req, next)
);

server.get(
  "/package/releases/:packageName",
  async (res, req, next) => await getReleases.handle(res, req, next)
);

server.listen(8080, () => console.log("listening on port 8080"));
