"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="flex h-screen bg-gradient-to-b from-background to-secondary">
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4">
        <Card className="flex-1 flex flex-col bg-background/50 backdrop-blur-lg border-muted">
          {/* Header Skeleton */}
          <div className="p-4 border-b flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Messages Skeleton */}
          <div className="flex-1 p-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-20 w-64 rounded-lg" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Skeleton */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}