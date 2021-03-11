export const Search = {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="">
                <input type="search" class="search__input" placeholder="Search for item..." v-model.lazy="userSearch">
                <button class="search__btn" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>
   `
};