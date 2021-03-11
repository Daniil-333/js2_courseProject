import {ProductItem} from "./ProductItem.js";

export const Products = {
    inject: ['API', 'getJson'],
    components: {
        ProductItem
    },
    data() {
        return {
            // catalogUrl: '/catalogData.json',
            products: [],
        }
    },
    computed: {
        filtered() {
            return this.products.filter(el => new RegExp(this.$root.$refs.search.userSearch, 'i').test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    template: `
        <div class="product-box">
                <ProductItem
                v-for="el of filtered"
                :key="el.id_product"
                :img="el.img"
                :product="el"
                >
                </ProductItem>
            </div>
    `
};