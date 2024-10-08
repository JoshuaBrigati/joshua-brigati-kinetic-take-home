import Link from "next/link";
import { Button } from "../ui/button";
import { Collection } from "@/types";

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
  <div data-testid="collection-card" className="group relative overflow-hidden rounded-lg bg-grey-600 shadow-sm border-[2px] border-grey-600">
    <div className="relative overflow-hidden">
      <img
        alt={collection.name}
        src={collection.image_url || ""}
        loading="eager"
        width="420"
        height="420"
        decoding="async"
        className="aspect-square overflow-hidden object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div data-testid="hover-overlay" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="default" size="sm" asChild>
          <Link
            href={`/collection/${collection.collection}`}
            passHref
          >
            View Collection
          </Link>
        </Button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold truncate">{collection.name}</h3>
      <p className="text-sm text-gray-400 truncate">{collection.description}</p>
    </div>
  </div>
);

export default CollectionCard
