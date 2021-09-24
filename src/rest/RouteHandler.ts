import { Request, Response, Next } from "restify";

export interface RouteHandler {
  handle(req: Request, res: Response, next: Next): Promise<void>;
}
