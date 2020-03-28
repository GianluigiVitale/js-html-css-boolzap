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

    var elencoRisposte = [
        'Chi lascia la strada vecchia per la nuova arriva prima perché è meglio asfaltata.',
        'Gallina vecchia si fa il lifting.',
        'Quando si chiude una porta, tu rimani fuori.',
        'Chi va piano va sano, ma viene tamponato poco lontano.',
        'Chi troppo vuole nulla rifiuta.',
        'L’ospite è come il pesce, dopo tre giorni… nuota.',
        'Can che abbaia lo sbattono fuori dal condominio.',
        'Chi di spada ferisce gli danno 10 anni senza condizionale.',
        'Chi dorme non piglia sonniferi.',
        'Non c’è peggior sordo di chi non sente veramente.',
    ]

    $('.fa-paper-plane').click(function(){          // al click dell'icona paper-plane
        var messaggioInput = $('#message').val();
        if (messaggioInput.trim().length > 0) {         // se l'input ha contenuto
            $('#message').val('');                      // resetto il valore dell'input
            invioMessaggioConScrollDown(messaggioInput, 'sent', '.center-chat.active');    // mando un messaggio in chat
            checkInputMessage();                                //Eseguo nuovamente il controllo per rimuovere il paper-plane
            setTimeout(function() {
                var numeroRispostaRandom = generaRandom(0, 9);
                var rispostaRandom = elencoRisposte[numeroRispostaRandom];
                invioMessaggioConScrollDown(rispostaRandom, 'received', '.center-chat.active');
            }, 1000);
        }
    });

    $("#message").keyup(function(event) {    // quando viene rilasciato un tasto dentro #message
        checkInputMessage();
        if (event.keyCode === 13) {             // se si preme il tasto invio
            $(".fa-paper-plane").click();
        }
    });


    $('.username').click(function() {       // al click del div (.username) cambio il nome sopra la chat e la chat
        var thisAvatar = $(this).find('img').attr('src');                   // Creo una variabile con il valore del src dell'immagine dell'avatar cliccato
        var thisName = $(this).find('h3').text();                           // Variabile con il Nome dell'utente cliccato
        var thisHour = $(this).find('.last-chat-user p').text();            // Variabile con l'orario dell'ultimo accesso dell'utente cliccato
        $('.img-name-lastaccess img').attr('src', thisAvatar);              // Assegno i valori appena dichiarati così da avere in alto sempre i dati della chat premuta
        $('.name-recent-user1 h2').text(thisName);
        $('.name-recent-user1 p').text('Ultimo accesso oggi alle ' + thisHour);

        // allo stesso modo come cambio il nome dell'utente cliccato sopra la chat, cosi' devo mostrare la sua chat

        var utente = $(this).data('codiceUtente');                          // Variabile che salva il codice dell'utente.
        $('.center-chat').each(function() {                                 // ciclo il div .center-chat
            if (utente == ($(this).data('codiceUtente'))) {                     // Se il codice dell'utente cliccato e' uguale al codice utente (ciclato sopra)
                $('.center-chat').removeClass('active')      // a tutti i '.center-chat' rimuovo la classe 'active'
                $(this).addClass('active')                   // esattamente (this) a questo div '.center-chat' e gli aggiungo la classe active
            }
        });
    });


    // serve per la visualizzazione sotto i 992px
    $('.username').click(function() {           // al clic di un 'username' si nasconde 'list-user' e si mostra la chat.   N.B. sopra i 992px il list-user rimane visible al click di .username SOLO perche' ho messo nella media query display block
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
    });

    $(document).on('click', '.delete-message' ,function() { // creo un altro document.on perche' se lo metto dentro al precedente non esegue l'evento solo una volta
        $(this).parent().remove();
    });

    var messaggiArchiviati = {
        c0: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Fabio come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c1: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Fabrizio come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c2: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Marta come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c3: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Irene come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c4: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Gianluca come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c5: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Luca come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c6: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Riccardo come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c7: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Nicolò come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c8: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Michele come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
        c9: [
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Ciao Chiara come stai?',
                sentReceived: 'sent'
            },
            {                                 // Assemblo in un oggetto il contenuto del messaggio
                testoMessaggio: 'Non c\'è male, ma Luca mi sta facendo impazzire',
                sentReceived: 'received'
            }
        ],
    };

    var source = $('#messaggio-template').html();              // clono il template messaggio
    var template = Handlebars.compile(source);                 // do in pasto ad Handlebars il template clonato

    for (var convKey in messaggiArchiviati) {                            // ciclo nell'oggetto
        // console.log(convKey);                                         // Stampo la chiave
        // console.log(messaggiArchiviati[convKey]);                     // Stampo il valore MEMENTO senza dot notation
        var numeroConversazione = convKey[1];
        // console.log('Trasformo la chiave: ' + convKey + ' in: ----> ' + numeroConversazione);
        for (var i = 0; i < convKey.length; i++) {                       // per ogni chiave dell'oggetto devo fare un ciclo nell'array corrisponte
            // console.log(messaggiArchiviati[convKey][i]);
            var oggettoMessaggio = messaggiArchiviati[convKey][i];       // Shortcut
            var testoMessaggio = oggettoMessaggio.testoMessaggio;        // Shortcut
            var direzione = oggettoMessaggio.sentReceived;                  // Shortcut

            var selettoreConversazione = $('.center-chat[data-codice-utente="' + numeroConversazione + '"]');
            invioMessaggioConScrollDown(testoMessaggio, direzione, selettoreConversazione);
        }
    }


    var utentiChat = [      // array con oggetti contenente immagine, nome, messaggio e orario di ogni utente
        {
            source: 'img/1.png',
            name: 'Fabio',
            message: 'Non poteva essere altrimenti',
            time: '17:53'
        },
        {
            source: 'img/2.png',
            name: 'Fabrizio',
            message: 'ti devo raccontare una cosa',
            time: '08:07'
        },
        {
            source: 'img/3.png',
            name: 'Marta',
            message: 'Proprio così',
            time: '00:35'
        },
        {
            source: 'img/4.png',
            name: 'Irene',
            message: 'beato te!',
            time: '12:38'
        },
        {
            source: 'img/5.png',
            name: 'Gianluca',
            message: 'Come stai?',
            time: '23:29'
        },
        {
            source: 'img/6.png',
            name: 'Luca',
            message: 'si',
            time: '18:15'
        },
        {
            source: 'img/7.png',
            name: 'Riccardo',
            message: 'ma stai scherzando?!',
            time: '15:00'
        },
        {
            source: 'img/8.png',
            name: 'Nicolò',
            message: 'meno male',
            time: '17:27'
        },
        {
            source: 'img/9.png',
            name: 'Michele',
            message: 'tutto bene grazie, tu?',
            time: '19:16'
        },
        {
            source: 'img/10.png',
            name: 'Chiara',
            message: 'ti ringrazio',
            time: '12:11'
        }
    ]

    var source1 = $('#chat-template').html();              // clono il template messaggio
    var template1 = Handlebars.compile(source1);                 // do in pasto ad Handlebars il template clonato

    for (var i = 0; i < utentiChat.length; i++) {   // ciclo l'array utentiChat per fare l'append al template di handlebars per popolare la parte sinistra con le varie info degli utenti
        var appendUtente = utentiChat[i];
        var chatToAppend = $('.username[data-codice-utente="' + i + '"]');

        var html1 = template1(appendUtente);
        $(chatToAppend).append(html1);
    }



    // Funzioni usate



    function invioMessaggioConScrollDown(messaggioDaInviare, sendOrReceiveClass, selettoreConversazione) {  // funzione che serve per mandare o ricevere un messaggio, valori di input messaggio da inserrire e se e' un messaggio da ricevere o da mandare
        var datiMessaggio = {
            testoMessaggio: messaggioDaInviare,
            sentReceived: sendOrReceiveClass,
            sxODx: 'null'
        }
        if (sendOrReceiveClass == 'sent') {
            datiMessaggio.sxODx = 'right';
        } else {
            datiMessaggio.sxODx = 'left';
        }

        var templateMessaggio = template(datiMessaggio);
        $(selettoreConversazione).append(templateMessaggio);
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

    function generaRandom(min, max) {   // funzione che genera un numero random tra 2 valori (compresi) min e max
        var numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        return numeroRandom;
    }

});
