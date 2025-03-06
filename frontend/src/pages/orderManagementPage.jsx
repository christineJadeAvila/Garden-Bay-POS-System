import { useState, useEffect } from "react"
import api from "../api"
import Product_Category from "../components/Category"
import Product from "../components/Products"
import NavBar from "../components/NavBar"
import CustomerOrder from "../components/CustomerOrder"



import "../styles/OrderMS.css"

function OrderManagementPage() {

    const [categories, setCategory ] = useState([])
    const [products, setProducts ] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [searchQuery, setSearchQuery] = useState("")


    useEffect(() => {
        getCategory()
    }, [])

    useEffect(() => {
        getProducts()
    }, [])



    const getCategory = () => {
        api

            .get("api/product-category/")
            .then((res) => res.data)
            .then((data) => {
                setCategory(data)
                console.log(data)
            })
            .catch((err) => alert(err))
    }

    const getProducts = () => {
        api

            .get("api/products/")
            .then((res) => res.data)
            .then((data) => {
                setProducts(data)
                console.log(data)
            })
            .catch((err) => alert(err))
    }
    
    // Show all products if "All Menu" is selected, otherwise filter by category, and for search.
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "all" || product.category_ID === selectedCategory;
        const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });


    return <>
        <div className="div--container">
            <section className="categories-and-products">

                <NavBar/>                

                {/* DISPLAY CATEGORIES */}
                <div className="getCategories">

                    {/* DISPLAY ALL MENU */}
                    <div 
                        onClick={() => setSelectedCategory("all")} 
                        className={`category--card--container ${selectedCategory === "all" ? "selected" : ""}`}
                    >
                        All Menu
                    </div>
                    
                    {/* CATEGORY NAVIGATION BARS */}
                    {categories.map((category) => (
                        <Product_Category 
                            category={category} 
                            key={category.category_ID} 
                            onSelect={setSelectedCategory}
                            isSelected={category.category_ID === selectedCategory}
                        />
                    ))}
                    
                </div>

                {/* SEARCH PRODUCTS */}
                <input 
                    type="search" 
                    className="search--bar" 
                    placeholder="Search something..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
        
                {/* DISPLAY PRODUCTS based on category ID */}
                <div className="getProducts">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Product product={product} key={product.product_ID} />
                        ))
                    ) : (
                        <div className="getProducts">
                            {products.map((product) => (
                                <Product product={product} key={product.id} />
                            ))}
                        </div>
                    )}
                   
                </div>
                    
            </section>

            <section className="customer--order">
                <CustomerOrder/>
            </section>

            
        </div>
    </>
}

export default OrderManagementPage