import type { ApiClient } from './client.js';
import type { IWarehouse, IVendor, IPhysicalStock, IVirtualStock } from './types.js';

// ── Request shapes ─────────────────────────────────────────────────────────────

export interface CreateWarehouseDto {
  name: string;
  address?: string;
}

export interface CreateVendorDto {
  name: string;
  contact_email?: string;
  contact_phone?: string;
}

export interface CreatePhysicalStockDto {
  variant_id: string;
  warehouse_id: string;
  vendor_id: string;
  quantity: number;
  cost: number;
  batch_id?: string;
  expiry_date?: string;
  location?: string;
}

export interface CreateVirtualStockDto {
  variant_id: string;
  quantity: number;
  location_note?: string;
  expiry_date?: string;
}

// ── API namespace ─────────────────────────────────────────────────────────────

export class InventoryApi {
  constructor(private readonly client: ApiClient) {}

  // Warehouses
  listWarehouses(): Promise<IWarehouse[]> {
    return this.client.get('/warehouse');
  }
  getWarehouse(id: string): Promise<IWarehouse> {
    return this.client.get(`/warehouse/${id}`);
  }
  createWarehouse(dto: CreateWarehouseDto): Promise<IWarehouse> {
    return this.client.post('/warehouse', dto);
  }
  updateWarehouse(id: string, dto: Partial<CreateWarehouseDto>): Promise<IWarehouse> {
    return this.client.patch(`/warehouse/${id}`, dto);
  }
  deleteWarehouse(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/warehouse/${id}`);
  }

  // Vendors
  listVendors(): Promise<IVendor[]> {
    return this.client.get('/vendor');
  }
  getVendor(id: string): Promise<IVendor> {
    return this.client.get(`/vendor/${id}`);
  }
  createVendor(dto: CreateVendorDto): Promise<IVendor> {
    return this.client.post('/vendor', dto);
  }
  updateVendor(id: string, dto: Partial<CreateVendorDto>): Promise<IVendor> {
    return this.client.patch(`/vendor/${id}`, dto);
  }
  deleteVendor(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/vendor/${id}`);
  }

  // Physical stock
  listPhysicalStock(filter?: {
    variant_id?: string;
    warehouse_id?: string;
    vendor_id?: string;
  }): Promise<IPhysicalStock[]> {
    return this.client.get('/stock/physical', filter);
  }
  getPhysicalStock(id: string): Promise<IPhysicalStock> {
    return this.client.get(`/stock/physical/${id}`);
  }
  createPhysicalStock(dto: CreatePhysicalStockDto): Promise<IPhysicalStock> {
    return this.client.post('/stock/physical', dto);
  }
  updatePhysicalStock(
    id: string,
    dto: Partial<Pick<CreatePhysicalStockDto, 'quantity' | 'cost' | 'batch_id' | 'expiry_date' | 'location'>>,
  ): Promise<IPhysicalStock> {
    return this.client.patch(`/stock/physical/${id}`, dto);
  }
  adjustPhysicalStock(id: string, delta: number): Promise<IPhysicalStock> {
    return this.client.patch(`/stock/physical/${id}/adjust`, { delta });
  }
  deletePhysicalStock(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/stock/physical/${id}`);
  }

  // Virtual stock
  listVirtualStock(filter?: { variant_id?: string }): Promise<IVirtualStock[]> {
    return this.client.get('/stock/virtual', filter);
  }
  getVirtualStock(id: string): Promise<IVirtualStock> {
    return this.client.get(`/stock/virtual/${id}`);
  }
  createVirtualStock(dto: CreateVirtualStockDto): Promise<IVirtualStock> {
    return this.client.post('/stock/virtual', dto);
  }
  updateVirtualStock(
    id: string,
    dto: Partial<Pick<CreateVirtualStockDto, 'quantity' | 'location_note' | 'expiry_date'>>,
  ): Promise<IVirtualStock> {
    return this.client.patch(`/stock/virtual/${id}`, dto);
  }
  adjustVirtualStock(id: string, delta: number): Promise<IVirtualStock> {
    return this.client.patch(`/stock/virtual/${id}/adjust`, { delta });
  }
  deleteVirtualStock(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/stock/virtual/${id}`);
  }
}
