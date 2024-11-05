"use client";

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  listed?: boolean;
  price?: number;
  benefitPercentage?: number;
  owner?: string;
  likes?: number;
  views?: number;
  network?: Network;
  collectionId?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  owner: string;
  createdAt: Date;
  nfts: NFT[];
  totalValue?: number;
  floorPrice?: number;
}

export interface Network {
  id: string;
  name: string;
  icon: string;
  gasPrice: string;
  description: string;
}

export interface ListingFormData {
  name: string;
  description: string;
  price: number;
  benefitPercentage: number;
}

export interface MarketplaceFilters {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: 'popular' | 'recent' | 'price_low' | 'price_high';
}

export interface AIVersion {
  id: string;
  name: string;
  icon: any;
  price: number;
  features: string[];
  color: string;
}