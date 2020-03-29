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

    $('.fa-paper-plane').click(function(){          // al click dell'icona paper-plane
        var messaggioInput = $('#message').val();
        if (messaggioInput.trim().length > 0) {         // se l'input ha contenuto
            $('#message').val('');                      // resetto il valore dell'input
            invioMessaggioConScrollDown(messaggioInput, 'sent', '.center-chat.active', oraAttuale());    // mando un messaggio in chat
                aggiornamentoMessaggioEOrario(messaggioInput)
            checkInputMessage();                                //Eseguo nuovamente il controllo per rimuovere il paper-plane
            setTimeout(function() {                             // dopo un secondo ricevo una risposta casuale scelta tra l'array elencoRisposte
                var rispostaRandom = generaRispostaRandom();
                invioMessaggioConScrollDown(rispostaRandom, 'received', '.center-chat.active', oraAttuale());
                    aggiornamentoMessaggioEOrario(rispostaRandom)
            }, 1000);
        }
    });

    $("#message").keyup(function(event) {    // quando viene rilasciato un tasto dentro #message
        checkInputMessage();
        if (event.keyCode === 13) {             // se si preme il tasto invio
            $(".fa-paper-plane").click();
        }
    });


    $('.username').click(function() {       // al click del div (.username) aggiungo a this la classe selected e cambio il nome sopra la chat e la chat
        $('.username').removeClass('selected');
        $(this).addClass('selected');
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

    var messaggiArchiviati = {      // questo oggetto contiene i messaggi di ogni conversazione (che poi viene dato in pasto a handlebars)
        c0: [
            {
                testoMessaggio: 'Purtroppo è andata così',
                sentReceived: 'sent',
                orario: '16:48'
            },
            {
                testoMessaggio: 'Non poteva essere altrimenti',
                sentReceived: 'received',
                orario: '17:53'
            }
        ],
        c1: [
            {
                testoMessaggio: 'Ok, capito',
                sentReceived: 'sent',
                orario: '23:56'
            },
            {
                testoMessaggio: 'Ti devo raccontare una cosa',
                sentReceived: 'received',
                orario: '08:07'
            }
        ],
        c2: [
            {
                testoMessaggio: 'E quindi hai trovato lavoro?',
                sentReceived: 'sent',
                orario: '00:35'
            },
            {
                testoMessaggio: 'Proprio così',
                sentReceived: 'received',
                orario: '00:35'
            }
        ],
        c3: [
            {
                testoMessaggio: 'Sono felice',
                sentReceived: 'sent',
                orario: '12:37'
            },
            {
                testoMessaggio: 'Beato te!',
                sentReceived: 'received',
                orario: '12:38'
            }
        ],
        c4: [
            {
                testoMessaggio: 'Ciao Gianluca come stai?',
                sentReceived: 'sent',
                orario: '11:59'
            },
            {
                testoMessaggio: 'Bene, tu?',
                sentReceived: 'received',
                orario: '23:29'
            }
        ],
        c5: [
            {
                testoMessaggio: 'Ma te lo sei comprato il nuovo pc alla fine?',
                sentReceived: 'sent',
                orario: '17:11'
            },
            {
                testoMessaggio: 'Si',
                sentReceived: 'received',
                orario: '18:15'
            }
        ],
        c6: [
            {
                testoMessaggio: 'Anna mi ha lasciato :(',
                sentReceived: 'sent',
                orario: '14:59'
            },
            {
                testoMessaggio: 'Ma stai scherzando?!',
                sentReceived: 'received',
                orario: '15:00'
            }
        ],
        c7: [
            {
                testoMessaggio: 'Dopo qualche giorno sono stato meglio',
                sentReceived: 'sent',
                orario: '15:00'
            },
            {
                testoMessaggio: 'Meno male',
                sentReceived: 'received',
                orario: '17:27'
            }
        ],
        c8: [
            {
                testoMessaggio: 'Ciao Michele come stai?',
                sentReceived: 'sent',
                orario: '19:11'
            },
            {
                testoMessaggio: 'Tutto bene grazie, tu?',
                sentReceived: 'received',
                orario: '19:16'
            }
        ],
        c9: [
            {
                testoMessaggio: 'Non ti preoccupare, vedrai che ce la farai',
                sentReceived: 'sent',
                orario: '00:56'
            },
            {
                testoMessaggio: 'Ti ringrazio',
                sentReceived: 'received',
                orario: '12:11'
            }
        ],
    };

    var source = $('#messaggio-template').html();              // clono il template messaggio
    var template = Handlebars.compile(source);                 // do in pasto ad Handlebars il template clonato

    for (var convKey in messaggiArchiviati) {                            // ciclo nell'oggetto
        var numeroConversazione = convKey[1];
        // console.log('Trasformo la chiave: ' + convKey + ' in: ----> ' + numeroConversazione);
        for (var i = 0; i < convKey.length; i++) {                       // per ogni chiave dell'oggetto faccio un ciclo nell'array
            // console.log(messaggiArchiviati[convKey][i]);
            var oggettoMessaggio = messaggiArchiviati[convKey][i];
            var testoMessaggio = oggettoMessaggio.testoMessaggio;       // salvo in delle variabili i vari contenuti della chiave
            var direzione = oggettoMessaggio.sentReceived;
            var orarioMessaggio = oggettoMessaggio.orario;

            var selettoreConversazione = $('.center-chat[data-codice-utente="' + numeroConversazione + '"]');
            invioMessaggioConScrollDown(testoMessaggio, direzione, selettoreConversazione, orarioMessaggio);
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
            message: 'Ti devo raccontare una cosa',
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
            message: 'Beato te!',
            time: '12:38'
        },
        {
            source: 'img/5.png',
            name: 'Gianluca',
            message: 'Bene, tu?',
            time: '23:29'
        },
        {
            source: 'img/6.png',
            name: 'Luca',
            message: 'Si',
            time: '18:15'
        },
        {
            source: 'img/7.png',
            name: 'Riccardo',
            message: 'Ma stai scherzando?!',
            time: '15:00'
        },
        {
            source: 'img/8.png',
            name: 'Nicolò',
            message: 'Meno male',
            time: '17:27'
        },
        {
            source: 'img/9.png',
            name: 'Michele',
            message: 'Tutto bene grazie, tu?',
            time: '19:16'
        },
        {
            source: 'img/10.png',
            name: 'Chiara',
            message: 'Ti ringrazio',
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



    function invioMessaggioConScrollDown(messaggioDaInviare, sendOrReceiveClass, selettoreConversazione, orarioMessaggio) {  // funzione che serve per mandare o ricevere un messaggio, valori di input messaggio da inserrire, se e' un messaggio da ricevere o da mandare, la conversazione attuale, e l'orario corrente
        var datiMessaggio = {
            testoMessaggio: messaggioDaInviare,
            sentReceived: sendOrReceiveClass,
            sxODx: 'null',
            orario: orarioMessaggio
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

    function generaRispostaRandom() {       // questa funzione ritorna una risposta casuale presa da un elenco di risposte predefinite
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
        ];

        var numeroRispostaRandom = generaRandom(0, 9);
        var rispostaRandom = elencoRisposte[numeroRispostaRandom];

        return rispostaRandom;
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

    function checkInputMessage() {      // Funzione che controlla se l'input ha un messaggio e fa apparire e scomparire le icone
        var messaggioInput = $('#message').val();

        if (messaggioInput.length > 0) {
            $('.fa-paper-plane').removeClass('not-active')
            $('.fa-microphone').addClass('not-active')
        } else {
            $('.fa-microphone').removeClass('not-active')
            $('.fa-paper-plane').addClass('not-active')
        }
    }

    function oraAttuale() {         // questa funzione ritorna l'orario attuale
        var dataCorrente = new Date();
        var orarioAdesso = dataCorrente.getHours() + ":" + (dataCorrente.getMinutes() <10?'0':'') + dataCorrente.getMinutes();     // se getMinutes è minore di 10 aggiunge uno zero (per far si di avere sempre 2 cifre)
        return orarioAdesso;
    };

    function tagliaMessaggio(messaggio) {       // questa funzione dato l'input messaggio se esso e' maggiore della lunghezza dei caratteriMax lo taglia
        var caratteriMax = 28;
        var controlloLunghezza = messaggio;
        if (messaggio.length > caratteriMax) {
            var taglio = messaggio.substr(0, caratteriMax)
            var controlloLunghezza = taglio + '...';
        }
        return controlloLunghezza;
    }

    function aggiornamentoMessaggioEOrario(messaggioDaAggiornare) {     // questa funzione imposta l'ultimo messaggio inviato e l'orario attuale come testo nella sezione utente corrispondente
        $('.username.selected').find('.name-recent-user p').text(tagliaMessaggio(messaggioDaAggiornare));
        $('.username.selected').find('.last-chat-user p').text(oraAttuale());
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
