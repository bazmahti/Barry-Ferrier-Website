import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertImageSchema, 
  insertVideoSchema,
  insertProjectSchema,
  insertAwardSchema,
  insertHistoryItemSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import session from "express-session";

declare module 'express-session' {
  interface SessionData {
    isAdmin: boolean;
  }
}

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD || "doctorbaz2024";

async function verifyPassword(password: string): Promise<boolean> {
  if (ADMIN_PASSWORD_HASH) {
    const bcrypt = await import("bcrypt");
    return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  }
  return password === ADMIN_PASSWORD_PLAIN;
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  registerObjectStorageRoutes(app);
  
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:slug", async (req, res) => {
    try {
      const project = await storage.getProjectBySlug(req.params.slug);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.get("/api/history", async (req, res) => {
    try {
      const items = await storage.getHistoryItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching history items:", error);
      res.status(500).json({ error: "Failed to fetch history items" });
    }
  });

  app.get("/api/history/:slug", async (req, res) => {
    try {
      const item = await storage.getHistoryItemBySlug(req.params.slug);
      if (!item) {
        return res.status(404).json({ error: "History item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching history item:", error);
      res.status(500).json({ error: "Failed to fetch history item" });
    }
  });

  app.get("/api/awards", async (req, res) => {
    try {
      const awardsList = await storage.getAwards();
      res.json(awardsList);
    } catch (error) {
      console.error("Error fetching awards:", error);
      res.status(500).json({ error: "Failed to fetch awards" });
    }
  });

  app.get("/api/videos", async (req, res) => {
    try {
      const videosList = await storage.getVideos();
      res.json(videosList);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/slides", async (req, res) => {
    try {
      const slidesList = await storage.getSlides();
      res.json(slidesList);
    } catch (error) {
      console.error("Error fetching slides:", error);
      res.status(500).json({ error: "Failed to fetch slides" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { recaptchaToken, ...formData } = req.body;
      
      // Verify reCAPTCHA if secret key is configured
      const recaptchaSecretKey = process.env.google_secret_key;
      if (recaptchaSecretKey && recaptchaToken) {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
        const verifyResponse = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`
        });
        const verifyResult = await verifyResponse.json() as { success: boolean };
        
        if (!verifyResult.success) {
          return res.status(400).json({ error: "CAPTCHA verification failed. Please try again." });
        }
      }
      
      const validatedData = insertContactMessageSchema.parse(formData);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating contact message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/images", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const imageList = category 
        ? await storage.getImagesByCategory(category)
        : await storage.getImages();
      res.json(imageList);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });

  app.post("/api/images", requireAuth, async (req, res) => {
    try {
      const validatedData = insertImageSchema.parse(req.body);
      const image = await storage.createImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating image:", error);
      res.status(500).json({ error: "Failed to create image" });
    }
  });

  app.delete("/api/images/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      await storage.deleteImage(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    const isValid = await verifyPassword(password);
    if (isValid) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  // Admin Videos CRUD
  app.post("/api/admin/videos", requireAuth, async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.status(201).json(video);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating video:", error);
      res.status(500).json({ error: "Failed to create video" });
    }
  });

  app.put("/api/admin/videos/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const validatedData = insertVideoSchema.partial().parse(req.body);
      const video = await storage.updateVideo(id, validatedData);
      res.json(video);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error updating video:", error);
      res.status(500).json({ error: "Failed to update video" });
    }
  });

  app.delete("/api/admin/videos/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      await storage.deleteVideo(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  // Admin Projects CRUD
  app.post("/api/admin/projects", requireAuth, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      res.json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      await storage.deleteProject(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Admin Awards CRUD
  app.post("/api/admin/awards", requireAuth, async (req, res) => {
    try {
      const validatedData = insertAwardSchema.parse(req.body);
      const award = await storage.createAward(validatedData);
      res.status(201).json(award);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating award:", error);
      res.status(500).json({ error: "Failed to create award" });
    }
  });

  app.put("/api/admin/awards/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const validatedData = insertAwardSchema.partial().parse(req.body);
      const award = await storage.updateAward(id, validatedData);
      res.json(award);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error updating award:", error);
      res.status(500).json({ error: "Failed to update award" });
    }
  });

  app.delete("/api/admin/awards/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      await storage.deleteAward(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting award:", error);
      res.status(500).json({ error: "Failed to delete award" });
    }
  });

  // Admin History CRUD
  app.post("/api/admin/history", requireAuth, async (req, res) => {
    try {
      const validatedData = insertHistoryItemSchema.parse(req.body);
      const item = await storage.createHistoryItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating history item:", error);
      res.status(500).json({ error: "Failed to create history item" });
    }
  });

  app.put("/api/admin/history/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const validatedData = insertHistoryItemSchema.partial().parse(req.body);
      const item = await storage.updateHistoryItem(id, validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error updating history item:", error);
      res.status(500).json({ error: "Failed to update history item" });
    }
  });

  app.delete("/api/admin/history/:id", requireAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      await storage.deleteHistoryItem(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting history item:", error);
      res.status(500).json({ error: "Failed to delete history item" });
    }
  });

  // Admin Contact Messages
  app.get("/api/admin/messages", requireAuth, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // SEO: robots.txt
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(
`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://barryferrier.com/sitemap.xml`
    );
  });

  // SEO: sitemap.xml
  app.get("/sitemap.xml", async (_req, res) => {
    const baseUrl = "https://barryferrier.com";
    
    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/about", priority: "0.9", changefreq: "monthly" },
      { url: "/entombed", priority: "0.9", changefreq: "monthly" },
      { url: "/book", priority: "0.8", changefreq: "monthly" },
      { url: "/brushstrokes", priority: "0.8", changefreq: "monthly" },
      { url: "/music", priority: "0.8", changefreq: "monthly" },
      { url: "/projects", priority: "0.8", changefreq: "weekly" },
      { url: "/history", priority: "0.8", changefreq: "monthly" },
      { url: "/awards", priority: "0.7", changefreq: "monthly" },
      { url: "/videos", priority: "0.7", changefreq: "weekly" },
      { url: "/award-videos", priority: "0.7", changefreq: "monthly" },
      { url: "/electronic-music", priority: "0.7", changefreq: "monthly" },
      { url: "/academic", priority: "0.7", changefreq: "monthly" },
      { url: "/innovation", priority: "0.7", changefreq: "monthly" },
      { url: "/enter-the-machine", priority: "0.6", changefreq: "yearly" },
      { url: "/contact", priority: "0.6", changefreq: "monthly" },
      { url: "/links", priority: "0.5", changefreq: "monthly" },
    ];

    try {
      const [projects, historyItems] = await Promise.all([
        storage.getProjects(),
        storage.getHistoryItems(),
      ]);

      const dynamicPages = [
        ...projects.map(p => ({ url: `/projects/${p.slug}`, priority: "0.6", changefreq: "monthly" })),
        ...historyItems.map(h => ({ url: `/history/${h.slug}`, priority: "0.6", changefreq: "monthly" })),
      ];

      const allPages = [...staticPages, ...dynamicPages];
      const today = new Date().toISOString().split("T")[0];

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

      res.type("application/xml").send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  return httpServer;
}
