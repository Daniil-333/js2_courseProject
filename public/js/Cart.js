import {CartItem} from "./CartItem.js";

export const Cart = {
    inject: ['getJson', 'putJson', 'postJson', 'deleteJson'],
    components: {
        CartItem,
    },
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                return
            }

            const prod = Object.assign({quantity: 1}, product);
            prod.subPrice = prod.quantity*prod.price;

            this.postJson(`/api/cart`, prod)
                .then(data => {
                    if (data.result) {
                        this.cartItems.push(prod);
                    }
                });
        },
        remove(product) {
            if (product.quantity > 1) {
                this.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--
                        }
                    })
            } else {
                this.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }
        }
    },

    computed: {
        calcSum() {
            return this.cartItems.reduce((accum, item) => accum += item.price*item.quantity, 0);
        },
    },

    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `<div class="cart">
                    <img class="cart__img" src="img/basket.png" alt="Basket" @click="showCart = !showCart">
                    <div class="cart-drop" v-show="showCart">
                        <p class="cart-drop__empty" v-if="!cartItems.length">Корзина пуста</p>
                        <CartItem 
                        v-for="item of cartItems" 
                        :key="item.id_product"
                        :img="item.img"
                        :cartItem="item"
                        @remove="remove"
                        ></CartItem>
                        <p v-if="cartItems.length" class="cart-drop__total">Total <span>$ {{ this.calcSum }}</span></p>
                        <a v-if="cartItems.length" href="checkout.html" class="cart-drop__button">Checkout</a>
                        <a v-if="cartItems.length" href="shopping-cart.html" class="cart-drop__button">Go to cart</a>
                    </div>
               </div>   
    `
};

