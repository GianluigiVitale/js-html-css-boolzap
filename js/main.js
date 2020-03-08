$(document).ready(function() {

    $('#search-bar').keyup(function(event){         // quando viene rilasciato un tasto dentro #search-bar
        var filtroCaratteri = $(this).val().toLowerCase();      // Variabile che salva il valore dell'input e lo tramuta in minuscolo
        $('.username').each(function(){             // ciclo tutti gli '.username'
            var nomeUtente = $(this).find('.name-recent-user h3').text().toLowerCase();     // variabile che salva il nome dell'username ciclato come testo e lo trasforma in minuscolo
            // console.log(nomeUtente);
            if (nomeUtente.includes(filtroCaratteri)) {     // se la variabile nomeUtente e' inclusa in filtroCaratteri, mostro il nome utente altrimenti lo nascondo
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    });


    $('.fa-paper-plane').click(function(){          // al click dell'icona
        var messaggioInput = $('#message').val();
        if (messaggioInput.trim().length > 0) {         // se l'input ha contenuto, mando un messaggio in chat
            $('#message').val('');
            var messaggio = $('.template-box-message-sent .template-message-sent').clone();
            messaggio.children('.testo-messaggio').text(messaggioInput);
            $('.center-chat.active').append(messaggio);

            checkInputMessage(); //Eseguo nuovamente il controllo per rimuovere il paper-plane
            setTimeout(messageOk, 1000);    // dopo 1 secondo, evoco la funzione 'messageOk'
        }
    });


    $("#message").keyup(function(event) {    // quando viene rilasciato un tasto dentro #message
        checkInputMessage();
        if (event.keyCode === 13) {             // se si preme il tasto invio
            $(".fa-paper-plane").click();
            scrollDown();
        }
    });


    $('.username').click(function() {       // al click del div (.username) cambio il nome sopra la chat e la chat
        var nomeUtenteClk = $(this).find('.name-recent-user h3').text();    // Variabile che salva il nome dell'utente come testo.
        var utente = $(this).data('codiceUtente');                          // Variabile che salva il codice dell'utente.
        $('.img-name-lastaccess .img-time').each(function() {               // Ciclo il div (posizionato sopra la chat utente) che contiene l'immagine, il nome utente e l'ultimo accesso
            if (utente == $(this).data('codiceUtente')) {                   // Se il codice dell'utente cliccato e' uguale al codice utente (ciclato sopra)
                $('.img-name-lastaccess .img-time').addClass('not-active');         // aggiungo a tutti la classe 'not-active'
                $(this).removeClass('not-active');                                  // rimuovo la classe 'not-active' esattamente (this) a questo div .img-time
            }
        });

        // allo stesso modo come cambio il nome dell'utente cliccato sopra la chat, cosi' devo mostrare la sua chat

        $('.center-chat').each(function() {                                 // ciclo il div .center-chat
            if (utente == ($(this).data('codiceUtente'))) {                     // Se il codice dell'utente cliccato e' uguale al codice utente (ciclato sopra)
                $('.center-chat').addClass('not-active').removeClass('active')      // a tutti i '.center-chat' aggiungo la classe 'not-active' e rimuovo la classe 'active'
                $(this).removeClass('not-active').addClass('active')                // rimuovo la classe 'not-active' esattamente (this) a questo div '.center-chat' e gli aggiungo la classe active
            }
        });
    });

    $('.username').click(function() {
        $('.list-user').addClass('not-active');
        $('.chat').addClass('visible')
    });

    $('#left-icon-resp').click(function() {
        $('.chat').removeClass('visible');
        $('.list-user').removeClass('not-active')
    });



    $(document).on('click', '.message-sent i, .message-received i, .template-message-received i, .template-message-sent i' ,function() {
        if ($(this).parent().children('.delete-message').is(":visible")) {
            $(this).parent().children('.delete-message').slideToggle();
        } else {
            $('.delete-message').slideUp();
            $(this).parent().children('.delete-message').slideToggle();
        }

        $('.delete-message').click(function() {
            $(this).parent().addClass('not-active');
        });
    })
    // if ($(this).parent(".menu-item").children(".dropdown-menu").is(":visible")) {
    //     $(this).parent(".menu-item").children(".dropdown-menu").slideToggle();
    // } else {
    //     $(".dropdown-menu").slideUp();
    //     $(this).parent(".menu-item").children(".dropdown-menu").slideToggle();
    // }

    // Funzioni usate


    function checkInputMessage() {  //Funzione che controlla se l'input ha un messaggio e fa apparire e scomparire le icone
        var messaggioInput = $('#message').val();

        if (messaggioInput.length > 0) {
            $('.fa-paper-plane').removeClass('not-active')
            $('.fa-microphone').addClass('not-active')
        } else {
            $('.fa-microphone').removeClass('not-active')
            $('.fa-paper-plane').addClass('not-active')
        }
    }

    function messageOk() {          // funzione che serve per ricevere un messaggio con testo 'ok'
        var messaggio1 = $('.template-box-message-received .template-message-received').clone();
        messaggio1.children('.testo-messaggio').text('Ok');
        $('.center-chat.active').append(messaggio1);
        scrollDown();
    }


    function scrollDown() {         // funzione che serve per fare lo scroll automatico (all'invio o ricezione di un messaggio)
        var centerChatDown = $('.center-chat.active').prop("scrollHeight");
        $('.center-chat.active').scrollTop(centerChatDown);
    }
    // function scrollDown() {
    //     var centerChatDown = document.getElementById('center-chat');
    //     centerChatDown.scrollTop = 10000;
    // }


});
