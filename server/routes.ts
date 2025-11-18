import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Download route for project archive
  app.get("/download-project", (req, res) => {
    const filePath = path.resolve(import.meta.dirname, "..", "uptime-alert-dashboard.tar.gz");
    res.download(filePath, "uptime-alert-dashboard.tar.gz", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(404).send("File not found");
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
