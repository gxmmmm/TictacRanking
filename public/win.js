function sharefb() {
    var url = "tictacranking.web.app";
    // window.open("", "", "width=100,height=50");
    // // window.open("https://www.facebook.com/sharer/sharer.php?u=bkk-soisurvivor.netlify.app", "", "width=100,height=50");
    window.open('http://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');


}