import React from 'react';

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  link: string;
  date: string;
  views: number;
  likes: number;
}

export interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  updateTime: string;
  articles: NewsItem[];
  color: string;
  bgGradient: string;
}

export type TabType = 'news' | 'analysis';