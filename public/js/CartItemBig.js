export const CartItemBig = {
    props: ['img', 'cartItem'],
    emits: ['remove'],
    template: `
        <div class="shop-cart__item">
            <div class="product-details">
                <a href="#" class="product-details__link">
                    <img :src="img" :alt="cartItem.product_name" class="product-details__img"></a>
                <div class="product-info">
                    <h6 class="product-info__title">{{cartItem.product_name}}</h6>
                    <div class="product__raiting">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                    </div>
                    <p class="product-info__property">Color: <span class="product-info__span">{{ cartItem.color }}</span></p>
                    <p class="product-info__property">Size: <span class="product-info__span">{{ cartItem.size }}</span></p>
                </div>
            </div>
            <p class="product-parameters unit-price">$ {{cartItem.price}}</p>
            <p class="product-parameters quantity"><input type="number" v-model="cartItem.quantity" min="1"
                                                            class="product-parameters__input"></p>
            <p class="product-parameters shipping">Free</p>
            <p class="product-parameters subtotal">$ {{cartItem.quantity * cartItem.price}}</p>
            <button class="product-parameters delete" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
        </div>    
    `
};