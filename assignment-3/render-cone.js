/*Assignment 3, Sydney Fonderie*/

var gl = null; //Graphics context.
var cone = null; //Cone object.

function init()
{
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	if (!gl)
	{
		alert("Unable to setup WebGL.");
		return;
	}
	
	cone = new Cone(gl, 24, "cone-vertex-shader", "cone-fragment-shader");
	
	render();
}

function render()
{
	cone.render();
}

window.onload = init;
