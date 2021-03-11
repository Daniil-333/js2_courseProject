export const CartItem = {
    props: ['img', 'cartItem'],
    emits: ['remove'],
    template: `
        <div class="cart-drop__item">
                  <img :src="img" :alt="cartItem.product_name" class="cart-drop__img">
                  <div class="cart-drop__info">
                       <p class="cart-drop__title">{{cartItem.product_name}}</p>
                       <div class="cart-drop__raiting">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star-half-o" aria-hidden="true"></i>
                       </div>
                       <p class="cart-drop__subtotal">{{cartItem.quantity}} <span class="cart-drop__span">x</span> $ {{cartItem.price}}</p>
                 </div>
                 <button class="cart-drop__delete" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
      </div>
    `
};