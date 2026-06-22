export namespace Weight {
           
    export type SIUnit='mg' | 'g' | 'kg' | 'ton';
    export type ImperialUnit='oz' | 'lb' | 'ton';

    export interface Weight{
        unitType: 'SI' | 'Imperial';
        value: number;
    }
}