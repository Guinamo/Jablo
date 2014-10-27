#pragma strict

var theDoor : Transform;
private var doorIsClosed = true;

function OnTriggerEnter (theCollider : Collider)
{
	if (theCollider.tag == "Player")
	{
		theDoor.animation.CrossFade("Otwieranie");
		//theDoor.audio.PlayOneShot();
	}
}

function OnTriggerExit (theCollider : Collider)
{
	if (theCollider.tag == "Player")
	{
		theDoor.animation.CrossFade("Zamykanie");
		//theDoor.audio.Play();
	}
}