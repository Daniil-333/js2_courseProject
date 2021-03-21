import {ProductItem} from "./ProductItem.js";

export const Products = {
    inject: ['getJson'],
    components: {
        ProductItem,
    },
    props: {
        page: {
            type: String,
            default: "main"
        }
    },
    data() {
        return {
            products: [],
            pages: {
                main: `/api/products/8`,
                prod: `/api/products/9`,
                single: `/api/products/4`
            }
        }
    },
    computed: {
        filtered() {
            return this.products.filter(el => new RegExp(this.$root.$refs.search.userSearch, 'i').test(el.product_name));
        }
    },
    mounted() {
        this.getJson(this.pages[this.page])
            .then(data => {
                this.products = data;
            });
    },
    template: `
        <div class="product-box container">
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