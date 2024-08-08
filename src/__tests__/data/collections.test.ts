import { collections } from "@/data/collections";

describe("Collections Data", () => {

  it("should have the correct number of collections", () => {
    expect(collections).toHaveLength(7);
  });

  it("each collection should have the required properties", () => {
    collections.forEach((collection, index) => {
      console.log(`Checking collection ${index + 1}: ${collection.name}`);
      expect(collection).toHaveProperty("collection");
      expect(collection).toHaveProperty("name");
      expect(collection).toHaveProperty("description");
      expect(collection).toHaveProperty("image_url");
      expect(collection).toHaveProperty("banner_image_url");
      expect(collection).toHaveProperty("owner");
      expect(collection).toHaveProperty("safelist_status");
      expect(collection).toHaveProperty("category");
      expect(collection).toHaveProperty("is_disabled");
      expect(collection).toHaveProperty("is_nsfw");
      expect(collection).toHaveProperty("opensea_url");
      expect(collection).toHaveProperty("contracts");
    });
  });

  it("should have valid boolean values for is_disabled and is_nsfw", () => {
    collections.forEach((collection, index) => {
      expect(typeof collection.is_disabled).toBe("boolean");
      expect(typeof collection.is_nsfw).toBe("boolean");
    });
  });

  it("should have valid safelist status", () => {
    const validStatuses = ["verified", "not_requested", "requested", "approved", "unapproved"];
    collections.forEach((collection, index) => {
      expect(validStatuses).toContain(collection.safelist_status);
    });
  });

  it("should have at least one contract for each collection", () => {
    collections.forEach((collection, index) => {
      expect(collection.contracts.length).toBeGreaterThan(0);
      collection.contracts.forEach((contract) => {
        expect(contract).toHaveProperty("address");
        expect(contract).toHaveProperty("chain");
      });
    });
  });

  it("should have valid Ethereum addresses for owners", () => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    collections.forEach((collection, index) => {
      expect(collection.owner).toMatch(ethAddressRegex);
    });
  });
});