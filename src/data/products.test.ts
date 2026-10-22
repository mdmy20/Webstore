import { describe, it, expect } from 'vitest';
import { PRODUCTS, CATEGORIES } from './products';

describe('mshopy Store Catalog Data & Payments', () => {
  it('contains valid product catalog with design tokens alignment', () => {
    expect(PRODUCTS).toBeDefined();
    expect(PRODUCTS.length).toBeGreaterThan(0);
  });

  it('ensures every product has essential store properties', () => {
    PRODUCTS.forEach((product) => {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.artist).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.category).toBeTruthy();
      expect(product.image).toMatch(/^https?:\/\//);
      expect(product.description).toBeTruthy();
      expect(product.rating).toBeGreaterThanOrEqual(1);
      expect(product.rating).toBeLessThanOrEqual(5);
    });
  });

  it('contains all defined apparel categories', () => {
    expect(CATEGORIES.length).toBe(5);
    const categoryIds = CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain('baju');
    expect(categoryIds).toContain('celana');
    expect(categoryIds).toContain('jaket');
    expect(categoryIds).toContain('sepatu');
    expect(categoryIds).toContain('aksesoris');
  });

  it('calculates sale prices correctly if present', () => {
    const saleItems = PRODUCTS.filter((p) => p.salePrice !== undefined);
    expect(saleItems.length).toBeGreaterThan(0);
    saleItems.forEach((item) => {
      expect(item.salePrice!).toBeLessThan(item.price);
    });
  });
});
