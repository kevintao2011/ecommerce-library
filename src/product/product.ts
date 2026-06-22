import { Dimension } from "../dimension.js";
import { Weight } from "../weight.js";

export interface Product {
    product_id:string;
    name:string;
    description:string;
    price:number;
    dimensions:Dimension.DimensionType;
    box_dimensions:Dimension.DimensionType;
    weight:Weight.Weight;
    created_at:string;
    updated_at:string;
    group_id?:string;
}