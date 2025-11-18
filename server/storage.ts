import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByAzureId(azureId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  update2FASecret(userId: string, secret: string): Promise<User | undefined>;
  enable2FA(userId: string): Promise<User | undefined>;
  disable2FA(userId: string): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === username,
    );
  }

  async getUserByAzureId(azureId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.azureId === azureId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      twoFactorSecret: null,
      twoFactorEnabled: "false",
    };
    this.users.set(id, user);
    return user;
  }

  async update2FASecret(userId: string, secret: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    user.twoFactorSecret = secret;
    this.users.set(userId, user);
    return user;
  }

  async enable2FA(userId: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    user.twoFactorEnabled = "true";
    this.users.set(userId, user);
    return user;
  }

  async disable2FA(userId: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    user.twoFactorEnabled = "false";
    user.twoFactorSecret = null;
    this.users.set(userId, user);
    return user;
  }
}

export const storage = new MemStorage();
