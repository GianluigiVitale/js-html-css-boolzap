$(document).ready(function() {
    $('.fa-paper-plane').click(function(){
        var messaggioInput = $('#message').val();
        if (messaggioInput.trim().length > 0) {
            $('#message').val('');
            var messaggio = $('.template-box-message-sent .template-message-sent').clone();
            messaggio.children('.testo-messaggio').text(messaggioInput);
            $('.center-chat.active').append(messaggio);

            checkInputMessage(); //Eseguo nuovamente il controllo per rimuovere il paper-plane
            setTimeout(messageOk, 1000);
        }
    });

    //Funzione che controlla se l'input ha un messaggio e fa apparire e scomparire le icone
    function checkInputMessage() {
        var messaggioInput = $('#message').val();

        if (messaggioInput.length > 0) {
            $('.fa-paper-plane').removeClass('not-active')
            $('.fa-microphone').addClass('not-active')
        } else {
            $('.fa-microphone').removeClass('not-active')
            $('.fa-paper-plane').addClass('not-active')
        }
    }

    function messageOk() {
        var messaggio1 = $('.template-box-message-received .template-message-received').clone();
        messaggio1.children('.testo-messaggio').text('Ok');
        $('.center-chat.active').append(messaggio1);
        scrollDown();
    }

    $("#message").keyup(function(event) {
        checkInputMessage();
        if (event.keyCode === 13) {
            $(".fa-paper-plane").click();
            scrollDown();
        }
    });

    function scrollDown() {
        var centerChatDown = $('.center-chat.active').prop("scrollHeight");
        $('.center-chat.active').scrollTop(centerChatDown);
    }
    // function scrollDown() {
    //     var centerChatDown = document.getElementById('center-chat');
    //     centerChatDown.scrollTop = 10000;
    // }


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

    // $('#message').focus(function(){
    //     $('.fa-paper-plane').removeClass('not-active');
    //     $('.fa-microphone').addClass('not-active');
    // }).blur(function(){
    //     $('.fa-paper-plane').addClass('not-active');
    //     $('.fa-microphone').removeClass('not-active');
    // });

    $('.username').click(function() {
        var nomeUtenteClk = $(this).find('.name-recent-user h3').text();
        var utente = $(this).data('codiceUtente');
        $('.img-name-lastaccess .img-time').each(function() {
            if (utente == $(this).data('codiceUtente')) {
                $('.img-name-lastaccess .img-time').addClass('not-active');
                $(this).removeClass('not-active');
            }
        });
        $('.center-chat').each(function() {
            if (utente == ($(this).data('codiceUtente'))) {
                $('.center-chat').addClass('not-active').removeClass('active')
                $(this).removeClass('not-active').addClass('active')
            }
        });
    });





});
