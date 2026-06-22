export namespace Order {
    export interface item{
        product_id:string;
        quantity:number;
        remark?:string;
    }

    export interface order{
        order_id:string;
        order_date:string;
        order_status:string;
        order_total:number;
        order_items:item[];
        create_at:string;
    }
}



namespace VendorOrder {
    export interface item extends Order.item{
        vendor_id:string;
    }

    export interface Order extends Order.order{
        vendor_id:string;
        expected_arrival_date:string;
    }
}

namespace CustomerOrder {
    export interface item extends Order.item{
        customer_id:string;
    }

    export interface Order extends Order.order{
        customer_id:string;
    }
}
