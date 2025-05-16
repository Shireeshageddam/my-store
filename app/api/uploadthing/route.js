// app/api/uploadthing/core.js
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing.config";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
