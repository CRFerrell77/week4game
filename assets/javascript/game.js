var wins = 0;

var fightInProgress = false;

var attSelect = true;

var currentAtt = {
    base_atk: 0,
    atk_pts: 0,
    hp: 0,
    readyTag: 0,
};

var currentDef = {
    base_atk: 0,
    atk_pts: 0,
    hp: 1,
    readyTag: 0,
};

function characterCreator(name, hp, atk_pts){
    output = {};
    output.base_atk = atk_pts;
    output.name = name;
    output.id = name + "X";
    output.hp = hp;
    output.atk_pts = atk_pts;
    output.image = output.name + ".jpg";
    output.boxCl = "";
    return output;
}
    
var godzilla = characterCreator("godzilla", 1100, 116)
var gigan = characterCreator("gigan", 1200, 114)
var destoroyah = characterCreator("destoroyah", 1300, 111)
var hedorah = characterCreator("hedorah", 1000, 118)

var monsterArray = [godzilla, gigan, destoroyah, hedorah];

var fightRound = 1;

var deadCheck = 0;

var idx = ""; //needed for selection

function fillLobby(chars) {
    var imgPath = "assets/images/"

    for (i = 0; i < chars.length; i++){

        boxClass = "box" + [i];

        monsDiv = $("<div id=" + chars[i].id + "></div>");
        monsDiv.html("<p>" + chars[i].name + "</p>" +
                    "<button class='monBtn'><span><img src='" + imgPath + chars[i].image +"'/></span></button>" +
                    "<p>starting HP: " + chars[i].hp + "</p>");
        $(monsDiv).addClass("alive");
        $(monsDiv).addClass(boxClass);

        $("#lobby").append(monsDiv); 

        $(chars[i].boxCl).html(boxClass);
        //populate divs with monster info
        //replace all four div ids OR set a class based on monster name
    }
};




function defSelect() {
    //set enemy defender to one++
    console.log("fight round " + fightRound + " opponent");

    if (idx == "godzillaX") {
        Defender(godzilla);
        $("#godzillaX").removeClass("alive box0").addClass("boxDef defender");
    } 
    else if (idx == "destoroyahX") {
        Defender(destoroyah);
        $("#destoroyahX").removeClass("alive box2").addClass("boxDef defender");
    } 
    else if (idx == "giganX") {
        Defender(gigan);
        $("#giganX").removeClass("alive box1").addClass("boxDef defender");
    } 
    else if (idx == "hedorahX") {
        Defender(hedorah);
        $("#hedorahX").removeClass("alive box3").addClass("boxDef defender");
    }         
};




function Attacker(character){
    if(fightInProgress){return};
    console.log("this is where the select attacker function hits");
    console.log(character);
    //populate stats
    currentAtt.hp = character.hp;
    currentAtt.atk_pts = character.atk_pts;
    currentAtt.base_atk = character.base_atk;
    currentAtt.readyTag = 1;
    console.log("this is where the monster is attached to the generic term Attacker");
    console.log(currentAtt);
    //need to populate health bar

}

function Defender(character){
    if(fightInProgress){return};
    console.log("this is where the select defender function hits");
    console.log(character);
    //populate stats
    currentDef.hp = character.hp;
    currentDef.atk_pts = character.atk_pts;
    currentDef.base_atk = character.base_atk;
    currentDef.readyTag = 1;
    console.log("this is where the monster is attached to the generic term Defender");
    console.log(currentDef);
    //need to populate health bar


    fightInProgress = true;
    console.log("FIP = True");
}

//new way fight button, incorporates update stat block

$(".fightButton").on("click", function() {
    console.log("fight button was clicked");

    if (currentAtt.readyTag === 1 && currentDef.readyTag === 1) {
        if (fightInProgress) {
            currentDef.hp -= currentAtt.atk_pts;
            currentAtt.hp -= currentDef.base_atk;
            currentAtt.atk_pts += currentAtt.base_atk
            //update stats        
            console.log("Att HP: " + currentAtt.hp + " ATK:" + currentAtt.atk_pts);
            console.log("Def HP: " + currentDef.hp);
            //need to populate health barS/update stats
            $(".boxAttHp").html("<h4>HP: " + currentAtt.hp + "</h4>");
            $(".boxDefHp").html("<h4>HP: " + currentDef.hp + "</h4>");
        };
    };

    if (currentAtt.hp < 1) {
        alert("you dead!");
    } else if (currentDef.hp < 1){
        $(".boxDefHp").html("<h4>Select new combatant!</h4>");
        console.log("Dead defender");
        fightInProgress = false;
        console.log("FIP = false");
        currentDef.readyTag = 0;

        var idx = $(".defender").closest("div").prop("id");
            console.log(idx);

            if (idx == "godzillaX") {
                $("#godzillaX").removeClass("boxDef defender").addClass("dead box0");
                $("#godzillaX").html("<h2>godzilla</h2><img src='assets/images/skull.png' />");
                deadCheck++;
                console.log("dead checker: " + deadCheck);                
            } 
            else if (idx == "destoroyahX") {
                $("#destoroyahX").removeClass("boxDef defender").addClass("dead box2");
                $("#destoroyahX").html("<h2>destoroyah</h2><img src='assets/images/skull.png' />");
                deadCheck++;
                console.log("dead checker: " + deadCheck);
            } 
            else if (idx == "giganX") {
                $("#giganX").removeClass("boxDef defender").addClass("dead box1");
                $("#giganX").html("<h2>gigan</h2><img src='assets/images/skull.png' />");
                deadCheck++;
                console.log("dead checker: " + deadCheck);
            } 
            else if (idx == "hedorahX") {
                $("#hedorahX").removeClass("boxDef defender").addClass("dead box3");
                $("#hedorahX").html("<h2>hedorah</h2><img src='assets/images/skull.png' />");
                deadCheck++;
                console.log("dead checker: " + deadCheck);
            }   

        if (deadCheck === 3) {
            $(".boxDefHp").html("");
            alert("you won!");
            wins++;
            console.log("wins: " + wins);

            //setTimeout(/*function for resetting game and counting wins*/, 3000); //3 secs
        }


    // HEALTH BAR??
    };

});

window.onload = function() {
    fillLobby(monsterArray);
    $(".alive").on("click", function(event) {
        
        //pull parent div id
        idx = $(event.target).closest("div").prop("id");
        // console.log(idx);
    
        if (attSelect) {
            if (idx == "godzillaX") {
                Attacker(godzilla);
                $("#godzillaX").removeClass("alive box0").addClass("boxAtt attacker");
                attSelect = false;
            } 
            else if (idx == "destoroyahX") {
                Attacker(destoroyah);
                $("#destoroyahX").removeClass("alive box2").addClass("boxAtt attacker");
                attSelect = false;
            } 
            else if (idx == "giganX") {
                Attacker(gigan);
                $("#giganX").removeClass("alive box1").addClass("boxAtt attacker");
                attSelect = false;
            } 
            else if (idx == "hedorahX") {
                Attacker(hedorah);
                $("#hedorahX").removeClass("alive box3").addClass("boxAtt attacker");
                attSelect = false;
            }         
        } 
        else if (!attSelect) {
            defSelect();
        }
         
    });

    $(".resetButton").on("click", function() {
        //wipe everything, start over
        window.location.reload(false);

        //OK OK I admit this is a super cheat, and doesn't track wins, I am just running out of time! :(

    });




};


