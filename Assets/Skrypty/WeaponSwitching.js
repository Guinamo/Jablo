#pragma strict

//stale
var weaponscount = 10;

//liczniki
var i : int;

//zmienne
var aktualna : int = 0;
var weapon;
var slot : GameObject[];
var ammo = [-1,-1,0,0,0,0,0,0,0,0];
var dostepnosc = [1,1,1,1,1,1,1,1,1,1];

//funkcje

function zmienSlot(x : int)
{
	slot[aktualna].SetActive(false);
	aktualna = x;
	slot[aktualna].SetActive(true);
}

function uaktywnijNaWejsciu()
{
	for (i=0;i<weaponscount;i++)
	{
		slot[i].SetActive(false);
	}
		slot[aktualna].SetActive(true);
}

//Start

uaktywnijNaWejsciu();

//funkcja Update
function Update()
{
	// num 1 - 9, 0
	if (Input.GetKeyDown(KeyCode.Alpha0) && (aktualna != 0))
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
		while ( !dostepnosc[ ( aktualna + i ) % weaponscount ] )
		{
			i++;
		}
		if ( ( i % 10 ) )
		{
			zmienSlot( ( aktualna + i ) % weaponscount );
		}
	}
}