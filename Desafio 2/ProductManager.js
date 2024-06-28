const fs = require("fs");

class ProductManagement {
    //#products
    #path
    #id = 0

    constructor(){
        //this.#products = []
        this.#path = "./products.json"
    }

    #readFile = async () => {
        let result = await fs.promises.readFile(this.#path, "utf-8")
        const parsedResult = await JSON.parse(result)
        return parsedResult
    };

    #writeFile = async (data) => {
        const dataToSave = await JSON.stringify(data)
        await fs.promises.writeFile(this.#path, dataToSave)
    };

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        //if (title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && code !== undefined && stock !== undefined) {
        const parsedResult = await this.#readFile()

        const product = {
            id: this.#id + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        parsedResult.push(product)

        await this.#writeFile(parsedResult)

        this.#id = this.#id + 1
    }

    getProducts = async () => {
        const parsedResult = await this.#readFile()
        return parsedResult
    }

    getProductById = async (id) => {
        const results = await this.#readFile()
        const product = results.find(product => product.id === id)
        return product ?? "Não encontrado\n"
    }

    updateProduct = async (id, type, object) => {
        const results = await this.#readFile()
        const product = results.find(product => product.id === id)
        let index = results.indexOf(product);

        if (index !== -1) {
            switch(type) {
                case "object":
                    results[index] = object
                    break
                case "title":
                    results[index].title = object
                    break
                case "description":
                    results[index].description = object
                    break
                case "price":
                    results[index].price = object
                    break
                case "thumbnail":
                    results[index].thumbnail = object
                    break
                case "code":
                    results[index].code = object
                    break
                case "stock":
                    results[index].stock = object
                    break
                default:
                    console.log("Tipo inválido")
                    return 
            }
            await this.#writeFile(results)
            console.log("Atualizado")
            return
        } else {
            console.log("id inválido")
            return 
        }
        
    }

    deleteProduct = async (id) => {
        const results = await this.#readFile()
        const product = results.find(product => product.id === id)
        let index = results.indexOf(product)
        if (index !== -1) {
            results.splice(index, 1)

            await this.#writeFile(results)

            console.log("Atualizado")
            return
        } else {
            console.log("id inválido")
            return 
        }
    }
}

const main = async () => {
    const prodmang = new ProductManagement()
    
    //Adicionando produtos
    await prodmang.addProduct("mesa", "mesa grande de madeira", 200.0, "/archives/thumbnail", 234, 9) //id = 1
    await prodmang.addProduct("cadeira", "cadeira de madeira", 130.0, "/archives/thumbnail2", 235, 7) //id = 2

    //Visualizando todos os produtos
    let products = await prodmang.getProducts()
    console.log(products)

    //Visualizando produto por id
    const productById = await prodmang.getProductById(2)
    console.log(productById)

    //Atualizando produtos
    await prodmang.updateProduct(1, "title", "armário")
    await prodmang.updateProduct(1, "tittle", "armário") //tipo inválido
    await prodmang.updateProduct(4, "title", "armário") //id invalido
    products = await prodmang.getProducts()
    console.log(products)

    //Deletando produtos
    await prodmang.deleteProduct(2)
    products = await prodmang.getProducts()
    console.log(products)
}

main()