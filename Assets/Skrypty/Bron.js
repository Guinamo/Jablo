#pragma strict

//stale
var weaponscount : int = 10;

//zmienne
var aktualna : int = 0;
var czyStrzelac = true;
var i : int;

var Effect : Transform;
var hit : RaycastHit;
var ray : Ray;

//bron
var nazwa = [ 'Nóż', 'Glocky', 'Dubeltówka', 'Uzy', 'AKM-47', 'Shotgun', 'M16', 'Granatnik', 'Snajperka', 'Minigun' ];
var ammoMagaz = [	-1,	0,	0,	0,	0,	0,	0,	0,	0,	0];
var granatyMagaz = [ 0,	0,	0,	0,	0,	0,	0,	0,	0,	0];
var ammoSklad = [	0,	0,	0,	0,	0,	0,	0,	0,	0,	0];		
var granatySklad = [ 0,	0,	0,	0,	0,	0,	0,	0,	0,	0];
var ammoMax = [ 	-1,	19,	2,	20,	30,	5,	30,	0,	10,	1000];
var granatyMax = [ 0,	0,	0,	0,	0,	0,	1,	1,	0,	0];
var dostepnosc = [ true,	false,	false,	false,	false,	false,	false,	false,	false,	false];
var czasStrzalu = [ 1, 0.5,	0.5, 0.1, 0.1, 0.3,	0.1, 1,	3, 0.1];
var zwykly = [	'kontakt',	'strzal',	'srut',	'automat',	'automat',	'srut',	'automat',	'granat',	'strzal',	'automat'];
var special = [	'kontakt',	'burst',	'brak',	'burst',	'brak',		'brak',	'granat',	'brak',		'brak',		'brak'];
var zmWlasna = [	-1,	-1,	-1,	-1,	-1,	-1,	-1,	-1,	-1,	-1];

//modele-gra
var model0 : GameObject;
var model1 : GameObject;
var model2 : GameObject;
var model3 : GameObject;
var model4 : GameObject;
var model5 : GameObject;
var model6 : GameObject;
var model7 : GameObject;
var model8 : GameObject;
var model9 : GameObject;

//funkcje

function wybierzModel(x : int, logic : boolean)
{
	switch(x) {
		case 0:
			model0.SetActive(logic);
			break;
		case 1:
			model1.SetActive(logic);
			break;
		case 2:
			model2.SetActive(logic);
			break;
		case 3:
			model3.SetActive(logic);
			break;
		case 4:
			model4.SetActive(logic);
			break;
		case 5:
			model5.SetActive(logic);
			break;
		case 6:
			model6.SetActive(logic);
			break;
		case 7:
			model7.SetActive(logic);
			break;
		case 8:
			model8.SetActive(logic);
			break;
		case 9:
			model9.SetActive(logic);
			break;	
	}
}

function zmienSlot(x : int)
{
	wybierzModel(aktualna, false);
	aktualna = x;
	wybierzModel(aktualna, true);
}

function uaktywnijNaWejsciu()
{
	for (i=0;i < weaponscount;i++)
	{
		wybierzModel(i, false);
	}
		wybierzModel(aktualna, true);
}

function zmianaBroni()
{
	// num 1 - 9, 0
	if (Input.GetKeyDown(KeyCode.Alpha0) && dostepnosc[0] && (aktualna != 0))
	{
		zmienSlot(0);
	}
	if (Input.GetKeyDown(KeyCode.Alpha1) && dostepnosc[1] && (aktualna != 1))
	{
		zmienSlot(1);
	}
	if (Input.GetKeyDown(KeyCode.Alpha2) && dostepnosc[2] && (aktualna != 2))
	{
		zmienSlot(2);
	}
	if (Input.GetKeyDown(KeyCode.Alpha3) && dostepnosc[3] && (aktualna != 3))
	{
		zmienSlot(3);
	}
	if (Input.GetKeyDown(KeyCode.Alpha4) && dostepnosc[4] && (aktualna != 4))
	{
		zmienSlot(4);
	}
	if (Input.GetKeyDown(KeyCode.Alpha5) && dostepnosc[5] && (aktualna != 5))
	{
		zmienSlot(5);
	}
	if (Input.GetKeyDown(KeyCode.Alpha6) && dostepnosc[6] && (aktualna != 6))
	{
		zmienSlot(6);
	}
	if (Input.GetKeyDown(KeyCode.Alpha7) && dostepnosc[7] && (aktualna != 7))
	{
		zmienSlot(7);
	}
	if (Input.GetKeyDown(KeyCode.Alpha8) && dostepnosc[8] && (aktualna != 8))
	{
		zmienSlot(8);
	}
	if (Input.GetKeyDown(KeyCode.Alpha9) && dostepnosc[9] && (aktualna != 9))
	{
		zmienSlot(9);
	}
	// zmiana przez Q
	if (Input.GetKeyDown(KeyCode.Q))
	{
		i = 1;
		while ( dostepnosc[ ( aktualna + i ) % weaponscount ] == 0 )
		{
			i++;
		}
		if ( ( i % 10 ) )
		{
			zmienSlot( ( aktualna + i ) % weaponscount );
		}
	}
}

