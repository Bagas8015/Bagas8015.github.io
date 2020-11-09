document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save");
    let btndelete = document.getElementById("delete");
    let item;
    if (isFromSaved) {
        btnSave.style.display = 'none';
        item = getSavedInfoTeamsById();    
    }else{
        btndelete.style.display = 'none';
        item = getInfoTeams();
    }
  
    btnSave.onclick = function() {
        console.log("Tombol FAB di klik.");
        item.then(function(information) {
        saveForLater(information);
        });
    };
  
    btndelete.onclick = function() {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = parseInt(urlParams.get("id"));
        console.log("Tombol delete di klik.");
        DeleteFavorite(idParam);
    };
});