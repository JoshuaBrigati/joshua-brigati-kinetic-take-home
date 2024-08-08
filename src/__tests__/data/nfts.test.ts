import { nfts } from "@/data/nfts";
import { NFT } from "@/types";

describe("NFTs Data", () => {
  it("should have the correct number of NFTs", () => {
    expect(nfts).toHaveLength(9);
  });

  it("each NFT should have the required properties", () => {
    nfts.forEach((nft: NFT) => {
      expect(nft).toHaveProperty("identifier");
      expect(nft).toHaveProperty("collection");
      expect(nft).toHaveProperty("contract");
      expect(nft).toHaveProperty("token_standard");
      expect(nft).toHaveProperty("name");
      expect(nft).toHaveProperty("description");
      expect(nft).toHaveProperty("image_url");
      expect(nft).toHaveProperty("metadata_url");
      expect(nft).toHaveProperty("opensea_url");
      expect(nft).toHaveProperty("updated_at");
      expect(nft).toHaveProperty("is_disabled");
      expect(nft).toHaveProperty("is_nsfw");
    });
  });

  it("should have valid token standards", () => {
    const validStandards = ["erc721", "erc1155"];
    nfts.forEach((nft: NFT) => {
      expect(validStandards).toContain(nft.token_standard);
    });
  });

  it("should have valid URLs", () => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    nfts.forEach((nft: NFT) => {
      expect(nft.image_url).toMatch(urlRegex);
      expect(nft.opensea_url).toMatch(urlRegex);
    });
  });

  it("should have valid boolean values for is_disabled and is_nsfw", () => {
    nfts.forEach((nft: NFT) => {
      expect(typeof nft.is_disabled).toBe("boolean");
      expect(typeof nft.is_nsfw).toBe("boolean");
    });
  });

  it("should have a valid date string for updated_at", () => {
    nfts.forEach((nft: NFT) => {
      expect(() => new Date(nft.updated_at)).not.toThrow();
    });
  });
});