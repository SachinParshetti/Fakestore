import React from "react"
import { useContext, useEffect, useState } from "react"
import "../Fakestore/Fakestore.css"
import axios from "axios"
import { createContext } from "react"
let searchedCategory = createContext(null)
let selectedCategory = createContext(null)
export function Fakestore() {
    const [category, setCategory] = useState([]);
    const [searchString, setSearchstring] = useState('');
    const [contextvalue, setContextvalue] = useState("");
    const [selected, setSelected] = useState("-1");
    const [cartCount,setCartCount] = useState(0);
    const [wishlistCount,setWishlistCount] = useState(0);
    const [cartItems,setCartItems] = useState([]);
    const [wishlistItem,setWishlistitem] = useState([]);
    
    function LoadCategories() {
        axios.get("https://fakestoreapi.com/products/categories")
            .then(response => setCategory(response.data))

    }
    function handleSearchChange(e) {
        let string = e.target.value;
        setSearchstring(string);
        setContextvalue(string); 
        
    }
    function handleSearchClick() {
        setSelected("-1")
        setContextvalue(searchString)
       
    }

    function handleCategorySelect(e) {
        let value = e.target.value;
        setSearchstring('')
        setContextvalue('')
        setSelected(value);
      
    }


    function handleAddClick(product)
    {
       setCartItems(prevItem =>
       
       {
        let updated =  [...prevItem,product]
        alert(product.title + '\n' + " Added to the cart")
        setCartCount(updated.length)
       return updated
       })

    }

    function handleDeleteClick(item)
    {
       let conform = confirm("Are you sure you want to remove \n" + item.title + "\nfrom cart")
       {
          if(conform)
          {
             let updated = [...cartItems]
        let index = cartItems.findIndex(cardItem => cardItem.id === item.id);
        if(index !== -1)
          {  updated.splice(index,1)}
         
        setCartItems(updated)
        setCartCount(updated.length)
          }
       }
    }

    function handleAddWishlist(product)
    {
       setWishlistitem(prevProduct =>{
         let updated = [...prevProduct,product]
         alert(product.title + "\nIs added to Wishlist")
         setWishlistCount(updated.length)
         return updated
       })
    }

    function handleWishlistDeleteClick(item)
    {
        let conform = confirm("Are you sure you want to remove \n" + item.title + " \nfom wishlist")
        if(conform)
        {
            let updated = [...wishlistItem];
            let index = updated.findIndex(listItem => listItem.id === item.id)
            if(index !== -1)
            {
                updated.splice(index,1)
            }
             setWishlistitem(updated)
             setWishlistCount(updated.length)
            
            return
        }
    }

    useEffect(() => {
        LoadCategories()

    }, [])

    let total = 0

    return (
        <>
            <searchedCategory.Provider value={contextvalue}>
                <selectedCategory.Provider value={selected}>
                    <div className="row p-2 align-items-center header-container m-0">

                        <div className="col-12 col-md-4 col-lg-3 mb-2 mb-md-0">
                            <div className="fs-1 text-center text-md-start text-warning fw-medium ">
                                FakeStore.
                            </div>
                        </div>

                 
                        <div className="col-12 col-md-5 col-lg-6 mb-2 mb-md-0  ">
                            <div className="input-group w-100">
                                <select className="bg-warning border-0" onChange={handleCategorySelect} value={selected}>
                                    <option value="-1">Category</option>
                                    {
                                        category.map((item, i) => <option key={i} value={item}>{item}</option>)
                                    }
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Category"
                                    onChange={handleSearchChange}
                                    value={searchString}
                                />
                                <button className="btn btn-warning bi bi-search" onClick={handleSearchClick}></button>

                            </div>
                        </div>

                       
                        <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end">
                            <button className="btn btn-outline-primary bi bi-bag-heart mx-2 position-relative" data-bs-target='#wishlist-offcanvas' data-bs-toggle='offcanvas'>
                               <span className="badge bg-danger text-white rounded rounded-circle position-absolute" style={{top:"-10px"}}>
                                    {wishlistCount}
                               </span>
                            </button>
                            <button className="btn btn-outline-warning bi bi-cart3 mx-2 position-relative" data-bs-target='#cart-offcanvas' data-bs-toggle='offcanvas'>
                                  <span className="badge bg-danger text-white rounded rounded-circle position-absolute " style={{top:"-10px"}}>
                                     {cartCount}
                               </span>
                            </button>
                        </div>
                    </div>


             
                    <div className="offcanvas offcanvas-end custom-width" id="cart-offcanvas" >
                        <div className="offcanvas-header text-center d-flex justify-content-center align-items-center ">
                            <div className="offcanvas-title w-100">
                                <h2 className="text-center text-white ">Cart Items</h2>
                            </div>
                            <button className="btn-close  btn-close-white" data-bs-dismiss='offcanvas'></button>
                        </div>
                        <div className="offcanvas-body ">
                            <table className="table table-hover ta">
                                <thead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                   
                                </thead>
                                <tbody>
                                         {
                                            cartItems.map((item,index)=>{
                                                return(
                                                    
                                                <tr key={index} className="p-2">
                                                     <td><img src={item.image} alt={item.title} width="60px" height="60px" className="rounded rounded-circle border border-3" /></td>
                                                    <td>{item.title}</td>
                                                    <td>{item.price.toLocaleString('en-US',{style:'currency',currency:"USD"})}</td>
                                                    <td><button className="btn btn-danger bi bi-trash" onClick={() => handleDeleteClick(item)}></button></td>
                                                </tr>
                                               
                                            )
                                            })
                                           

                                        }
                                        
                                </tbody>
                                <tfoot >
                                   <tr>
                                     <td colSpan="1"> <strong>Total:</strong> </td>
                                    <td colSpan="3" className="text-end me-3"> 
                                         {
                                           total = cartItems.reduce((acc,item)=> acc + parseFloat(item.price),0).toLocaleString('en-US',{style:'currency',currency:"USD"})
                                         }  
                                    </td>
                                   </tr>
                                </tfoot>
                            </table>

                          
                        </div>
                        <div className="offcanvas-footer text-center p-4">
                            <button className="btn btn-light w-75 mb-2">Place Order</button>
                        </div>
                    </div>

                    
                    <div className="offcanvas offcanvas-end custom-width" id="wishlist-offcanvas" >
                        <div className="offcanvas-header text-center d-flex justify-content-center align-items-center ">
                            <div className="offcanvas-title w-100">
                                <h2 className="text-center text-white">Your Wishlist</h2>
                            </div>
                            <button className="btn-close  btn-close-white text-warning " data-bs-dismiss='offcanvas'></button>
                        </div>
                        <div className="offcanvas-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                       
                                        <th>Picture</th>
                                         <th>Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                        {
                                            wishlistItem.map((item,index)=>{
                                                return(
                                                    <tr key={index} className="p-2">
                                                     <td><img src={item.image} alt={item.title} width="60px" height="60px" className="rounded rounded-circle border border-3" /></td>
                                                    <td>{item.title}</td>
                                                    <td>{item.price.toLocaleString('en-US',{style:'currency',currency:"USD"})}</td>
                                                    <td><button className="btn btn-danger bi bi-trash" onClick={() => handleWishlistDeleteClick(item)}></button></td>
                                                  </tr>

                                                )
                                            })
                                        }
                                </tbody>
                            </table>
                        </div>
                        <div className="offcanvas-footer text-center p-4">
                            <button className="btn btn-light w-75 mb-2">Place Order</button>
                        </div>
                    </div>

                    <FakestoreMain  AddToCart={handleAddClick} AddToWishlist={handleAddWishlist} />

                </selectedCategory.Provider>
            </searchedCategory.Provider>
            <FakestoreFooter/>
        </>
    )
}



