export const ProductItem = {
    props: ['img', 'product'],
    template: `
                <div class="product" >
                    <a href="single-page.html" class="product__link">
                    <img :src="img" :alt="product.product_name" class="product__img"></a>
                    <p class="product__name">{{product.product_name}}</p>
                        <p class="product__price">$\{{product.price}}.00
                            <span class="product__raiting">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            </span>
                        </p>
                        <button class="product__add" @click="$root.$refs.cart.liveRaiting"><img src="img/basket_small.png" alt="add-to-cart" class="product__basket">Add to Cart</button>
                </div>
    
    `
};