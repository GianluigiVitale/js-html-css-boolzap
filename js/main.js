$(document).ready(function() {
    $('.fa-paper-plane').click(function(){
        var messaggioInput = $('#message').val();
        $('#message').val('');
        var messaggio = $('.template-box-message-sent .template-message-sent').clone();
        messaggio.children('.testo-messaggio').text(messaggioInput);
        $('.center-chat').append(messaggio);

        setTimeout(messageOk, 1000);
        function messageOk() {
            var messaggio1 = $('.template-box-message-received .template-message-received').clone();
            messaggio1.children('.testo-messaggio').text('Ok');
            $('.center-chat').append(messaggio1);
        }
    })






});
