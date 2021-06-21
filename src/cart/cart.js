export const shoppingCart = {
    cart: [],

    get fullCart() {
        const cookieStr = document.cookie.split(';')
            .filter(string => string.includes('cart'));
        if (cookieStr.length !== 0) { 
            const cookieCart = cookieStr[0].substring(5);
            this.cart = JSON.parse(cookieCart);
        }
        return this.cart;
    },

    set fullCart(item) {
        this.cart = this.fullCart;
        const { name, from, to } = item;
        const index = this.cart.findIndex(object => {
            const { name: oldName, from: oldFrom, to: oldTo } = object;
            if (name === oldName && from === oldFrom && to === oldTo) {
                return object;
            }
        });
        if (index > -1) {
            const { quantity: oldQuantity } = this.cart[index];
            this.cart[index] = { ...item, quantity: +oldQuantity + 1 };
        } else {
            item.quantity = 1;
            this.cart.push(item);
        }
        const str = JSON.stringify(this.cart);
        document.cookie = `cart=${str}`;
    },

    deleteItem(item) {
        const { name, from, to } = item;
        const index = this.cart.findIndex(object => {
            if (name === object.name && from === object.from && to === object.to) {
                return object;
            }
        });
        
        if (index > -1) {
            this.cart.splice(index, 1);
            const str = JSON.stringify(this.cart);
            document.cookie = `cart=${str}`;
        }
    },

    modifyItem(oldItem, newItem) {
        const { name, from, to } = oldItem;
        const index = this.cart.findIndex(object => {
            if (name === object.name && from === object.from && to === object.to) {
                return object;
            }
        });
        
        if (index > -1) {
            this.cart[index] = { ...newItem };
            const str = JSON.stringify(this.cart);
            document.cookie = `cart=${str}`;
        }
    }
};
