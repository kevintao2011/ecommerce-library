import type { ApiClient } from './client.js';
import type { IProduct, IProductVariant, ICategory, IBrand } from './types.js';
import type { ProductType, VariantType } from '../enums/product.enums.js';

// ── Request shapes ────────────────────────────────────────────────────────────

export interface CreateProductDto {
  name: string;
  description?: string;
  type: ProductType;
  bundle_price?: number;
  category_id?: string;
  brand_id?: string;
  variants: {
    name: string;
    sku: string;
    price: number;
    type: VariantType;
    weight?: number;
    dimensions?: Record<string, unknown>;
  }[];
}

export interface CreateCategoryDto {
  name: string;
  slug?: string;
  parent_id?: string;
}

export interface CreateBrandDto {
  name: string;
  slug?: string;
  description?: string;
}

// ── API namespace ─────────────────────────────────────────────────────────────

export class ProductApi {
  constructor(private readonly client: ApiClient) {}

  // Products
  listProducts(): Promise<IProduct[]> {
    return this.client.get('/product');
  }
  getProduct(id: string): Promise<IProduct> {
    return this.client.get(`/product/${id}`);
  }
  createProduct(dto: CreateProductDto): Promise<IProduct> {
    return this.client.post('/product', dto);
  }
  updateProduct(id: string, dto: Partial<CreateProductDto>): Promise<IProduct> {
    return this.client.patch(`/product/${id}`, dto);
  }
  deleteProduct(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/product/${id}`);
  }

  // Categories
  listCategories(): Promise<ICategory[]> {
    return this.client.get('/category');
  }
  listRootCategories(): Promise<ICategory[]> {
    return this.client.get('/category/roots');
  }
  getCategory(id: string): Promise<ICategory> {
    return this.client.get(`/category/${id}`);
  }
  createCategory(dto: CreateCategoryDto): Promise<ICategory> {
    return this.client.post('/category', dto);
  }
  updateCategory(id: string, dto: Partial<CreateCategoryDto>): Promise<ICategory> {
    return this.client.patch(`/category/${id}`, dto);
  }
  deleteCategory(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/category/${id}`);
  }

  // Brands
  listBrands(): Promise<IBrand[]> {
    return this.client.get('/brand');
  }
  getBrand(id: string): Promise<IBrand> {
    return this.client.get(`/brand/${id}`);
  }
  createBrand(dto: CreateBrandDto): Promise<IBrand> {
    return this.client.post('/brand', dto);
  }
  updateBrand(id: string, dto: Partial<CreateBrandDto>): Promise<IBrand> {
    return this.client.patch(`/brand/${id}`, dto);
  }
  deleteBrand(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/brand/${id}`);
  }
}
