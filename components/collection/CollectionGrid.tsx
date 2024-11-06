'use client';

import { useState } from 'react';
import { Collection, ListingFormData } from '../../types';
import { ListingModal } from '../modal/ListingModal';
import { CollectionCard } from './CollectionCard';

interface CollectionGridProps {
  collections: Collection[];
  onCollectionClick: (collection: Collection) => void;
}

export function CollectionGrid({
  collections,
  onCollectionClick,
}: CollectionGridProps) {
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [showListingModal, setShowListingModal] = useState(false);

  const handleList = (data: ListingFormData) => {
    // Handle listing NFT collection
  };

  const onList = (collection: Collection) => {
    console.log({ collection });
    setSelectedCollection(collection);
    setShowListingModal(true);
  };

  const onDeploy = (collection: Collection) => {
    // Handle deploy NFT collection
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onClick={() => onCollectionClick(collection)}
          onList={onList}
          onDeploy={onDeploy}
        />
      ))}

      <ListingModal
        data={{
          name: selectedCollection?.name || '',
          description: selectedCollection?.description || '',
          price: selectedCollection?.floorPrice || 0,
          benefitPercentage: selectedCollection?.benefitPercentage || 0,
        }}
        open={showListingModal}
        onClose={() => setShowListingModal(false)}
        onSubmit={handleList}
      />
    </div>
  );
}
