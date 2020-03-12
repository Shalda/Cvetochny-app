export class Product {
    constructor(
        public _id?: string,
        public name?: string,
        public parentCategory?: string,
        public category?: string,
        public subcategory?: string,
        public diameter?: string,
        public img?: string,
        public description?: string,
        public note?: string,
        public price?: any,
        public create_ts?: string,
        public newProd?: number
    ) {
    }
}

export class Visual {
    constructor(
        public _id?: string,
        public name?: string,
        public parentCategory?: string,
        public category?: string,
        public img?: string[],
        public description?: string,
        public price?: any,
        public create_ts?: string) {
    }
}

