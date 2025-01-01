var sitename=document.getElementById('siteName');
var siteurl=document.getElementById('siteURL');
var submit_btn=document.getElementById('submitBtn');
var search_input=document.getElementById('searchInput');
var inputs=document.getElementsByClassName('form-control');
var currentIndex=0;
var bookmarkcontainer=[];

if(localStorage.getItem('bookmarks')!=null){
    bookmarkcontainer=JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}
submit_btn.onclick=function(){
    if(submit_btn.innerHTML=='Submit')
        submitForm();
    else
        updateItem();
        
    clearForm();
    displayBookmarks();
}
function submitForm(){
    var bookmark={
        name:sitename.value,
        url:siteurl.value
    }
    bookmarkcontainer.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkcontainer));
    
}
function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
}
function displayBookmarks(){
    container=``;
    for(var i=0;i<bookmarkcontainer.length;i++){
        container+=`<tr>
        <td>${bookmarkcontainer[i].name}</td>
        <td><button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${i});" >Delete</button></td>
        <td><button class="btn btn-sm btn-outline-warning" onclick="getInfo(${i});" >Update</button></td>
        </tr>`
    }
    document.getElementById('tablebody').innerHTML=container;
}
function deleteItem(index){
    bookmarkcontainer.splice(index,1);
    displayBookmarks();
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkcontainer));

}
function getInfo(index){
    currentIndex=index;
    var currentbookmark=bookmarkcontainer[index];
    sitename.value=currentbookmark.name;
    siteurl.value=currentbookmark.url;
    submit_btn.innerHTML='Update';

}
function updateItem(){
    var bookmark={
        name:sitename.value,
        url:siteurl.value
    }
    bookmarkcontainer[currentIndex]=bookmark;
    submit_btn.innerHTML='Submit';
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkcontainer));


}
search_input.onkeyup=function(){
    searchItem(search_input.value);
}
function searchItem(term){
    container=``;
    for(var i=0;i<bookmarkcontainer.length;i++){
        if(bookmarkcontainer[i].name.toLowerCase().includes(term.toLowerCase())){
            container+=`<tr>
            <td>${bookmarkcontainer[i].name}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${i});" >Delete</button></td>
            <td><button class="btn btn-sm btn-outline-warning" onclick="getInfo(${i});" >Update</button></td>
            </tr>`
        }
       
    }
    document.getElementById('tablebody').innerHTML=container;

}
var nameRegex=/^[A-Za-z_]{1,}$/;
function isnamevalid(){
    if(nameRegex.test(sitename.value)){
        return true;
    }else{
        return false;
    }
}
var urlRegex=/^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/;
function isUrlvalid(){
    if(urlRegex.test(siteurl.value)){
        return true;
    }else{
        return false;
    }
}
sitename.onkeyup=function(){
    if(isUrlvalid()&&isnamevalid()){
        submit_btn.removeAttribute("disabled");
    }else{
        submit_btn.disabled="true";
    }
}
siteurl.onkeyup=function(){
    if(isUrlvalid()&&isnamevalid()){
        submit_btn.removeAttribute("disabled");
    }else{
        submit_btn.disabled="true";
    }
}




