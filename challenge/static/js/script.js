//alert('hello')
//chalenge 1 : your age in days

function ageindays() {
    var birthday = prompt('What year is your birthday?');
    var ageindays1 = (2021 - birthday) * 365;

    var h1 = document.createElement('h1');

    var textanswer = document.createTextNode('You are ' + ageindays1 + ' days old.');


    //print result in the page
    h1.setAttribute('id', 'ageindays2');
    h1.appendChild(textanswer);
    document.getElementById("Flex-box-result").appendChild(h1);

    //console.log(ageindays1);



}

function reset() {
    document.getElementById('ageindays2').remove();
}
//challenge 2: cat generator
function generatecat() {
    var image = document.createElement('img');
    var div = document.getElementById("flex-cat-gen");
    image.src = "static/img/cat2.gif";
    div.appendChild(image);
}

//challenge 3 : rock,paper,scissors

function rpsgame(yourchoice) {
    //console.log(yourchoice);
    //console.log(yourchoice.src);
    var humanchoice, botchoice;
    humanchoice = yourchoice.id;
    //console.log(humanchoice);

    botint = randtorpsint();
    botchoice = numbertochoice(botint);
    //console.log(botchoice);

    results = decidewinner(humanchoice, botchoice); //returns [1,0]... [human,bot]...1=win,0=lose,.5=tied
    //console.log(results);


    message = finalmessage(results);// returns 'you won':'green','you lose':'red','you tied':'yellow'
    //console.log(message);


    rpsfrontend(humanchoice, botchoice, message);

}

function randtorpsint() {
    return Math.floor(Math.random() * 3);
}
function numbertochoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}
function decidewinner(mychoice, botchoice) {
    var rpsdatabase = {
        'rock': { 'scissors': 1, 'rock': .5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': .5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': .5, 'rock': 0 }
    };
    var myscore = rpsdatabase[mychoice][botchoice];
    var botscore = rpsdatabase[botchoice][mychoice];
    return [myscore, botscore];
}

function finalmessage([myscore, botscore]) {
    if (myscore == 0) {
        return { 'message': 'You lost.', 'color': 'red' };

    } else if (myscore == .5) {
        return { 'message': 'You tied.', 'color': 'yellow' };
    } else { return { 'message': 'You won.', 'color': 'green' }; }
}

