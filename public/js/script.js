

function openTab(tab) {

    let tabPane = document.getElementsByClassName('tab-pane');

    for( i=0 ; i < tabPane.length;i++){
        tabPane[i].style.display = "none"
    }

    document.getElementById(tab).style.display = "block";
    window.scrollTo(0,0);
}

