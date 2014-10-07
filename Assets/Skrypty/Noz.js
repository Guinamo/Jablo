#pragma strict

//stale
var idle = "oczekiwanie";
var run = "sprint";
var lpm = "zamachniecie";

var TheDammage : int = 50;
var Distance : float;
var MaxDistance : float = 1.5;
var TheSystem : Transform;

function AttackDammage ()
{
		//Attack function
		var hit : RaycastHit;
		if (Physics.Raycast (TheSystem.transform.position, TheSystem.transform.TransformDirection(Vector3.forward), hit))
		{
			Distance = hit.distance;
			if (Distance < MaxDistance)
			{
				hit.transform.SendMessage("ApplyDammage", TheDammage, SendMessageOptions.DontRequireReceiver);
			}
		}
}

function Update()
{
	//Atak
	if (Input.GetButtonDown("Fire1"))
	{
		animation.Play(lpm);
		AttackDammage ();
	}
	
	//Poruszanie sie
	if (animation.isPlaying == false)
	{
		animation.CrossFade(idle);
	}
	
	if (Input.GetKey(KeyCode.LeftShift))
	{
		animation.CrossFade(run);
	}
	
	if (Input.GetKeyUp(KeyCode.LeftShift))
	{
		animation.CrossFade(idle);
	}
}