// API Configuration for Fitflix Website

// Ensure the base URL points to the backend's /api prefix to match server routes
import { config } from '@/lib/config';

const RAW_API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || config.api.baseUrl;
const normalizeApiBase = (url: string | undefined | null): string => {
  const resolved = (url ?? '').toString().trim();
  if (resolved.length === 0) {
    // Fallbacks: dev -> local backend; prod -> relative /api (for reverse proxy setups)
    return (import.meta as any)?.env?.DEV ? 'http://localhost:3000/api' : '/api';
  }
  const trimmed = resolved.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};
const API_BASE_URL = normalizeApiBase(RAW_API_BASE_URL);


// Types
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  publishedAt?: string;
  scheduledPublishAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBlogData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
  id: string;
}

export interface SchedulePublishingData {
  scheduledPublishAt: string;
}

export interface SchedulerStatus {
  isRunning: boolean;
  interval: string | null;
  lastCheck: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  title1?: string;
  title2?: string;
  title3?: string;
  description: string;
  details?: {
    included?: string[];
    benefits?: string[];
    schedule?: string[];
    routeInfo?: string;
  };
  coverImage?: string;
  imageUrls?: string[];
  location?: string;
  date: string;
  entryFee?: number;
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
  responseCount?: number;
  confirmedCount?: number;
  createdAt: string;
  updatedAt: string;
  // Support both legacy string array and structured blocks
  descriptionBlocks?: Array<string | { title: string; description: string }>;
  // New backend field for structured blocks
  descriptionBlocksRich?: Array<{ title: string; description?: string; items?: string[] }>;
}

export interface EventRegistrationData {
  name: string;
  phone: string;
  email: string;
}

export interface EventResponse {
  id: string;
  eventId: string;
  name: string;
  phone: string;
  email: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

// API Client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Public blog endpoints (no authentication required)
  async getPublishedBlogs(): Promise<{ blogs: Blog[]; total: number }> {
    const response = await this.request<{ success: boolean; blogs: Blog[]; total: number }>('/blogs/status/PUBLISHED');
    return { blogs: response.blogs, total: response.blogs.length };
  }

  async getBlogBySlug(slug: string): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>(`/blogs/slug/${slug}`);
    return response.blog;
  }

  // Admin blog endpoints (authentication required)
  async getAllBlogs(): Promise<{ blogs: Blog[]; total: number }> {
    const response = await this.request<{ success: boolean; blogs: Blog[]; total: number }>('/blogs');
    return { blogs: response.blogs, total: response.blogs.length };
  }

  async getBlogById(id: string): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>(`/blogs/${id}`);
    return response.blog;
  }

  async createBlog(data: CreateBlogData): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.blog;
  }

  async updateBlog(id: string, data: Partial<CreateBlogData>): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.blog;
  }

  async deleteBlog(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  // Publishing endpoints
  async publishBlog(id: string): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>(`/blogs/${id}/publish`, {
      method: 'PATCH',
    });
    return response.blog;
  }

  async saveAsDraft(id: string): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>(`/blogs/${id}/draft`, {
      method: 'PATCH',
    });
    return response.blog;
  }

  async schedulePublishing(id: string, data: SchedulePublishingData): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>(`/blogs/${id}/schedule`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.blog;
  }

  async unschedulePublishing(id: string): Promise<Blog> {
    const response = await this.request<{ success: boolean; blog: Blog }>(`/blogs/${id}/unschedule`, {
      method: 'PATCH',
    });
    return response.blog;
  }

  // Scheduler endpoints
  async getSchedulerStatus(): Promise<{ scheduler: SchedulerStatus }> {
    return this.request<{ scheduler: SchedulerStatus }>('/blogs/scheduler/status');
  }

  async startScheduler(): Promise<{ message: string; scheduler: SchedulerStatus }> {
    return this.request<{ message: string; scheduler: SchedulerStatus }>('/blogs/scheduler/start', {
      method: 'POST',
    });
  }

  async stopScheduler(): Promise<{ message: string; scheduler: SchedulerStatus }> {
    return this.request<{ message: string; scheduler: SchedulerStatus }>('/blogs/scheduler/stop', {
      method: 'POST',
    });
  }

  async manualCheck(): Promise<{ message: string; scheduler: SchedulerStatus }> {
    return this.request<{ message: string; scheduler: SchedulerStatus }>('/blogs/scheduler/check', {
      method: 'POST',
    });
  }

  // Events endpoints (public)
  async getUpcomingEvents(): Promise<{ events: Event[] }> {
    const response = await this.request<{ success: boolean; events: Event[] }>('/events/upcoming');
    return { events: response.events };
  }

  async getEventById(id: string): Promise<Event> {
    const response = await this.request<{ success: boolean; event: Event }>(`/events/${id}`);
    return response.event;
  }

  async registerForEvent(eventId: string, data: EventRegistrationData): Promise<{ message: string; response?: EventResponse }> {
    const response = await this.request<{ success: boolean; message: string; response?: EventResponse }>(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return { message: response.message, response: response.response };
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual API functions for convenience
export const blogApi = {
  // Public endpoints
  getPublished: () => apiClient.getPublishedBlogs(),
  getBySlug: (slug: string) => apiClient.getBlogBySlug(slug),
  
  // Admin endpoints
  getAll: () => apiClient.getAllBlogs(),
  getById: (id: string) => apiClient.getBlogById(id),
  create: (data: CreateBlogData) => apiClient.createBlog(data),
  update: (id: string, data: Partial<CreateBlogData>) => apiClient.updateBlog(id, data),
  delete: (id: string) => apiClient.deleteBlog(id),
  
  // Publishing endpoints
  publish: (id: string) => apiClient.publishBlog(id),
  saveAsDraft: (id: string) => apiClient.saveAsDraft(id),
  schedule: (id: string, data: SchedulePublishingData) => apiClient.schedulePublishing(id, data),
  unschedule: (id: string) => apiClient.unschedulePublishing(id),
  
  // Scheduler endpoints
  getSchedulerStatus: () => apiClient.getSchedulerStatus(),
  startScheduler: () => apiClient.startScheduler(),
  stopScheduler: () => apiClient.stopScheduler(),
  manualCheck: () => apiClient.manualCheck(),
};

// Events API (public)
export const eventApi = {
  getUpcoming: () => apiClient.getUpcomingEvents(),
  getById: (id: string) => apiClient.getEventById(id),
  register: (eventId: string, data: EventRegistrationData) => apiClient.registerForEvent(eventId, data)
};