function rpsfrontend(humanchoice, botchoice, message) {
    var imagedatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };
    //remove current elements
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv = document.createElement('div');
    var messagediv = document.createElement('div');
    var botdiv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + imagedatabase[humanchoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
    messagediv.innerHTML = "<h1 style='color: " + message['color'] + ";font-size:60px; padding=30px;'>" + message['message'] + "</h1>";
    botdiv.innerHTML = "<img src='" + imagedatabase[botchoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";

    document.getElementById("flex-box-rps-div").appendChild(humandiv);
    document.getElementById("flex-box-rps-div").appendChild(messagediv);
    document.getElementById("flex-box-rps-div").appendChild(botdiv);

}


// Challenge -4 : Change the color of the buttons

var allbuttons = document.getElementsByTagName('button');

//console.log(allbuttons);
var copyallbuttons = [];
for (let i = 0; i < allbuttons.length; i++) {
    copyallbuttons.push(allbuttons[i].classList[1]);
}

//console.log(copyallbuttons);

function buttoncolorchange(buttonthingy) {
    if (buttonthingy.value == 'red') {
        buttonred();
    } else if (buttonthingy.value == 'green') {
        buttongreen();
    } else if (buttonthingy.value == 'reset') {
        buttonreset();
    } else if (buttonthingy.value == 'random') {
        buttonrandom();
    }
}

function buttonred() {
    for (let i = 0; i < allbuttons.length; i++) {
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add('btn-danger');
    }
}

function buttongreen() {
    for (let i = 0; i < allbuttons.length; i++) {
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add('btn-success');
    }
}

function buttonreset() {
    for (let i = 0; i < allbuttons.length; i++) {
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add(copyallbuttons[i]);
    }
}

function buttonrandom() {
    let choices = ["btn-primary", "btn-danger", "btn-warning", "btn-success"]

    for (let i = 0; i < allbuttons.length; i++) {
        let rand = Math.floor(Math.random() * 4);
        //console.log(rand);
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add(choices[rand]);
    }
}

// challenge 5 : Blackjack

let blackjackgame = {
    'you': { 'score-span': '#your-blackjack-result', 'div': '#your-box', 'score': 0, },
    'dealer': { 'score-span': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0, },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardmap': {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10,
        'J': 10, 'Q': 10, 'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isstand': false,
    'turnover': false,
    'ishit': false,

};

const you = blackjackgame['you'];
const dealer = blackjackgame['dealer'];
const hitsound = new Audio('static/sounds/swish.m4a');
const lossound = new Audio('static/sounds/aww.mp3');
const winsound = new Audio('static/sounds/cash.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackdeal)


function blackjackhit() {

    if (blackjackgame['isstand'] == false) {
        blackjackgame['ishit'] = true;
        //alert('yahoo!');
        let card = randomcard();
        //console.log(card);

        showcard(card, you);
        updatescore(card, you);
        showscore(you);
        //showcard(card, dealer);
        //updatescore(card, dealer);
        //showscore(dealer);
    }
}

function randomcard() {
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomindex];
}

function showcard(card, activeplayer) {
    if (activeplayer['score'] <= 21) {
        let cardimage = document.createElement('img');

        cardimage.src = `static/img/${card}.png`; // not qutation mark, its the one under escape key
        //console.log(cardimage);
        document.querySelector(activeplayer['div']).appendChild(cardimage);
        hitsound.play();
    }
}

function blackjackdeal() {

    if (blackjackgame['turnover'] == true) {

        blackjackgame['isstand'] = false;

        //let winner = computewinner();
        //showresult(winner);

        let yourimages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');
        //console.log(yourimages);
        for (let i = 0; i < yourimages.length; i++) {
            yourimages[i].remove();
        }
        for (let i = 0; i < dealerimages.length; i++) {
            dealerimages[i].remove();
        }
        you['score'] = 0;
        dealer['score'] = 0;

        document.querySelector(you['score-span']).textContent = 0;
        document.querySelector(you['score-span']).style = 'white';
        document.querySelector(dealer['score-span']).textContent = 0;
        document.querySelector(dealer['score-span']).style = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';


        blackjackgame['turnover'] = false;
        blackjackgame['ishit'] = false;

    }
}

function updatescore(card, activeplayer) {
    if (card == 'A') {
        if (activeplayer['score'] + blackjackgame['cardmap'][card][1] <= 21) {
            activeplayer['score'] += blackjackgame['cardmap'][card][1];
        } else {
            activeplayer['score'] += blackjackgame['cardmap'][card][0];
        }
    }
    else {
        activeplayer['score'] += blackjackgame['cardmap'][card];
        //let a = activeplayer['score'];
        //console.log(a);
    }
}

function showscore(activeplayer) {



    if (activeplayer['score'] > 21) {
        document.querySelector(activeplayer['score-span']).textContent = 'Bust!';
        document.querySelector(activeplayer['score-span']).style.color = 'red';
    } else {
        document.querySelector(activeplayer['score-span']).textContent = activeplayer['score'];
        //let a = document.querySelector(activeplayer['score-span']).textContent;
        //console.log(a);
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerlogic() {
    if (blackjackgame['ishit'] == true && blackjackgame['turnover'] == false) {

        blackjackgame['isstand'] = true;
        while (dealer['score'] < 16) {
            let card = randomcard();
            showcard(card, dealer);
            updatescore(card, dealer);
            showscore(dealer);
            //computewinner();

            await sleep(1000);
        }


        blackjackgame['turnover'] = true;

        let winner = computewinner();
        showresult(winner);

    }
}


//compute winner and return who just won the game
//update the wins,losses and draws

function computewinner() {
    let winner;
    if (you['score'] <= 21) {
        if (you['score'] > dealer['score'] || (dealer['score'] > 21)) {
            //console.log('you won!');
            blackjackgame['wins']++;
            winner = you;

        }
        else if (you['score'] < dealer['score']) {
            //console.log('you lost!');
            blackjackgame['losses']++;
            winner = dealer;
        } else {
            //console.log('you drew!');
            blackjackgame['draws']++;
        }
    } else if (dealer['score'] <= 21) {
        //console.log('you lost!');
        blackjackgame['losses']++;
        winner = dealer;
    } else {
        //console.log('you drew!');
        blackjackgame['draws']++;
    }

    //console.log('winner is :', winner);
    //console.log(blackjackgame);
    return winner;
}


function showresult(winner) {
    if (blackjackgame['turnover'] == true) {
        let message, messagecolor;

        if (winner == you) {
            document.querySelector('#wins').textContent = blackjackgame['wins'];
            message = 'You win!';
            messagecolor = 'green';
            winsound.play();
        }
        else if (winner == dealer) {
            document.querySelector('#losses').textContent = blackjackgame['losses'];
            message = 'You lost!';
            messagecolor = 'red';
            lossound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackgame['draws'];
            message = 'You drew!';
            messagecolor = 'black';
            //console.log(message);
            //console.log(blackjackgame['draws']);
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messagecolor;
    }
}