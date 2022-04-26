setInterval(function time() {
    var d = new Date();

    var hours1 = parseInt((23 - d.getHours()) / 10);
    var hours2 = parseInt((23 - d.getHours()) % 10);

    var min1 = parseInt((59 - d.getMinutes()) / 10);
    var min2 = parseInt((59 - d.getMinutes()) % 10);

    var sec1 = parseInt((59 - d.getSeconds()) / 10);
    var sec2 = parseInt((59 - d.getSeconds()) % 10);

    jQuery('#hour1').html(hours1)
    jQuery('#hour2').html(hours2)
    jQuery('#min1').html(min1)
    jQuery('#min2').html(min2)
    jQuery('#sec1').html(sec1)
    jQuery('#sec2').html(sec2)
}, 1000);