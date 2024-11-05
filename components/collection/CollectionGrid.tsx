"use client";

import { Collection } from "../../types";
import { CollectionCard } from "./CollectionCard";

interface CollectionGridProps {
  collections: Collection[];
  onCollectionClick: (collection: Collection) => void;
}

export function CollectionGrid({ collections, onCollectionClick }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onClick={() => onCollectionClick(collection)}
        />
      ))}
    </div>
  );
}
