class ProductManagement {
    #products
    #id = 0

    constructor(){
        this.#products = []
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && code !== undefined && stock !== undefined) {
            const product = {
                id: this.#id + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            const productExists = this.#products.find(product => product.code === code)

            if(!productExists) {
                this.#id = this.#id + 1
                this.#products.push(product)
            }
        }
    }

    getProductById = (id) => {
        const prod = this.#products.find(product => product.id === id)

        return prod ?? "Não encontrado\n"
    }    
}

const prodmang = new ProductManagement()
prodmang.addProduct("mesa", "mesa grande de madeira", 200.0, "/archives/thumbnail", 234, 9) //id = 1
prodmang.addProduct("cadeira", "cadeira de madeira", 130.0, "/archives/thumbnail2", 235, 7) //id = 2
prodmang.addProduct("cadeira", "cadeira de madeira", 130.0, "/archives/thumbnail2", 235, 7) //produto já registrado, não será adicionado

prodmang.addProduct("livro", "livro clássico", 30.0, 236, 3) //thumbnail faltando, não será adicionado

console.log(prodmang.getProductById(2))
console.log()
console.log(prodmang.getProductById(3))