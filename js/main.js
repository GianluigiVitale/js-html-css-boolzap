$(document).ready(function() {
    $('.fa-paper-plane').click(function(){
        var messaggioInput = $('#message').val();
        $('#message').val('');
        var messaggio = $('.template-box-message-sent .template-message-sent').clone();
        messaggio.children('.testo-messaggio').text(messaggioInput);
        $('.center-chat').append(messaggio);
    })




});
