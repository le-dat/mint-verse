'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function MarketplaceLoading() {
  return (
    <Card className='h-full backdrop-blur-lg border-muted overflow-auto'>
      {/* Header Skeleton */}
      <div className='p-4 border-b space-y-4'>
        <Skeleton className='h-8 w-48' />
        <div className='flex gap-4'>
          <Skeleton className='h-10 flex-1' />
          <Skeleton className='h-10 w-[180px]' />
        </div>
      </div>

      {/* Top Collections Skeleton */}
      <div className='p-4 border-b'>
        <Skeleton className='h-8 w-40 mb-4' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className='p-3 flex items-center gap-3'>
                <Skeleton className='w-16 h-16 rounded-lg' />
                <div className='flex-1'>
                  <Skeleton className='h-5 w-32 mb-2' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NFT Grid Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className='overflow-hidden'>
              <Skeleton className='aspect-square' />
              <div className='p-4 space-y-3'>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-10 w-full' />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
