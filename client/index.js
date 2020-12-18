var me = {};
me.avatar = './asset/bot.png';

var you = {};
you.avatar = './asset/me.png';

function formatAMPM(date) {
    var strTime;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    strTime = hours + ":" + minutes;
    return strTime;
}

function insertChat(who, text){
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, 0);
    
}

//empty chatt
function resetChat(){
    $("ul").empty();
}


async function sentJobData(data) {
    let foo = await fetch('http://localhost:3000/applying', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let fooJSON = await foo.json();
    return fooJSON;
}


let answers = [];
let whichQuestion = 0;
$(".mytext").on("keydown", async function(e){
    if (e.which == 13){
        var text = $(this).val();
            answers.push(text);
            console.log(answers);
            insertChat("you", text);    
            if (text !== ""){
                whichQuestion++;
                switch(whichQuestion) {
                    case 1:
                        insertChat("me","Hallo " + answers[0] + ",ben je gemotifeerd ja/nee");
                        break;
                    case 2:
                        insertChat("me", "Waar ben je geboren?");
                        break;
                    case 3:
                        insertChat("me", "wat voor school diploma heb je?");
                        break;
                    case 4:
                        insertChat("me", "Hoeveel jaar ervaring heb je?");
                        break;
                    case 5:
                        insertChat("me", "ben je een man of een vrouw?");
                        break;
                    default:
                        let aangenomenofniet = sentJobData({
                            name: answers[0],
                            motivated: answers[1].toLowerCase(),
                            origin: answers[2].toLowerCase(),
                            diploma: answers[3].toLowerCase(),
                            ervaring: answers[4],
                            gender: answers[5].toLowerCase()
                        });
                        const data = await aangenomenofniet;
                        if (data.aangenomen){
                            insertChat("me", "je bent aangenomen!");
                        } else if (!(data.aangenomen)) {
                            insertChat("me", "je bent niet aangenomen");
                        }
                        break;
                };       
                $(this).val('');
        }
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
});

resetChat();

insertChat("me","Wat is je naam?");