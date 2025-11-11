import React from 'react';

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  category: string;
  views: number;
  likes: number;
  imageUrl?: string;
}

export type TabType = 'news';
