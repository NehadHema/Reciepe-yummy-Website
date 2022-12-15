"use strict"

/* Navbar Section Starts */

$('#menu').click(function(){
    $('#menu').css({'display':'none'});
    $('#close').css({'display':'block'});
    $('.nav').animate({left:'240px'},0);
    $('#navMenu').css({'display':'block'});
    $(".nav-menu .nav-item .item1").animate({opacity:"1",paddingTop:"25px"},1100);
    $(".nav-menu .nav-item .item2").animate({opacity:"1",paddingTop:"25px"},1200);
    $(".nav-menu .nav-item .item3").animate({opacity:"1",paddingTop:"25px"},1300);
    $(".nav-menu .nav-item .item4").animate({opacity:"1",paddingTop:"25px"},1400);
    $(".nav-menu .nav-item .item5").animate({opacity:"1",paddingTop:"25px"},1500);
    $(".nav-menu .nav-item .item6").animate({opacity:"1",paddingTop:"25px"},1600);
});

$('#close').click(function(){
    $('#navMenu').css({'display':'none'});
    $('#menu').css({'display':'block'});
    $('#close').css({'display':'none'});
    $('.nav').css({'left': '0px'});
    $(".nav-menu .nav-item .item1").animate({opacity:"0",paddingTop:"500px"},1100);
    $(".nav-menu .nav-item .item2").animate({opacity:"0",paddingTop:"500px"},1200);
    $(".nav-menu .nav-item .item3").animate({opacity:"0",paddingTop:"500px"},1300);
    $(".nav-menu .nav-item .item4").animate({opacity:"0",paddingTop:"500px"},1400);
    $(".nav-menu .nav-item .item5").animate({opacity:"0",paddingTop:"500px"},1500);
    $(".nav-menu .nav-item .item6").animate({opacity:"0",paddingTop:"500px"},1600);

});
/* Navbar Section Ends */


/* MainPage Section Starts */
let final;
let rowData = document.getElementById('rowData');
$(".loader").fadeIn(100);
async function getMeals() {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let finalResult = await apiResponse.json();
    final =finalResult.meals;
    displayMeal();
    $(".loader").fadeOut(100);
}
getMeals();


function displayMeal() {
    let bo = '';
    for (let i = 0; i < final.length; i++) {
        bo += `<div onclick="getMeal('${final[i].idMeal}')" class="col-lg-3 col-md-6 shadow p-0">
                  <img src="${final[i].strMealThumb}" class="rounded imgmedia" alt="">
                   <div class="layer d-flex align-items-center rounded">
                     <h2 class="ps-2">${final[i].strMeal}</h2>
                   </div>
                </div>`
    }
    rowData.innerHTML= bo;
}

async function getMeal(mealID) {
    $(".loader").fadeIn(100);
   let arrayletter = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    arrayletter = await arrayletter.json();
    console.log(arrayletter);

    displayMealDetails(arrayletter.meals[0]);
   $(".loader").fadeOut(100);

}


