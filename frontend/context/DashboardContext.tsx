'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

// Define types based on API response
export interface Document {
  documentId: string;
  nickname: string;
  originalFileName: string;
  data_confidence: number;
  ai_confidence: number;
  createdAt: string;
}

export interface MetricResult {
  metric: string;
  type: string;
  chart: string;
  data: {
    labels: string[];
    values: number[];
  };
  importance: number;
  derived_from: string[];
  ai_reason: string;
}

export interface ProcessedDataset {
  file_name: string;
  nickname: string;
  data_confidence: number;
  ai_confidence: number;
  metrics: MetricResult[];
  insights: string[];
  action_plan_30_days: string[];
  [key: string]: unknown;
}

export interface GroupSummary {
  [key: string]: unknown;
}

export interface DashboardContextType {
  documents: Document[];
  processedData: {
    datasets: ProcessedDataset[];
    group_summary: GroupSummary | null;
  };
  isLoading: boolean;
  refreshDocuments: () => Promise<void>;
  refreshProcessedData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [processedData, setProcessedData] = useState<{
    datasets: ProcessedDataset[];
    group_summary: GroupSummary | null;
  }>({ datasets: [], group_summary: null });
  const [isLoading, setIsLoading] = useState(false);

  const refreshDocuments = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/documents?clerkUserId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
  }, [user]);

  const refreshProcessedData = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/documents/processed?clerkUserId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setProcessedData(data);
      }
    } catch (error) {
      console.error('Failed to fetch processed data:', error);
    }
  }, [user]);

  useEffect(() => {
    const loadData = async () => {
      if (isLoaded && user) {
        setIsLoading(true);
        try {
          await Promise.all([refreshDocuments(), refreshProcessedData()]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadData();
  }, [isLoaded, user, refreshDocuments, refreshProcessedData]);

  return (
    <DashboardContext.Provider
      value={{
        documents,
        processedData,
        isLoading,
        refreshDocuments,
        refreshProcessedData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
