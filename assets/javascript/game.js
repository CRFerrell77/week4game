

var fightInProgress = false;

var attSelect = true;

var currentAtt = {
    base_atk: 0,
    atk_pts: 0,
    hp: 0,
};

var currentDef = {
    base_atk: 0,
    atk_pts: 0,
    hp: 1,
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
    
var godzilla = characterCreator("godzilla", 100, 5)
// var mothra = characterCreator("mothra", 90, 6)
var gigan = characterCreator("gigan", 110, 4)
var destoroyah = characterCreator("destoroyah",150, 3)
// var mechagodzilla = characterCreator("mechagodzilla", 125, 3)
var hedorah = characterCreator("hedorah", 95, 6)

var monsterArray = [godzilla, /*mothra,*/ gigan, destoroyah, /*mechagodzilla,*/ hedorah];

var fightRound = 0;

var idx = ""; //needed for selection

function fillLobby(chars) {
    var imgPath = "assets/images/"

    for (i = 0; i < chars.length; i++){

        boxClass = "box" + [i];

        monsDiv = $("<div id=" + chars[i].id + "></div>");
        monsDiv.html("<p>" + chars[i].name + "</p>" +
                    "<button class='monBtn'><span><img src='" + imgPath + chars[i].image +"'/></span></button>" +
                    "<p>HP: " + chars[i].hp + "</p>");
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
    fightRound++;
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
    console.log("this is where the monster is attached to the generic term Attacker");
    console.log(currentAtt);
    //stuff happens
}

function Defender(character){
    if(fightInProgress){return};
    console.log("this is where the select defender function hits");
    console.log(character);
    //populate stats
    currentDef.hp = character.hp;
    currentDef.atk_pts = character.atk_pts;
    currentDef.base_atk = character.base_atk;
    console.log("this is where the monster is attached to the generic term Defender");
    console.log(currentDef);
    //stuff happens
    fightInProgress = true;
}

function updateStats(attacker, defender){
    //update the scoreboard after each press of the attack button
    //don't show attack power
    //update stats
    console.log("A: " + attacker);
    console.log("D: " + defender);
}

$(".fightButton").click(fight(currentAtt, currentDef));

function fight(attacker, defender){// this is the attack button
    if(fightInProgress){
        defender.hp -= attacker.atk_pts;
        attacker.hp -= defender.base_atk;
        attacker.atk_pts += attacker.base_atk
        //update stats
        updateStats(currentAtt, currentDef);

        // if(defender.hp < 1){
        //     var id = "#" + defender.name + "X";
        //     $(id).html("");
        //     fightInProgress = false
        //     defSelect();
        // }
        //select new defender 
        //HEALTH BAR
    }
}

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
        else {
            defSelect();
        }
         
    });
};