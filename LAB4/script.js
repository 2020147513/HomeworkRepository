let products=[]
let showingProductIndex=[]
let showingNum=10
let nowCategory='ALL'
let nowSearch=''

function integratedSearch(){
    showingProductIndex=[]
    products.map((product,index)=>{
        if(
            (nowCategory==='ALL' || product.category===nowCategory)
            &&
            (nowSearch==='' || product.name.indexOf(nowSearch)!=-1)
        ){
            showingProductIndex.push(index)
        }
    })
    updateShowing()
}

function categoryChange(){
    nowCategory=document.getElementById('category').value
    document.getElementById('categoryBold').innerText=nowCategory
    integratedSearch()
}

function searchClick(){
    nowSearch=document.getElementById('searchText').value
    document.getElementById('searchBold').innerText=(nowSearch===''?'(입력하지 않음)':nowSearch)
    integratedSearch()
}

function productClick(product){
    if(product.classList.contains('product-selected')){
        product.classList.remove('product-selected')
    } else{
        product.classList.add('product-selected')
    }
}

function updateShowing(){
    document.getElementById('products').innerHTML=''
    showingNum=10
    showingProductIndex.slice(0,10).map((idx)=>{
        document.getElementById('products').innerHTML+=`
        <div class="product" onclick="productClick(this)">
            <div class="product-title"><h1>${products[idx].name}</h1></div>
            <div class="product-content">
                <div class="product-img">
                    <img src="${products[idx].img}" alt="product img">
                </div>
                <div class="product-price"><h2>가격: ${products[idx].price}</h2></div>
            </div>
        </div>
        `
    })
}

function showMore(){
    if(products.length+100<showingNum) return
    showingProductIndex.slice(showingNum,showingNum+10).map((idx)=>{
        document.getElementById('products').innerHTML+=`
        <div class="product" onclick="productClick(this)">
            <div class="product-title"><h1>${products[idx].name}</h1></div>
            <div class="product-content">
                <div class="product-img">
                    <img src="${products[idx].img}" alt="product img">
                </div>
                <div class="product-price"><h2>가격: ${products[idx].price}</h2></div>
            </div>
        </div>
        `
    })
    showingNum+=10
}


window.addEventListener('DOMContentLoaded',()=>{
    fetch('./product.json').then((res)=>res.json()).then((productJson)=>{
        products=productJson.products
        for(let i=0;i<products.length;i++){
            showingProductIndex.push(i)
        }
        updateShowing()
        window.onscroll = () => {
            if ((window.innerHeight+window.scrollY)>=document.body.offsetHeight){
                showMore()
            }
        }
    })
})