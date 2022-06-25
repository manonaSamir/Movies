$(document).ready(function () {

  $("#loading").hide(2000, function () {
    $("body, html").animate({ scrollTop: 0 }, 1000)

  });

  let navWidth = $(".navMenu").outerWidth(true);
  $("#LeftbarSec").css("left", `-${navWidth}px`);

  $("#toggleNav").click(function () {
    $(".fa-align-justify").toggleClass("fa-times");

    if ($("#LeftbarSec").css("left") == "0px") {
      $("#LeftbarSec").animate({ left: `-${navWidth}px` }, 500);
      $(".navMenu li").animate({ opacity: "0", marginTop: "500px" });
    }
    else {
      $("#LeftbarSec").animate({ left: `0px` }, 500);
      $(".navMenu .item1").animate({ opacity: "1", marginTop: "8px" }, 1200);
      $(".navMenu .item2").animate({ opacity: "1", marginTop: "8px" }, 1300);
      $(".navMenu .item3").animate({ opacity: "1", marginTop: "8px" }, 1400);
      $(".navMenu .item4").animate({ opacity: "1", marginTop: "8px" }, 1500);
      $(".navMenu .item5").animate({ opacity: "1", marginTop: "8px" }, 1600);
      $(".navMenu .item6").animate({ opacity: "1", marginTop: "8px" }, 1700);
    }
  })



  var windowScroll = $(window).scrollTop()
  if (windowScroll > 100) {
    $('#btnUp').show(1000)
  } else {
    $('#btnUp').hide(1000)
  }
})


$('#btnUp').click(function () {
  $('body , html').animate(
    {
      scrollTop: '0',
    },
    3000,
  )
})




///////***************** sidebar*************  */


var allData = [];
var httpReq = new XMLHttpRequest();
let pathMovie = "now_playing";

$(".navList .short").click(function () {
  pathMovie = $(this).attr('id');
  NowMovie(pathMovie);
})

NowMovie(pathMovie);




async function NowMovie(URL) {
  const myResponse = await fetch("https://api.themoviedb.org/3/movie/" + URL + "?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
  let responseData = await myResponse.json();
  allData = responseData.results;
  displayData();
}


async function getData(URL) {

  // const myResponse = await fetch("https://api.themoviedb.org/3/movie/" + URL + "?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
  const myResponse = await fetch("https://api.themoviedb.org/3/search/movie?query=" + URL + "&api_key=eba8b9a7199efdcb0ca1f96879b83c44")
  let responseData = await myResponse.json();
  allData = responseData.results;
  displayData();
}


function displayData() {
  var temp = ``;
  for (var i = 0; i < allData.length; i++) {   
    temp += `
        <div class="col-md-6 col-lg-4 my-3">
          <div class="movieShow">
            <div class="movieDiv">
                <img src="https://image.tmdb.org/t/p/w500`+ allData[i].poster_path + `" class="img-fluid"/>
                <div class="movieLayer d-flex align-items-center">
                    <div class="movieInfo">
                        <h5>`+ allData[i].original_title + `</h5>
                        <p>`+ allData[i].overview + `</p>
                        <p> Rate: `+ allData[i].vote_average + `</p>
                        <button class="btn btn-light movie" onclick="getmovie(`+ allData[i].id + `)">trial</button>
                    </div>
                </div>
             </div>
          </div>
        </div>`;
  }

  document.getElementById("result").innerHTML = temp;
}

function searchMovie(term) {
  var temp = ``;
  for (var i = 0; i < allData.length; i++) {

    if (allData[i].original_title.toLowerCase().includes(term.toLowerCase())) {
      temp += `
      <div class="col-md-6 col-lg-4 my-3">
        <div class="movieShow">
          <div class="movieDiv">
              <img src="https://image.tmdb.org/t/p/w500`+ allData[i].poster_path + `" class="img-fluid"/>
              <div class="movieLayer d-flex align-items-center">
                  <div class="movieInfo">
                      <h5>`+ allData[i].original_title + `</h5>
                      <p>`+ allData[i].overview + `</p>
                      <p> Rate: `+ allData[i].vote_average + `</p>
                      <button class="btn btn-light movie" type="button" onclick="getmovie(`+ allData[i].id + `)">trial</button>
                  </div>
              </div>
           </div>
        </div>
      </div>`;
    }
  }
  document.getElementById("result").innerHTML = temp;
}


$("#word").keyup(function () {
  let searchVal = $(this).val();
  searchMovie(searchVal);

});

$("#allMovies").keyup(function () {
  let searchedVal = $(this).val();
  getData(searchedVal);

});

//validation

jQuery.validator.addMethod("lettersonly", function (value, element) {
  return this.optional(element) || /^[a-z\s]+$/i.test(value);
});

$.validator.addMethod('Phone', function (value, element) {
  return value.match(/^\+(?:[0-9] ?){6,14}[0-9]$/);
});

$.validator.addMethod('password', function (value, element) {
  return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
  // return value.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
});

$('#contact').validate({
  rules: {
    "name": {
      required: true, lettersonly: true,
    },
    "email": {
      required: true, email: true,
    },
    "phone": {
      required: true, Phone: true,
    },
    "age": {
      required: true, number: true,
    },
    "password": {
      required: true, password: true, minlength: 8,
    },
    "rePassword": {
      required: true,
      equalTo: "#password"
    }
  },
  messages: {
    "name": {
      required: "Your Name is not valid", lettersonly: "Only alphabetical characters"
    },
    "email": "entre valid email",
    "phone": "entre valid phone",
    "age": "entre valid age",
    "password": "entre valid password *Minimum eight characters, at least one letter and one number:*",
    "rePassword": "entre valid Repassword",
  },

  errorElement: 'span',
  errorPlacement: function (error, element) {
    let name = error.attr("id");
    $(error).attr('id', `${name}`);
    $(error).addClass('alert');
    $(error).addClass('alert-danger');
    $(error).addClass('d-block');
    element.closest('.form-group').append(error);
  },
  highlight: function (element, errorClass, validClass) {

  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass('alert-danger');
    $(element).siblings('span').removeClass('d-block');
  }
});


$('#subBtn').click(function (e) {
  var form = $('#contact');
  form.validate().settings.ignore = ":hidden,:not(:visible)";
  e.preventDefault();
  if (form.valid()) {
    form.submit();
  } else {
    return false;
  }
});




async function getmovie(id) {
  console.log(id);
  const myResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`)
  let responsemovie = await myResponse.json();

$("#cartoonVideo").attr("src", "https://www.youtube.com/embed/"+responsemovie.results[responsemovie.results.length-1].key);


  $('#Trial').modal('show');


}


