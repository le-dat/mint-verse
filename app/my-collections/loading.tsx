'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionLoading() {
  return (
    <Card className='h-full backdrop-blur-lg border-muted overflow-auto'>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-6'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-6 w-24' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className='overflow-hidden'>
                <Skeleton className='aspect-square' />
                <div className='p-4 space-y-3'>
                  <Skeleton className='h-6 w-3/4' />
                  <Skeleton className='h-4 w-full' />
                  <div className='flex justify-between items-center'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                  <Skeleton className='h-10 w-full' />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
