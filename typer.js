var Typer = {
    text: null,
    accessCountimer: null,
    index: 0,
    speed: 2,
    accessCount: 0,
    deniedCount: 0,
    init: function () {
        accessCountimer = setInterval(function () { Typer.updLstChr(); }, 500);
        Typer.text = "hi friend.\n\nhere's what i've been up to:";
        Typer.text = Typer.text.slice(0, Typer.text.length);
    },

    content: function () {
        return $("#greeting").html();
    },

    write: function (str) {
        $("#greeting").append(str);
        return false;
    },

    addText: function (key) {

        if (key.keyCode == 18) {
            Typer.accessCount++;

            if (Typer.accessCount >= 3) {
                Typer.makeAccess();
            }
        }

        else if (key.keyCode == 20) {
            Typer.deniedCount++;

            if (Typer.deniedCount >= 3) {
                Typer.makeDenied();
            }
        }

        else if (key.keyCode == 27) {
            Typer.hidepop();
        }

        else if (Typer.text) {
            var cont = Typer.content();
            if (cont.substring(cont.length - 1, cont.length) == "|")
                $("#greeting").html($("#greeting").html().substring(0, cont.length - 1));
            if (key.keyCode != 8) {
                Typer.index += Typer.speed;
            }
            else {
                if (Typer.index > 0)
                    Typer.index -= Typer.speed;
            }
            var text = Typer.text.substring(0, Typer.index)
            var rtn = new RegExp("\n", "g");

            $("#greeting").html(text.replace(rtn, "<br/>"));
            window.scrollBy(0, 50);
        }

        if (key.preventDefault && key.keyCode != 122) {
            key.preventDefault()
        };

        if (key.keyCode != 122) { // otherway prevent keys default behavior
            key.returnValue = false;
        }
    },

    updLstChr: function () {
        var cont = this.content();

        if (cont.substring(cont.length - 1, cont.length) == "|")
            $("#greeting").html($("#greeting").html().substring(0, cont.length - 1));
        else
            this.write("|");
    }
}

Typer.speed = 3;
Typer.init();

var timer = setInterval("t();", 30);
function t() {
    Typer.addText({ "keyCode": 123748 });
    if (Typer.index > Typer.text.length) {
        clearInterval(timer);
    }
}