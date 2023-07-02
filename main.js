// get total
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let disscount = document.getElementById('disscount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let categeory = document.getElementById('categeory');
let create = document.getElementById('create');

let globalI ;


// total span
function getTotal() {
    if (price.value != '') {
        total.innerHTML =  +price.value + +taxes.value + +ads.value - +disscount.value
        total.style.background = '#040'
    }else{                             // to back to normal after delete the value
        total.innerHTML = '';
        total.style.background = '#c73a3a';
    }
}


// create product

// first save product's data after click on create

let allProducts = [];       // this array have all data       

// to save the previous data after refresh
if (localStorage.Product != null) {
    allProducts = JSON.parse(localStorage.Product)
}else{
    allProducts = [];
}

let mood = 'create';    //  generally mood = create

create.onclick = function(){
// create object have all data
    let productdata = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        disscount:disscount.value,
        total:total.innerHTML,
        count:count.value,
        categeory:categeory.value
    }

    if (title.value != '' && price.value != '' && categeory.value != '' && count.value < 10) {
        

        if (mood === 'create') {
            if (productdata.count > 1) {
                for (let i = 0; i < productdata.count; i++) {
                    allProducts.push(productdata)              // every turn add new product(because of loop)
                }
            }else{
                allProducts.push(productdata)
            }
        }else{
            allProducts[globalI] = productdata;                // if mood = update , i(in all products) will = productdata(the new value) 
            mood = 'create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearall()      // ONLY CLEAR DATA IF YOU CREATED A PRODUCT
    }



// now there is problem when create new productdata , the all old data will removed(cause you create new object with same features)
// so we need to put the object in the array (to add new object to one index in the array without remove the old objects)
    localStorage.setItem('Product' , JSON.stringify(allProducts))



// also run this functions after click
    showdata()
}

// clear inputs after create
function clearall() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    categeory.value = '';
    count.value = '';
    ads.value = '';
    disscount.value = '';
    total.innerHTML = '';
}

// show data 
function showdata() {
    let table = '';
// now you want to put the data which in the array in table(by loop)
    for (let i = 0 ; i < allProducts.length; i++){ 
        
        table +=  `       
        </tr>
            <td>${i+1}</td>
            <td>${allProducts[i].title}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].disscount}</td>
            <td>${allProducts[i].total}</td>
            <td>${allProducts[i].categeory}</td>
            <td><button onclick = "update(${i})" id="update">Update</button></td>
            <td><button onclick = "deleteone(${i})" id="delete">Delete</button></td>
        </tr>            
        `
    } 
    document.getElementById('tbody').innerHTML = table;

    // هنحط الشرط هنا عشان الشرط علي الفانكشن دي
    let deleteall = document.getElementById('deleteall');
    if (allProducts.length > 0 ) {
        deleteall.innerHTML = `<button onclick="deleteAll()">Delete All (${allProducts.length}) </button>`
    }else{
        deleteall.innerHTML = '';
    }


    getTotal()    
}
showdata() 
// to keep the html without refrsh

// delete one product
function deleteone(i) {                                      // run when click on delete
    allProducts.splice(i,1);                                 // this removes the item from the array
    localStorage.Product = JSON.stringify(allProducts);      // renew the data after delete
    showdata()                                               // to renew the the html data without refresh
} // the data is in 2 places (localStorage&allProducts) so we de


// Delete all products
function deleteAll() {
    localStorage.clear()
    allProducts.splice(0)  // = delet eall
    showdata()
}

// update
function update(i) {

    mood = 'update';               // when click on update mood will be update
    globalI = i;                       // when click on update you will get i to update it

    title.value = allProducts[i].title
    price.value = allProducts[i].price
    taxes.value = allProducts[i].taxes
    ads.value = allProducts[i].ads
    disscount.value = allProducts[i].disscount
    total.innerHTML = allProducts[i].total
    categeory.value = allProducts[i].categeory

    count.style.display = 'none';      // we dont need to update 
    create.innerHTML = 'Update';
    
    scroll( {
        top: 0,
        behavior: 'smooth',
    })



    getTotal()  // to update it automatically after update
}


// search
let searchmood = 'title';      // the default is search by title
function getsearchmood(id) {

    let search = document.getElementById('search')
    search.focus()   // first focus atter click 


    if (id == 'searchTitle') {
        searchmood = 'title'
        search.placeholder = 'Search By Title';
    }else {
        searchmood = 'category'
        search.placeholder = 'Search By Category';
    }
    search.value = '';    // empty the input after click
    showdata()            // to reshow the data after click
}
function searchdata(value) {
    let table = '';
    if (searchmood == 'title') {
        
        for (let i = 0; i < allProducts.length; i++) {
            
            if (allProducts[i].title.toLowerCase().includes(value.toLowerCase())) {

                table +=  `       
                    </tr>
                        <td>${i}</td>
                        <td>${allProducts[i].title}</td>
                        <td>${allProducts[i].price}</td>
                        <td>${allProducts[i].taxes}</td>
                        <td>${allProducts[i].ads}</td>
                        <td>${allProducts[i].disscount}</td>
                        <td>${allProducts[i].total}</td>
                        <td>${allProducts[i].categeory}</td>
                        <td><button onclick = "update(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteone(${i})" id="delete">Delete</button></td>
                    </tr>            
                    `                
            }
        }
    }else{

        for (let i = 0; i < allProducts.length; i++) {
            
            if (allProducts[i].categeory.toLowerCase().includes(value.toLowerCase())) {

                table +=  `       
                    </tr>
                        <td>${i}</td>
                        <td>${allProducts[i].title}</td>
                        <td>${allProducts[i].price}</td>
                        <td>${allProducts[i].taxes}</td>
                        <td>${allProducts[i].ads}</td>
                        <td>${allProducts[i].disscount}</td>
                        <td>${allProducts[i].total}</td>
                        <td>${allProducts[i].categeory}</td>
                        <td><button onclick = "update(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteone(${i})" id="delete">Delete</button></td>
                    </tr>            
                    `                
            }
        } 

    }
    document.getElementById('tbody').innerHTML = table;
}

// clean data 