function displayMealDetails(meals) {
    var caton =''; 
 caton += `
       <div class="col-md-4 col-lg-6 text-white part-left">
            <img class="w-100" src="${meals.strMealThumb}" alt="">
            <h1>${meals.strMeal}</h1>
        </div>
        <div class="col-md-8 col-lg-6 text-white text-left part-right">
            <h2>Instructions</h2>
            <p>${meals.strInstructions}</p>
            <p class="fw-bolder">Area : ${meals.strArea}</p>
            <p class="fw-bolder">Category : ${meals.strCategory}</p>
            <h3>Recipes :</h3>
            <ul class="d-flex flex-wrap list-unstyled" id="recipes">

            </ul>

            <h3 class="my-2 mx-1 p-1">Tags :</h3>
            <ul class="d-flex flex-wrap list-unstyled" id="tags">

            </ul>

            <a class="btn btn-success text-white" target="_blank" href="${meals.strSource}">Source</a>
            <a class="btn youtube text-white bg-danger" target="_blank" href="${meals.strYoutube}">Youtub</a>
        </div>`;
        rowData.innerHTML = caton;

let recipes = ""

for (let i = 1; i <= 20; i++) {
  if (meals[`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}</li>`
  }
}
document.getElementById("recipes").innerHTML = recipes;

let tag = meals.strTags;
    if (tag != null) {
        tag = meals.strTags.split(',');
        var tagsStr = '';
        for (let i = 0; i < tag.length; i++) {
            tagsStr += `<li class="tags-style my-3 mx-1 p-1 rounded alert-danger rounded">${tag[i]}</li>`
        }
    }


document.getElementById("tags").innerHTML = tagsStr;
$("html, body").animate({scrollTop: 0}, 200);

}

/* MainPage Section Ends */
let categ;
let ima ;
async function filterByCategory(category) {
    $(".loader").fadeIn(100);
   let  x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    categ = await x.json();
    console.log(categ.meals);
    ima =categ.meals;
    displayMealCategory();
    $(".loader").fadeOut(100);
}


function displayMealCategory() {
    let bo = '';
    for (let i = 0; i < ima.length; i++) {
        bo += `<div class="col-lg-3 col-md-6 shadow p-0">
               <div onclick="getMeal('${ima[i].idMeal}')">
                  <img src="${ima[i].strMealThumb}" class="rounded imgmedia" alt="">
                   <div class="layer d-flex align-items-center rounded">
                     <h2 class="ps-2">${ima[i].strMeal}</h2>
                   </div>
                   </div>
                </div>`
    }
    rowData.innerHTML= bo;
}
let areaj;
async function filterByArea(area) {
    $(".loader").fadeIn(100);
    let areaMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    areaj = await areaMeal.json();
    console.log(areaj.meals);
    ima =areaj.meals;
    displayMealArea();
    $(".loader").fadeOut(100);

}
function displayMealArea() {
    let bo = '';
    for (let i = 0; i < ima.length; i++) {
        bo += `<div class="col-lg-3 col-md-6 shadow p-0">
        <div onclick="getMeal('${ima[i].idMeal}')">
           <img src="${ima[i].strMealThumb}" class="rounded imgmedia" alt="">
            <div class="layer d-flex align-items-center rounded">
              <h2 class="ps-2">${ima[i].strMeal}</h2>
            </div>
            </div>
         </div>`
    }
    rowData.innerHTML= bo;
}



let ingr;
async function filterByIngredients(mealInteg) {
    $(".loader").fadeIn(100);
    let integ = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealInteg}`);
    ingr = await integ.json();
    ima =ingr.meals;

   displayMealIngredient(integ.meals);
   $(".loader").fadeOut(100);

}

function displayMealIngredient() {
    let bo = '';
    for (let i = 0; i < ima.length; i++) {
        bo += `<div class="col-lg-3 col-md-6 shadow p-0">
        <div onclick="getMeal('${ima[i].idMeal}')">
           <img src="${ima[i].strMealThumb}" class="rounded imgmedia" alt="">
            <div class="layer d-flex align-items-center rounded">
              <h2 class="ps-2">${ima[i].strMeal}</h2>
            </div>
            </div>
         </div>`
    }
    rowData.innerHTML= bo;
}


/*  Search Section Starts*/

$(".nav-menu .nav-item a").click(async (e) => {
    let lists = e.target.getAttribute("data-list");

    $("html, body").animate({scrollTop: 0 }, 200);

    if (lists == "search") {
        $('.nav').css({'left': '0px'});
        $('#navMenu').css({'display':'none'});
        $('#menu').css({'display':'block'});
        $('#close').css({'display':'none'});

        rowData.innerHTML = `
            <div class="row searchform">
               <div class="col-md-6">
                <input id="searchName" class="form-control mb-5 text-center text-white" placeholder="Search By Name">
               </div>
               <div class="col-md-6">
                <input id="searchLetter" class="form-control text-center text-white" placeholder="Search By First Letter">
               </div>
            </div>`;


        $("#searchName").keyup((e) => {
            getSearchMeal(e.target.value);
        })
        $("#searchLetter").keyup((e) => {
            getByLetter(e.target.value);
        })

        $('#searchLetter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }

    let searchResult=[];
    async function getSearchMeal(mealname) {
        $(".loader").fadeIn(100);
        let searchResponse = await fetch(`https:/www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`);
        searchResult = await searchResponse.json();
        displayMeals(searchResult.meals);
        $(".loader").fadeOut(100);

        return searchResult;
    }

    var arrays =[];

        function displayMeals(arrays) {
    
            let meals = `<div class="row searchform">
            <div class="col-md-6">
             <input id="searchName" class="form-control mb-5 text-center text-white" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
             <input id="searchLetter" class="form-control text-center text-white" placeholder="Search By First Letter">
            </div>
         </div>`;
            for (let i = 0; i < arrays.length; i++) {
                meals += ` 
                <div class="col-lg-3 col-md-6 shadow p-3 mt-0">
                <div class="meal rounded position-relative overflow-hidden" onclick="getMeal('${arrays[i].idMeal}')">
                    <div class="post ">
                        <img src='${arrays[i].strMealThumb}' class="w-100 rounded"/ >
                        <div class="layer1 d-flex align-items-center rounded w-100">
                                <h2 class="ps-2">${arrays[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
                </div>
              `;
            }
            rowData.innerHTML = meals;
            $("html, body").animate({ scrollTop: 0}, 200);
        }



        async function getByLetter(letter) {
            $(".loader").fadeIn(100);
            if (letter) {
                let searchletter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
                searchletter = await searchletter.json()
                if (searchletter.meals) {
                    displayMeals(searchletter.meals)
                }
            }
            $(".loader").fadeOut(100);

        }
/*  Search Section Ends*/

/* category Section Starts*/
    
    if (lists == "categories") {
        $('.nav').css({'left': '0px'});
        $('#navMenu').css({'display':'none'});
        $('#menu').css({'display':'block'});
        $('#close').css({'display':'none'});
    
        getCategories(lists);
    }
    
    async function getCategories(list) {
        $(".loader").fadeIn(100);
        let link = await fetch(`https://www.themealdb.com/api/json/v1/1/${list}.php`);
        link = await link.json();
        arrays = link.categories.splice(0, 20);
        displayGategoryMeal();
        $(".loader").fadeOut(100);
        return link;
        }

    function displayGategoryMeal() {
        let fofo = "";
        for (var i = 0; i < arrays.length; i++) {
            fofo += `
        <div class="col-md-6 col-lg-3 my-3 shadow">
            <div class="meal shadow rounded position-relative">
                <div onclick="filterByCategory('${arrays[i].strCategory}')">
                    <img src='${arrays[i].strCategoryThumb}' class="w-100 rounded" />
                    <div class=" layer5 d-flex align-items-center w-100">
                        <div class="p-2">
                            <h2>${arrays[i].strCategory}</h2>
                            <p>${arrays[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        }
        rowData.innerHTML = fofo;
        $("html, body").animate({scrollTop: 0}, 200);
    }

/* category Section Ends*/

/* Area Section Starts*/

if (lists == "area") {
    $('.nav').css({'left': '0px'});
    $('#navMenu').css({'display':'none'});
    $('#menu').css({'display':'block'});
    $('#close').css({'display':'none'});

    getArea(lists);
}

async function getArea(list) {
    $(".loader").fadeIn(100);
    let link = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${list}`);
    link = await link.json();
    arrays = link.meals.splice(0,20);
    displayArea();
    $(".loader").fadeOut(100);
    return link;
    }

    async function displayArea() {
      let cartoon = '';
      for(let i=0; i< arrays.length ;i++){
          cartoon += `
          <div class="col-md-6 col-lg-3  ms-0">
        <div class="meal shadow rounded position-relative mealarea">
            <div onclick="filterByArea('${arrays[i].strArea}')">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${arrays[i].strArea}</h2>
            </div>
        </div>
    </div>
      `;
      }
      rowData.innerHTML = cartoon;
    $("html, body").animate({scrollTop: 0}, 100);
    }
   
   /* Area Section Ends*/


    /*ingredients Section Starts*/

if (lists == "ingredients") {
    $('.nav').css({'left': '0px'});
    $('#navMenu').css({'display':'none'});
    $('#menu').css({'display':'block'});
    $('#close').css({'display':'none'});

    getIngredients(lists);
}

async function getIngredients(list) {
    $(".loader").fadeIn(100);
    let integmeals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${list}`);
    integmeals = await integmeals.json();
    arrays = integmeals.meals.splice(0, 20);
    displayIngredients();
    $(".loader").fadeOut(100);
    return integmeals;
}

    async function displayIngredients() {
      let boxes = '';
      for(let i=0; i< arrays.length ;i++){
        boxes += `<div class="col-md-6 col-lg-3 my-3">
            <div class="meal position-relative mealinteg" onclick="filterByIngredients('${arrays[i].strIngredient}')">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h2 class="text-white">${arrays[i].strIngredient}</h2>
            <p class="text-white">${arrays[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
      </div>`;
      }
      rowData.innerHTML = boxes;
    $("html, body").animate({scrollTop: 0}, 100);
    }

     /*ingredients Section Ends*/
 

});

    
 /* Contact Section Starts*/



 $('#contact').click(() => {
    rowData.innerHTML='';
    $('.nav').css({'left': '0px'});
    $('#navMenu').css({'display':'none'});
    $('#menu').css({'display':'block'});
    $('#close').css({'display':'none'});
    $('.contact-inputs').addClass('d-block');
     let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPhone = document.getElementById('userPhone')
let userAge = document.getElementById('userAge')
let userPassword = document.getElementById('userPassword')
let userRePassword = document.getElementById('userRePassword')

function disabledbtn() {
// Validation for Name

    if (userNameValidation() == true) {
        $('#userName').addClass('is-valid')
        $('#userName').removeClass('is-invalid')
        $('.alertName').removeClass('d-block')
    } else if (userNameValidation() == false) {
        $('#userName').addClass('is-invalid')
        $('#userName').removeClass('is-valid')
        $('.alertName').addClass('d-block')
    }

// Validation for Email
    if (userEmailValidation() == true) {
        $('#userEmail').addClass('is-valid')
        $('#userEmail').removeClass('is-invalid')
        $('.alertEmail').removeClass('d-block')
    } else if (userEmailValidation() == false) {
        $('#userEmail').addClass('is-invalid')
        $('#userEmail').removeClass('is-valid')
        $('.alertEmail').addClass('d-block')
    }

// Validation for Phone
    if (userPhoneValidation() == true) {
        $('#userPhone').addClass('is-valid')
        $('#userPhone').removeClass('is-invalid')
        $('.alertPhone').removeClass('d-block')
    } else if (userPhoneValidation() == false) {
        $('#userPhone').addClass('is-invalid')
        $('#userPhone').removeClass('is-valid')
        $('.alertPhone').addClass('d-block')
    }

// Validation for Age
    if (userAgeValidation() == true) {
        $('#userAge').addClass('is-valid')
        $('#userAge').removeClass('is-invalid')
        $('.alertAge').removeClass('d-block')
    } else if (userAgeValidation() == false) {
        $('#userAge').addClass('is-invalid')
        $('#userAge').removeClass('is-valid')
        $('.alertAge').addClass('d-block')
    }

// Validation for Password
    if (userPasswordValidation() == true) {
        $('#userPassword').addClass('is-valid')
        $('#userPassword').removeClass('is-invalid')
        $('.alertPassword').removeClass('d-block')
    } else if (userPasswordValidation() == false) {
        $('#userPassword').addClass('is-invalid')
        $('#userPassword').removeClass('is-valid')
        $('.alertPassword').addClass('d-block')
    }

// Validation for RePassword
    if (userRePasswordValidation() == true) {
        $('#userRePassword').addClass('is-valid')
        $('#userRePassword').removeClass('is-invalid')
        $('.alertRePassword').removeClass('d-block')
    } else if (userRePasswordValidation() == false) {
        $('#userRePassword').addClass('is-invalid')
        $('#userRePassword').removeClass('is-valid')
        $('.alertRePassword').addClass('d-block')
    }


        if (userNameValidation() && userEmailValidation() && userPhoneValidation() && userAgeValidation() && userPasswordValidation() && userRePasswordValidation()) {
            $('.btn').removeAttr("disabled"); 

        } else {
            $('.btn').Attr('disabled','true');
        }

}


userName.addEventListener('keyup', disabledbtn)
function userNameValidation() {
return /^[a-z]{1,}$/ig.test($('#userName').val())
}

userEmail.addEventListener('keyup', disabledbtn)
function userEmailValidation() {
return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#userEmail').val())
}

userPhone.addEventListener('keyup', disabledbtn)
function userPhoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($('#userPhone').val())
}

userAge.addEventListener('keyup', disabledbtn)
function userAgeValidation() {
    return /^[1-9][0-9]?$|^100$/.test($('#userAge').val())
}

userPassword.addEventListener('keyup', disabledbtn)
function userPasswordValidation() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($('#userPassword').val())
}

userRePassword.addEventListener('keyup', disabledbtn)
function userRePasswordValidation() {
    return userPassword.value == userRePassword.value
}



});

$(".loader").fadeOut(500, () => {
    $("body").css("overflow", "visible")
});
