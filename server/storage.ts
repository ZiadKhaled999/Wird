import { 
  users, type User, type InsertUser, type UpdateUser, 
  verses, type Verse, 
  posts, type Post, type InsertPost
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByMastodonId(mastodonId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<UpdateUser>): Promise<User | undefined>;
  incrementDaysPosted(userId: number): Promise<User | undefined>;
  updateCurrentVerseIndex(userId: number, index: number): Promise<User | undefined>;

  // Verse operations
  getVerse(id: number): Promise<Verse | undefined>;
  getVerseByIndex(index: number): Promise<Verse | undefined>;
  getAllVerses(): Promise<Verse[]>;
  getTotalVerseCount(): Promise<number>;

  // Post operations
  createPost(post: InsertPost): Promise<Post>;
  getPostsByUserId(userId: number): Promise<Post[]>;
  getRecentPostsByUserId(userId: number, limit: number): Promise<Post[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private verses: Map<number, Verse>;
  private posts: Map<number, Post>;
  private userCurrentId: number;
  private verseCurrentId: number;
  private postCurrentId: number;

  constructor() {
    this.users = new Map();
    this.verses = new Map();
    this.posts = new Map();
    this.userCurrentId = 1;
    this.verseCurrentId = 1;
    this.postCurrentId = 1;

    // Initialize with some sample verses
    const quranVerses = [
      { 
        surahNumber: 1, 
        surahName: 'الفاتحة', 
        surahNameEnglish: 'Al-Fatihah', 
        verseNumber: 1,
        verseText: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
        verseTextEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful'
      },
      { 
        surahNumber: 1, 
        surahName: 'الفاتحة', 
        surahNameEnglish: 'Al-Fatihah', 
        verseNumber: 2,
        verseText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        verseTextEnglish: '[All] praise is [due] to Allah, Lord of the worlds'
      },
      { 
        surahNumber: 1, 
        surahName: 'الفاتحة', 
        surahNameEnglish: 'Al-Fatihah', 
        verseNumber: 3,
        verseText: 'الرَّحْمَنِ الرَّحِيمِ',
        verseTextEnglish: 'The Entirely Merciful, the Especially Merciful'
      }
    ];
    
    quranVerses.forEach(verse => {
      const id = this.verseCurrentId++;
      this.verses.set(id, { ...verse, id });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByMastodonId(mastodonId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.mastodonId === mastodonId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    // Ensure all fields are properly initialized with defaults for null values
    const user: User = { 
      ...insertUser, 
      id,
      mastodonInstance: insertUser.mastodonInstance || null,
      mastodonAccessToken: insertUser.mastodonAccessToken || null,
      mastodonId: insertUser.mastodonId || null,
      startDate: insertUser.startDate || null,
      currentVerseIndex: insertUser.currentVerseIndex || 0,
      daysPosted: insertUser.daysPosted || 0
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<UpdateUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async incrementDaysPosted(userId: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    const daysPosted = (user.daysPosted || 0) + 1;
    const updatedUser = { ...user, daysPosted };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateCurrentVerseIndex(userId: number, index: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    const updatedUser = { ...user, currentVerseIndex: index };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Verse operations
  async getVerse(id: number): Promise<Verse | undefined> {
    return this.verses.get(id);
  }

  async getVerseByIndex(index: number): Promise<Verse | undefined> {
    const verses = Array.from(this.verses.values());
    const totalVerses = verses.length;
    
    if (totalVerses === 0) return undefined;
    
    // Handle wrapping around if index is greater than number of verses
    const normalizedIndex = index % totalVerses;
    return verses[normalizedIndex];
  }

  async getAllVerses(): Promise<Verse[]> {
    return Array.from(this.verses.values());
  }

  async getTotalVerseCount(): Promise<number> {
    return this.verses.size;
  }

  // Post operations
  async createPost(insertPost: any): Promise<Post> {
    const id = this.postCurrentId++;
    const post: Post = { ...insertPost, id };
    this.posts.set(id, post);
    return post;
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => {
        if (!a.postedAt || !b.postedAt) return 0;
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      });
  }

  async getRecentPostsByUserId(userId: number, limit: number): Promise<Post[]> {
    const allPosts = await this.getPostsByUserId(userId);
    return allPosts.slice(0, limit);
  }
}

export const storage = new MemStorage();
