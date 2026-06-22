export namespace Dimension { 
    /**
     * Interface for various product/package dimensions.
     * Includes attributes for unit type (e.g., SI, Imperial) and unit size (e.g., mm, cm, m, miles).
     */

    export type SIUnitSize = 'mm' | 'cm' | 'm' | 'km' ;
    export type ImperialUnitSize = 'in' | 'ft' | 'yd' | 'mi';
    export type ShoeUnitSize = 'US' | 'UK' | 'EU';
    export type GenericUnitSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

    export type UnitType = {
        type: 'SI' | 'Imperial' | 'Shoe' | 'Generic'
        size: UnitSize;
    };
    export type SIUnitType = {
        type: 'SI'
        size: SIUnitSize;
    };
    export type ImperialUnitType = {
        type: 'Imperial'
        size: UnitSize;
    };
    export type ShoeUnitType = {
        type: 'Shoe'
        size: ShoeUnitSize;
    };
    export type GenericUnitType = {
        type: 'Generic'
        size: GenericUnitSize;
    };

    export type UnitSize = SIUnitSize | ImperialUnitSize | ShoeUnitSize | GenericUnitSize;

    /**
     * Generic interface for a dimension with value and unit size.
     * @template T - Unit size type (e.g. SIUnitSize, ImperialUnitSize). Defaults to UnitSize for backward compatibility.
     * @example
     * Dimension<SIUnitSize>        // value + 'mm' | 'cm' | 'm' | 'km'
     * Dimension<ImperialUnitSize> // value + 'in' | 'ft' | 'yd' | 'mi'
     * Dimension<ShoeUnitSize>     // value + 'US' | 'UK' | 'EU'
     */
    export interface Dimension<T extends UnitSize = UnitSize> {
        value: number;
        unitSize: T;
    }


    /**
     * Dimensions for a rectangular package or product.
     * Now includes unitType for the entire set of dimensions.
     */
    export interface RectangularDimensions<T extends UnitSize = UnitSize> {
        unitType: UnitType;
        length: Dimension<T>;
        width: Dimension<T>;
        height: Dimension<T>;
    }

    /**
     * Dimensions for a cylindrical object.
     * Now includes unitType for the entire set of dimensions.
     */
    export interface CylindricalDimensions<T extends UnitSize = UnitSize> {
        unitType: UnitType;
        diameter: Dimension<T>;
        height?: Dimension<T>;
    }

    /**
     * Dimensions for a spherical object.
     * Now includes unitType for the entire set of dimensions.
     */
    export interface SphericalDimensions<T extends UnitSize = UnitSize> {
        unitType: UnitType;
        diameter: Dimension<T>;
    }

    export interface ShoeDimensions<T extends UnitSize = UnitSize> {
        unitType: ShoeUnitSize;
        size: number;
    }

    export type DimensionType = RectangularDimensions | CylindricalDimensions | SphericalDimensions | ShoeDimensions;

}