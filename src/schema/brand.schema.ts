/**
 * Class-first brand schema shared across applications.
 *
 * Rules:
 * - Types are declared before classes.
 * - Base class contains shared fields/behaviour.
 * - Child class extends with additional properties.
 * - Enum-like values are declared as const arrays.
 */

export const BRAND_STATUS_VALUES = ['active', 'inactive'] as const;
export type BrandStatus = (typeof BRAND_STATUS_VALUES)[number];

export type BrandProps = {
  id: string;
  name: string;
  slug: string;
  status: BrandStatus;
  created_at: string;
};

export type FeaturedBrandProps = BrandProps & {
  featured_rank: number;
};

export class BrandSchema {
  constructor(protected readonly props: BrandProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.created_at;
  }

  toJSON(): BrandProps {
    return { ...this.props };
  }
}

export class FeaturedBrandSchema extends BrandSchema {
  constructor(protected readonly props: FeaturedBrandProps) {
    super(props);
  }

  get featuredRank() {
    return this.props.featured_rank;
  }
}
