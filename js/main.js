$(document).ready(function() {

    $('#search-bar').keyup(function(event){                 // quando viene rilasciato un tasto dentro #search-bar
        var filtroCaratteri = $(this).val().toLowerCase();      // Variabile che salva il valore dell'input e lo tramuta in minuscolo
        ricercaUtente(filtroCaratteri);
    });

    // altro modo search bar
    // $('#search-bar').keyup(function(event){
    //     var that = $(this);
    //     ricercaUtente(that);
    //     console.log('richiamo funzione');
    // });
    // function ricercaUtente(that) {
    //     var filtroCaratteri = that.val().toLowerCase();
    //     console.log('sono dentro');
    //     $('.username').each(function(){
    //         var nomeUtente = $(this).find('.name-recent-user h3').text().toLowerCase();
    //         if (nomeUtente.includes(filtroCaratteri)) {
    //             $(this).show();
    //         } else {
    //             $(this).hide();
    //         }
    //     });
    // }


    $('.fa-paper-plane').click(function(){          // al click dell'icona
        var messaggioInput = $('#message').val();
        if (messaggioInput.trim().length > 0) {         // se l'input ha contenuto, mando un messaggio in chat
            $('#message').val('');
            invioMessaggioConScrollDown(messaggioInput, 'sent');
            checkInputMessage();                                //Eseguo nuovamente il controllo per rimuovere il paper-plane
            setTimeout(function() {
                invioMessaggioConScrollDown('ok', 'received');
            }, 1000);
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
        var utente = $(this).data('codiceUtente');                          // Variabile che salva il codice dell'utente.
        var thisAvatar = $(this).find('img').attr('src');                   // Creo una variabile con il valore del src dell'immagine dell'avatar cliccato
        var thisName = $(this).find('h3').text();                           // Variabile con il Nome dell'utente cliccato
        var thisHour = $(this).find('.last-chat-user p').text();            // Variabile con l'orario dell'ultimo accesso dell'utente cliccato
        $('.img-name-lastaccess img').attr('src', thisAvatar);              // Assegno i valori appena dichiarati così da avere in alto sempre i dati della chat premuta
        $('.name-recent-user1 h2').text(thisName);
        $('.name-recent-user1 p').text('Ultimo accesso oggi alle ' + thisHour);

        // allo stesso modo come cambio il nome dell'utente cliccato sopra la chat, cosi' devo mostrare la sua chat

        $('.center-chat').each(function() {                                 // ciclo il div .center-chat
            if (utente == ($(this).data('codiceUtente'))) {                     // Se il codice dell'utente cliccato e' uguale al codice utente (ciclato sopra)
                $('.center-chat').removeClass('active')      // a tutti i '.center-chat' aggiungo la classe 'not-active' e rimuovo la classe 'active'
                $(this).addClass('active')                // rimuovo la classe 'not-active' esattamente (this) a questo div '.center-chat' e gli aggiungo la classe active
            }
        });
    });


    // serve per la visualizzazione sotto i 992px
    $('.username').click(function() {           // al clic di un 'username' si nasconde 'list-user' e si mostra la chat
        $('.list-user').addClass('not-active');
        $('.chat').addClass('visible')
    });
    $('#left-icon-resp').click(function() {     // al click dell'icona '#left-icon-resp' si nasconde la chat e si mostra 'list-user'
        $('.chat').removeClass('visible');
        $('.list-user').removeClass('not-active')
    });
    // fine under 992px


    $(document).on('click', '.message i' ,function() {  // serve per far apparire al click dell'icona 'chevron down' il menu a tendina 'elimina messaggio' anche sui messaggi mandati dinamicamente
        if ($(this).parent().children('.delete-message').is(":visible")) {
            $(this).parent().children('.delete-message').slideToggle();
        } else {
            $('.delete-message').slideUp();
            $(this).parent().children('.delete-message').slideToggle();
        }

        $('.delete-message').click(function() {     // al click del menu 'delete message' il container del messaggio viene eliminato
            $(this).parent().remove();
        });
    })


    // Funzioni usate

    function invioMessaggioConScrollDown(messaggioDaInviare, sendOrReceiveClass) { // funzione che serve per mandare o ricevere un messaggio, valori di input messaggio da inserrire e se e' un messaggio da ricevere o da mandare
        if (sendOrReceiveClass == 'sent') {
            var messaggio = $('.template-box-message.right-align .message').clone();
        } else {
            var messaggio = $('.template-box-message.left-align .message').clone();
        }
        messaggio.find('.testo-messaggio').text(messaggioDaInviare);
        messaggio.addClass(sendOrReceiveClass);
        $('.center-chat.active').append(messaggio);
        scrollDown();
    }

    function ricercaUtente(filtroCaratteri) {   // Solo se i caratteri digitati nell'input sono inclusi nel nome dell'utente allora lo mostra
        $('.username').each(function(){
            var nomeUtente = $(this).find('.name-recent-user h3').text().toLowerCase();
            if (nomeUtente.includes(filtroCaratteri)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

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

    function scrollDown() {         // funzione che serve per fare lo scroll automatico (all'invio o ricezione di un messaggio)
        var centerChatDown = $('.center-chat.active').prop("scrollHeight");
        $('.center-chat.active').scrollTop(centerChatDown);
    }

});
