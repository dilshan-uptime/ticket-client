import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { TOTP, Secret } from "otpauth";
import QRCode from "qrcode";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get or create user by Azure ID
  app.post("/api/auth/user", async (req, res) => {
    try {
      const { azureId, email, displayName } = req.body;
      
      if (!azureId || !email || !displayName) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let user = await storage.getUserByAzureId(azureId);
      
      if (!user) {
        user = await storage.createUser({ azureId, email, displayName });
      }

      res.json({ user });
    } catch (error) {
      console.error("Auth user error:", error);
      res.status(500).json({ error: "Failed to authenticate user" });
    }
  });

  // Setup 2FA - Generate secret and QR code
  app.post("/api/2fa/setup", async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Generate secret
      const secret = new Secret({ size: 20 });
      const totp = new TOTP({
        issuer: "Uptime Alert Dashboard",
        label: user.email,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: secret,
      });

      // Save secret to user
      await storage.update2FASecret(userId, secret.base32);

      // Generate QR code
      const otpauthUrl = totp.toString();
      const qrCode = await QRCode.toDataURL(otpauthUrl);

      res.json({
        secret: secret.base32,
        qrCode,
      });
    } catch (error) {
      console.error("2FA setup error:", error);
      res.status(500).json({ error: "Failed to setup 2FA" });
    }
  });

  // Verify 2FA code during setup
  app.post("/api/2fa/verify-setup", async (req, res) => {
    try {
      const { userId, code } = req.body;
      
      if (!userId || !code) {
        return res.status(400).json({ error: "User ID and code required" });
      }

      const user = await storage.getUser(userId);
      if (!user || !user.twoFactorSecret) {
        return res.status(404).json({ error: "2FA not setup for this user" });
      }

      const totp = new TOTP({
        issuer: "Uptime Alert Dashboard",
        label: user.email,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: Secret.fromBase32(user.twoFactorSecret),
      });

      const isValid = totp.validate({ token: code, window: 1 }) !== null;

      if (isValid) {
        await storage.enable2FA(userId);
        res.json({ success: true, message: "2FA enabled successfully" });
      } else {
        res.status(400).json({ error: "Invalid code" });
      }
    } catch (error) {
      console.error("2FA verify setup error:", error);
      res.status(500).json({ error: "Failed to verify 2FA" });
    }
  });

  // Verify 2FA code during login
  app.post("/api/2fa/verify", async (req, res) => {
    try {
      const { userId, code } = req.body;
      
      if (!userId || !code) {
        return res.status(400).json({ error: "User ID and code required" });
      }

      const user = await storage.getUser(userId);
      if (!user || !user.twoFactorSecret || user.twoFactorEnabled !== "true") {
        return res.status(400).json({ error: "2FA not enabled for this user" });
      }

      const totp = new TOTP({
        issuer: "Uptime Alert Dashboard",
        label: user.email,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: Secret.fromBase32(user.twoFactorSecret),
      });

      const isValid = totp.validate({ token: code, window: 1 }) !== null;

      if (isValid) {
        res.json({ success: true, user });
      } else {
        res.status(400).json({ error: "Invalid code" });
      }
    } catch (error) {
      console.error("2FA verify error:", error);
      res.status(500).json({ error: "Failed to verify 2FA" });
    }
  });

  // Disable 2FA
  app.post("/api/2fa/disable", async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      await storage.disable2FA(userId);
      res.json({ success: true, message: "2FA disabled successfully" });
    } catch (error) {
      console.error("2FA disable error:", error);
      res.status(500).json({ error: "Failed to disable 2FA" });
    }
  });

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
