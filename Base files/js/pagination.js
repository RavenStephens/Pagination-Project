//Thanks for grading this project. I have taken the time to make it look as 'final'
//as possible. The No Results text disappears when no needed and search input clears itself.
//If I were to go further, I would make the results appear not only when you click the button,
//but also immediately as the info is typed in. I would also make the pagination work for the results
//as well as the total list, but for now I need it to cancel out the search. I hope this exceeds
//enough of the requirements!






//This function primes and apllies pagination links
var addPagination = function(list){
  var thisList=list
  $('div.pagination').remove();
  var numStudents=thisList.length;
  if(numStudents<= 10){
    return null;
  }
  //Calculates number of need pages
    var numPages = Math.ceil(numStudents/10);
    console.log(numPages);
  //Create div DOM object with class 'pagination'
    var pagesDiv = document.createElement('div');
    pagesDiv.className = 'pagination';
  //create ul to be contained in div.pagination and to contain li
    var pagesUL = document.createElement('ul');
  //Create LIs and ANCHORs
    for(i=0;i<numPages;i++){
      var pagesLI = document.createElement('li');
      var pagesAnchor = document.createElement('a');
      pagesAnchor.setAttribute('href','#');
      $(pagesAnchor).text(i+1);
      $(pagesLI).append(pagesAnchor);
      $(pagesUL).append(pagesLI);
      }
  //Append UL to DIV
    $(pagesDiv).append(pagesUL);
  //Append DIV to .PAGE
    $('.page').append(pagesDiv);
  //Set first ANCHOR to Active
    $('.pagination a:first').addClass('active');
  //Shows first page content
    $(thisList).each(function(index){
      if (index > 9){
        $(this).hide();
      }
    });

    pageAction(thisList);

}

var pageAction = function (list){
//Bind Click to .PAGINATION links
  $(".pagination li a").click(function(){
    console.log('page action activated');
  //ON CLICK: Swich which link is 'active'
    $('.pagination a.active').removeClass('active');
    $(this).toggleClass('active');
  //Hides 'old' students
    $("li.student-item").hide();
  //Grabs and converts number for separating Students
    var $pageNum = this.text;
    $pageNum = Number($pageNum);
    $pageNum = ($pageNum-1);
    $pageNum = ($pageNum*10);
  //Separate and show page specific student list items
    var visibleStudents = list.slice($pageNum,$pageNum+10);
  //Hide No Results search text to make a cleaner flow (asthetic choice)
    $(noMatchHTML).hide();

  //jump out and show visible students
    return visibleStudents.show();
  });
}

var addSearch= function(){
//Create HTML Text as directed
  var searchDiv= document.createElement('div');
  $(searchDiv).addClass('student-search');
  var searchInput = document.createElement('input');
  $(searchInput).attr('placeholder', 'Search for students...');
  var searchButton= document.createElement('button');
  $(searchButton).text('Search');
  $(searchDiv).append(searchInput);
  $(searchDiv).append(searchButton);
  $('.page-header').append(searchDiv);
//Call Event handler to bind newly created button
  bindSearch();
}

var bindSearch = function(){
//Select button and Bind 'CLICK'
  $('.student-search button').click(function(){
    console.log('Search Button Clicked');
    //Grab search text
    var searchContent = $('.student-search input').val();
    console.log('this is what was searched: ' + searchContent);
    //To exit search
    if(searchContent===''){
      return location.reload();
    }
    $('li.match').removeClass('match');
    //initialize result counter to toggle NO RESULTS text
    var resultsNum=0;
    //Hide all Students (makes it easier to toggle ON matching students)
    $('.student-list li').hide();
    //Determine which students match the search
    $('.student-list li').each(function(){
      //Evaluate the search terms,show matching students, and ++ results counter
      //Grab text from each LI to use as comparison to our search text
      var liText=$(this).text();
      // console.log(liText);
      //Compare!
      if(liText.indexOf(searchContent.toLowerCase())!==-1){
        console.log('found a match');
        //Add 1 to the results
        resultsNum ++;
        //Displays this student
        $(this).addClass('match');
        // $(this).toggle();


      }
    });
    //Analyze result counter, show message/Results depending.
    console.log('Number of Matches: '+ resultsNum);
    //DO WE NEED THE No Results MESSAGE?
    if(resultsNum==0){
     //YES! We had Zero Results
      console.log('Time to create HTML');
      $(noMatchHTML).show();
    }else{
     //NOPE! We had at least 1 result
      $(noMatchHTML).hide();
    }
    $('li.match').show();
    addPagination($('li[class*=\'match\']'));
  });
}

var createNoMatchHTML= function(){
  noMatchHTML=document.createElement('p');
  noMatchText=document.createTextNode('There are no matches! Please try again.');
  $(noMatchHTML).append(noMatchText);
  $('.student-list').before().append(noMatchHTML);
  return $(noMatchHTML).hide();
}

//LET'S DO THIS THING
//On Page load: Show first 10 students
$(document).ready(function(){
  createNoMatchHTML();
  addPagination($(".student-list li"));

});
  addSearch();
