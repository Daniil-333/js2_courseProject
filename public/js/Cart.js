import {CartItem} from "./CartItem.js";
import { CartItemBig  } from "./CartItemBig.js";

export const Cart = {
    inject: ['getJson', 'putJson', 'postJson', 'deleteJson'],
    props: {
        sizecart: {
            type: String,
            default: "small"
        }
    },
    components: {
        CartItem,
        CartItemBig
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
        },
        clearCart() {
            this.deleteJson(`/api/cart/`)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.length = 0;
                        }
                    });
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
    template: `<div v-if = "sizecart==='small'" class="cart">
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

               <div  v-if = "sizecart === 'big'" class="container">
                    <div class="shop-cart__titles">
                        <p class="shop-cart__title">Product details</p>
                        <p class="shop-cart__title">Unit price</p>
                        <p class="shop-cart__title">Quantity</p>
                        <p class="shop-cart__title">Shipping</p>
                        <p class="shop-cart__title">Subtotal</p>
                        <p class="shop-cart__title">Action</p>
                    </div>
                    <cart-item-big 
                        v-for="item of cartItems" 
                        :key="item.id_product"
                        :img="item.img"
                        :size="item.size"
                        :color="item.color"
                        :cartItem="item"
                        @remove="remove"
                        ></cart-item-big>
                        <div class="shop-cart__buttons">
                        <button @click="clearCart()" class="shop-cart__button">Clear shopping cart</button>
                        <a href="product.html" class="shop-cart__button">Continue shopping</a>
                    </div>
                    <div class="shop-cart__forms">
                        <div class="shop-cart-form">
                            <p class="shop-cart-form__title">Shipping Adress</p>
                            <select class="shop-cart-form__input">
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="#">Country2</option>
                                <option value="#">Country3</option>
                            </select>
                            <input type="text" class="shop-cart-form__input" placeholder="State">
                            <input type="number" min="000000" max="999999" class="shop-cart-form__input no-arrow"
                                placeholder="Postcode / Zip">
                            <button class="shop-cart-form__quote">get a quote</button>
                        </div>
                        <div class="shop-cart-form">
                            <p class="shop-cart-form__title">coupon discount</p>
                            <p class="shop-cart-form__text">Enter your coupon code if you have one</p>
                            <input type="text" class="shop-cart-form__input" placeholder="State">
                            <button class="shop-cart-form__coupon">Apply coupon</button>
                        </div>
                        <div class="shop-cart-final">
                            <div class="shop-cart-final__sum">
                                <p class="shop-cart-final__sub">Sub total <span class="shop-cart-final__sub-span">$ {{ this.calcSum }}</span></p>
                                <p class="shop-cart-final__grand">Grand Total <span class="shop-cart-final__grand-span">$ {{ this.calcSum }}</span></p>
                            </div>
                            <a href="checkout.html" class="shop-cart-final__buy">proceed to checkout</a>
                        </div>
                    </div>
              </div>
    `
};

