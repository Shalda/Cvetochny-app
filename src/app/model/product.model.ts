export class Product {
    constructor(
        public id?: number,
        public name?: string,
        public parentCategory?: string,
        public category?: string,
        public subcategory?: string,
        public  diameter?: number,
        public img?: string,
        public description?: string,
        public price?: number,
        public create_ts?: string) {
    }
}
export class Visual {
    constructor(
        public id?: number,
        public name?: string,
        public parentCategory?: string,
        public category?: string,
        public img?: string[],
        public description?: string,
        public price?: number,
        public create_ts?: string) {
    }
}

