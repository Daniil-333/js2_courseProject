export const ProductItemBig = {
    props: ['img', 'product'],

    template: `
                <main class="main-single-page"
                    <div class="slider-product">
                        <a href="#" class="slider-product__link"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
                        <img :src="img" :alt="product.product_name">
                        <a href="#" class="slider-product__link"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
                    </div>
                    <div class="product-single">
                        <div class="container">
                            <div class="product-single__info">
                                <p class="product-single__collection">Women Collection</p>
                                <h2 class="product-single__heading">Moschino Cheap And Chic</h2>
                                <p class="product-single__description">Compellingly actualize fully researched processes before proactive
                                outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize                                   parallel core competencies rather than exceptional portals.</p>
                                <div class="product-single__props">
                                    <p class="product-single__prop">MATERIAL: <span class="product-single__prop-value">{{ product.material }}</span></p>
                                    <p class="product-single__prop">DESIGNER: <span class="product-single__prop-value">{{ product.designer }}</span></p>
                                </div>
                                <p class="product-single__price">$\{{  product.price  }}</p>
                            </div>
                            <form action="#" class="product-params">
                                <div>
                                    <p class="product-params__title">Choose color</p>
                                    <select class="product-params__input" v-model="product.color">
                                    <option value="red" class="input-color">Red</option>
                                    </select>
                                </div>
                                <div>
                                    <p class="product-params__title">Choose Size</p>
                                    <select class="product-params__input" v-model="product.size">
                                    <option value="xxl">XXL</option>
                                    </select>
                                </div>
                                <div>
                                    <p class="product-params__title">Quantity</p>
                                    <input type="number" value="2" class="product-params__input no-arrow">
                                </div>
                                <button class="product-add" @click="$root.$refs.cart.addProduct(product)">Add to Cart</button>
                            </form>
                        </div>
                    </div>
                </main>
    `
};