export function FakestoreMain({AddToCart , AddToWishlist}) {
    let searched = useContext(searchedCategory);
    let selected = useContext(selectedCategory);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchAllProducts() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (error) {
                alert("Loading failed due to : " + error);
            }
        }
        fetchAllProducts();
    }, []);

    let filteredProducts = products;
    if (selected !== "-1") {
        filteredProducts = filteredProducts.filter(
            product => product.category === selected
        );
    }
    if (searched.trim() !== "") {
        filteredProducts = filteredProducts.filter(
            product => product.title.toLowerCase().includes(searched.trim().toLowerCase())
        );
    }

    return (
        <>

            <main>
                <div className="d-flex justify-content-center align-items-center flex-wrap border mt-5">
                    {
                        filteredProducts.map((product) => {
                            return (

                                <div className="card m-4" key={product.id}>
                                    <div className="card-header border-0">
                                        {
                                            <img src={product.image} alt={product.title} width="100%" height="200px" />
                                        }
                                    </div>
                                    <div className="card-body">
                                        <div className="card-title overflow-auto" style={{ height: "50px" }}>
                                            <strong className="text-muted">Title:</strong> {product.title}
                                        </div>
                                        <div>
                                            <p> <strong className="text-muted">Price:</strong> {product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })} </p>
                                            <p><strong className="text-muted">Rating:</strong> {product.rating.rate} {"⭐".repeat(Math.round(product.rating.rate))} </p>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-center">
                                        <button className="btn btn-warning mx-2 w-50" onClick={() => AddToCart(product)}>Add to cart</button>
                                        <button className="btn btn-primary  w-50" onClick={()=> AddToWishlist(product)}>Wishlist</button>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
            </main>
         

        </>
    )
}

export function FakestoreFooter()
{
    return(
        <>
    <footer className="bg-dark text-white py-5">
    <div className="container">
      <div className="row">
        {/* <!-- Company Info --> */}
        <div className="col-md-3 mb-4">
          <h5 className="fw-bold mb-3">FakeStore</h5>
          <p className="">Your one-stop shop for all things awesome. Discover quality products at unbeatable prices.</p>
        </div>

        {/* <!-- Quick Links --> */}
        <div className="col-md-3 mb-4">
          <h5 className="fw-bold mb-3">Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/home" className=" text-decoration-none">Home</a></li>
            <li><a href="/products" className="text-decoration-none">Products</a></li>
            <li><a href="#" className=" text-decoration-none">About Us</a></li>
            <li><a href="#" className="text-decoration-none">Contact</a></li>
          </ul>
        </div>

        {/* <!-- Contact Info --> */}
        <div className="col-md-3 mb-4">
          <h5 className="fw-bold mb-3">Contact Us</h5>
          <p className="">Email: support@fakestore.com</p>
          <p className="">Phone: +91 701939002</p>
          <p className="">Address: 123  Ameerpet, Hyderabad, India</p>
        </div>

        {/* <!-- Social Media --> */}
        <div className="col-md-3 mb-4">
          <h5 className="fw-bold mb-3">Follow Us</h5>
          <div className="d-flex gap-3">
            <a href="#" className="">
              <i className="bi bi-facebook text-warning fs-4"></i>
            </a>
            <a href="#" className="">
             <i className="bi bi-instagram text-warning fs-4"></i>
            </a>
            <a href="#" className="">
             <i className="bi bi-twitter-x text-warning fs-4"></i>
            </a>
             <a href="#" className="">
             <i className="bi bi-skype text-warning fs-4"></i>
            </a>

          </div>
        </div>
      </div>

      {/* <!-- Copyright --> */}
      <div className="mt-4 border-top border-secondary  pt-3 text-center">
        <p className="">© 2025 FakeStore. All rights reserved.</p>
      </div>
    </div>
  </footer>
        </>
    )
}