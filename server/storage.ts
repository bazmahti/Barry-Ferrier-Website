import { 
  type User, type InsertUser,
  type Project, type InsertProject,
  type HistoryItem, type InsertHistoryItem,
  type Award, type InsertAward,
  type Video, type InsertVideo,
  type ContactMessage, type InsertContactMessage,
  type Slide, type InsertSlide,
  type Image, type InsertImage,
  users, projects, historyItems, awards, videos, contactMessages, slides, images
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;
  
  getHistoryItems(): Promise<HistoryItem[]>;
  getHistoryItemBySlug(slug: string): Promise<HistoryItem | undefined>;
  createHistoryItem(item: InsertHistoryItem): Promise<HistoryItem>;
  updateHistoryItem(id: string, item: Partial<InsertHistoryItem>): Promise<HistoryItem | undefined>;
  deleteHistoryItem(id: string): Promise<void>;
  
  getAwards(): Promise<Award[]>;
  createAward(award: InsertAward): Promise<Award>;
  updateAward(id: string, award: Partial<InsertAward>): Promise<Award | undefined>;
  deleteAward(id: string): Promise<void>;
  
  getVideos(): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined>;
  deleteVideo(id: string): Promise<void>;
  
  getSlides(): Promise<Slide[]>;
  createSlide(slide: InsertSlide): Promise<Slide>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  getImages(): Promise<Image[]>;
  getImagesByCategory(category: string): Promise<Image[]>;
  createImage(image: InsertImage): Promise<Image>;
  deleteImage(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(projects.order);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updated;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async getHistoryItems(): Promise<HistoryItem[]> {
    return db.select().from(historyItems).orderBy(historyItems.order);
  }

  async getHistoryItemBySlug(slug: string): Promise<HistoryItem | undefined> {
    const [item] = await db.select().from(historyItems).where(eq(historyItems.slug, slug));
    return item;
  }

  async createHistoryItem(item: InsertHistoryItem): Promise<HistoryItem> {
    const [newItem] = await db.insert(historyItems).values(item).returning();
    return newItem;
  }

  async updateHistoryItem(id: string, item: Partial<InsertHistoryItem>): Promise<HistoryItem | undefined> {
    const [updated] = await db.update(historyItems).set(item).where(eq(historyItems.id, id)).returning();
    return updated;
  }

  async deleteHistoryItem(id: string): Promise<void> {
    await db.delete(historyItems).where(eq(historyItems.id, id));
  }

  async getAwards(): Promise<Award[]> {
    return db.select().from(awards).orderBy(awards.order);
  }

  async createAward(award: InsertAward): Promise<Award> {
    const [newAward] = await db.insert(awards).values(award).returning();
    return newAward;
  }

  async updateAward(id: string, award: Partial<InsertAward>): Promise<Award | undefined> {
    const [updated] = await db.update(awards).set(award).where(eq(awards.id, id)).returning();
    return updated;
  }

  async deleteAward(id: string): Promise<void> {
    await db.delete(awards).where(eq(awards.id, id));
  }

  async getVideos(): Promise<Video[]> {
    return db.select().from(videos).orderBy(videos.order);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const [newVideo] = await db.insert(videos).values(video).returning();
    return newVideo;
  }

  async updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined> {
    const [updated] = await db.update(videos).set(video).where(eq(videos.id, id)).returning();
    return updated;
  }

  async deleteVideo(id: string): Promise<void> {
    await db.delete(videos).where(eq(videos.id, id));
  }

  async getSlides(): Promise<Slide[]> {
    return db.select().from(slides).orderBy(slides.order);
  }

  async createSlide(slide: InsertSlide): Promise<Slide> {
    const [newSlide] = await db.insert(slides).values(slide).returning();
    return newSlide;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }

  async getImages(): Promise<Image[]> {
    return db.select().from(images).orderBy(images.category, images.order);
  }

  async getImagesByCategory(category: string): Promise<Image[]> {
    return db.select().from(images).where(eq(images.category, category)).orderBy(images.order);
  }

  async createImage(image: InsertImage): Promise<Image> {
    const [newImage] = await db.insert(images).values(image).returning();
    return newImage;
  }

  async deleteImage(id: string): Promise<void> {
    await db.delete(images).where(eq(images.id, id));
  }
}

export const storage = new DatabaseStorage();
