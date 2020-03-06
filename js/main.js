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
            scrollDown();
        }
    });

    $("#message").keypress(function(event) {
        if (event.keyCode === 13) {
            $(".fa-paper-plane").click();
            scrollDown();
        }
    });

    function scrollDown() {
        var centerChatDown = $('.center-chat').height();
        $('.center-chat').scrollTop(centerChatDown);
    }


    $('#search-bar').keyup(function(event){
        var filtroCaratteri = $(this).val().toLowerCase();
        $('.username').each(function(){
            var nomeUtente = $(this).find('.name-recent-user h3').text().toLowerCase();
            // console.log(nomeUtente);
            if (nomeUtente.includes(filtroCaratteri)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    });

    $('#message').focus(function(){
        $('.fa-paper-plane').removeClass('not-active');
        $('.fa-microphone').addClass('not-active');
    }).blur(function(){
        $('.fa-paper-plane').addClass('not-active');
        $('.fa-microphone').removeClass('not-active');
    });






});
