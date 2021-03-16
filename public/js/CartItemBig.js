export const CartItemBig = {
    props: ['img', 'cartItem'],
    emits: ['remove', 'changeQuantity'],
    template: `
        <div class="shop-cart__item">
            <div class="product">
                <a href="single-page.html">
                    <img :src="img" :alt="cartItem.product_name" class="product__img"></a>
                <div class="product-info">
                    <h6 class="product-info__title">{{cartItem.product_name}}</h6>
                    <div class="product__raiting">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                    </div>
                    <p class="product-info__prop">Color: <span class="product-info__prop-value">{{ cartItem.color }}</span></p>
                    <p class="product-info__prop">Size: <span class="product-info__prop-value">{{ cartItem.size }}</span></p>
                </div>
            </div>
            <p class="product-params unit-price">$ {{cartItem.price}}</p>
            <p class="product-params quantity"><input type="number" v-model="cartItem.quantity" min="1" @change="$emit('changeQuantity', cartItem)"
                                                            class="product-params__input"></p>
            <p class="product-params shipping">Free</p>
            <p class="product-params subtotal">$ {{cartItem.quantity * cartItem.price}}</p>
            <button class="product-params delete" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
        </div>    
    `
};``