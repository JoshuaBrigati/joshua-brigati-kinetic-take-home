-- CreateTable
CREATE TABLE "Cart" (
    "cartId" SERIAL NOT NULL,
    "collection" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "description" TEXT,
    "display_animation_url" TEXT,
    "display_image_url" TEXT,
    "identifier" TEXT NOT NULL,
    "image_url" TEXT,
    "is_disabled" BOOLEAN NOT NULL,
    "is_nsfw" BOOLEAN NOT NULL,
    "metadata_url" TEXT,
    "name" TEXT,
    "opensea_url" TEXT,
    "token_standard" TEXT,
    "updated_at" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartId")
);
