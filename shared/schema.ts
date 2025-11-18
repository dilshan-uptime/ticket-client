import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for Microsoft SSO authenticated users
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  azureId: text("azure_id").notNull().unique(),
  twoFactorSecret: text("two_factor_secret"),
  twoFactorEnabled: text("two_factor_enabled").notNull().default("false"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  displayName: true,
  azureId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Ticket schema
export const tickets = pgTable("tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  assignedTo: varchar("assigned_to").references(() => users.id),
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;

// Status types
export const ticketStatuses = ["pending", "in-progress", "completed"] as const;
export type TicketStatus = typeof ticketStatuses[number];

// View mode types
export type ViewMode = "card" | "list" | "grid";