function strzel(obrazenia, zasieg)
{
	ray = Camera.main.ScreenPointToRay(Vector3(Screen.width*0.5, Screen.height*0.5, 0));
//	if (Input.GetMouseButtonDown(0))
	if (Physics.Raycast (ray, hit, zasieg))
	{
		var particleClone = Instantiate(Effect, hit.point, Quaternion.LookRotation(hit.normal));
		Destroy(particleClone.gameObject, 2);
		hit.transform.SendMessage("ApplyDammage", obrazenia, SendMessageOptions.DontRequireReceiver);
	}
}

function klawisze()
{
	if (Input.GetMouseButtonDown(0))
	{
//		zwykly[aktualna];
	}
//	if (Input.GetKeyDown(KeyCode.Mouse1))
//	{
//		
//	}	
}

function strzal(obrazenia, zasieg, czas)
{
	if (czyStrzelac)
	{
		strzel(obrazenia, zasieg);
		czyStrzelac = false;
		yield WaitForSeconds(czas);
		czyStrzelac = true;
	}
}

//function kontakt() {}
//function automat() {}
//function burst() {}
//function srut() {}
//function granat() {}

//Start
uaktywnijNaWejsciu();

//funkcja Update
function Update()
{
	zmianaBroni();
	klawisze();
}

//Uzbrojenie     (nazwa, model, ammoMax, granatyMax, dostepnosc, czasStrzalu, zwykly, specialny)
/*
var s = [
new _Bron("Nóż", Transform, -1, -1, 1, czasNoz, kontakt(obrNoz,2), kontakt(obrNoz*3,1.75)),
new _Bron("Glocky", Transform, 19, -1, 0, czasGlocky, strzal(obrGlocky, zasGlocky), burst(obrGlocky, zasGlocky, ileGlocky)),
new _Bron("Dubeltówka", Transform, 2, -1, 0, czasDbl, srut(obrDbl, zasDbl, rozDbl), srut(obrDbl*2, zasDbl, rozDbl*1.2)),
new _Bron("Uzy", Transform, 20, -1, 0, czasUzy, automat(obrUzy, zasUzy), burst(obrUzy, zasUzy, ileUzy)),
new _Bron("AKM-47", Transform, 30, -1, 0, czasAkm, automat(obrAkm, zasAkm), 0),
new _Bron("Shotgun", Transform, 5, -1, 0, czasSg, srut(obrSg, zasSgl, rozSgl), 0),
new _Bron("M16", Transform, 30, 1, 0, czasM16, automat(obrM16, zasM16), granatnik(obrGnd, zasGnd, czasGnd)),
new _Bron("Granatnik", Transform, -1, 1, 0, 0, granatnik(obrGnd, zasGnd, czasGnd), 0),
new _Bron("Snajperka", Transform, 10, -1, 0, czasSnp, strzal(obrSnp, zasSnp), 0),
new _Bron("Minigun", Transform, 1000, -1, 0, czasMng, automat(obrMng, zasMng), 0)
];*/

/*function _Bron(_nazwa, _model, _ammoMax, _granatyMax, _dostepnosc, _czasStrzalu, _zwykly, _specialny) {
    var nazwa = _nazwa;
    var model = _model;
    var ammoMagaz = 0;
    var granatyMagaz = 0;
    var ammoSklad = 0;
    var granatySklad = 0;
    var ammoMax = _ammoMax;
    var granatyMax = _granatyMax;
    var dostepnosc = _dostepnosc;
    var czasStrzalu = _czasStrzalu;
    var zwykly : function() = _zwykly;
    var specialny = _specialny;
//  this.przeladuj = function() {
//    	if (ammoMax > 0 && ammo < ammoMax)
//   	{
//    		if (ammoMax - ammoMagaz >= ammoSklad)
//    		{
//    			ammoMagaz += ammoSklad;
//  			ammoSklad = 0;
//  		}
//    		else
//    		{
//    			ammoMagaz = ammoMax;
//    			ammoSklad -= ammoMax;
//    		}
//    	}
//    };
}*/

//stale broni
/*
var obrNoz;
var zasNoz;
var czasNoz;

var obrGlocky;
var zasGlocky;
var ileGlocky;
var czasGlocky;

var obrDbl;
var zasDbl;
var rozDbl;
var czasDbl;

var obrUzy;
var zasUzy;
var ileUzy;
var czasUzy;

var obrAkm;
var zasAkm;
var czasAkm;

var obrSg;
var zasSg;
var rozSg;
var czasSg;

var obrM16;
var zasM16;
var czasM16;

var obrGnd;
var zasGnd;
var czasGnd;

var obrSnp;
var zasSnp;
var czasSnp;

var obrMng;
var zasMng;
var czasMng;*/