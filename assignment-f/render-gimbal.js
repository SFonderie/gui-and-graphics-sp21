/*
Final Assignment, "Gimbal Loops", Sydney Fonderie
This file has been adapted from the "solar.js" file
to handle the rendering of different object types.
*/

//Canvas reference.
var canvas;

//Renderer reference.
var gl;

//View offset matrix.
var ViewOffset;

//Perspective matrix.
var Perspective;

//Clipping plane bounds.
var near = 10;
var far = 60;

//Time variables.
var time = 0.0;
var timeDelta = 0.5;

var slider1;
var slider2;
var slider3;

var sVal1 = 0;
var sVal2 = 0;
var sVal3 = 0;

var rAngle1 = 0;
var rAngle2 = 0;
var rAngle3 = 0;

function init() 
{
	//Establish a WebGL renderer on the Canvas.
	canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	//Checks to make sure the WebGL renderer was created.
	if (!gl) { alert("WebGL initialization failed"); }
	
	//Set a default color for the background.
	gl.clearColor(0.1, 0.1, 0.1, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	//Handles the model setup for all Cylinder objects.
	for(var name in Cylinders)
	{
		var cylinder = Cylinders[name].model = new Cylinder();
		
		cylinder.uniforms = {
			color : gl.getUniformLocation(cylinder.program, "color"),
			ModelView : gl.getUniformLocation(cylinder.program, "ModelView"),
			Perspective : gl.getUniformLocation(cylinder.program, "Perspective"),
		};
	}
	
	//Handles the model setup for all Sphere objects.
	for(var name in Spheres)
	{
		var sphere = Spheres[name].model = new Sphere();
		
		sphere.uniforms = {
			color : gl.getUniformLocation(sphere.program, "color"),
			ModelView : gl.getUniformLocation(sphere.program, "ModelView"),
			Perspective : gl.getUniformLocation(sphere.program, "Perspective"),
		};
	}
	
	//Handles the model setup for all Ring objects.
	for(var name in Rings)
	{
		var ring = Rings[name].model = new Ring(1, 50, Rings[name].radius);
		
		ring.uniforms = {
			color : gl.getUniformLocation(ring.program, "color"),
			ModelView : gl.getUniformLocation(ring.program, "ModelView"),
			Perspective : gl.getUniformLocation(ring.program, "Perspective"),
		};
	}
	
	slider1 = document.getElementById("slider-1");
	slider2 = document.getElementById("slider-2");
	slider3 = document.getElementById("slider-3");
	
	sVal1 = slider1.value;
	sVal2 = slider2.value;
	sVal3 = slider3.value;
	
	slider1.oninput = function() { sVal1 = this.value; }
	slider2.oninput = function() { sVal2 = this.value; }
	slider3.oninput = function() { sVal3 = this.value; }
	
	resize();
	
	window.requestAnimationFrame(render);
}

function render()
{
	time += timeDelta;
	
	var aMultiplier = 0.01;
	rAngle1 += sVal1 * timeDelta * aMultiplier;
	rAngle2 += sVal2 * timeDelta * aMultiplier;
	rAngle3 += sVal3 * timeDelta * aMultiplier;
	
	var matrixStack = new MatrixStack();
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	//Moves the camera back to center the scene 
	//between the near and far clipping planes.
	ViewOffset = translate(0.0, 0.0, -0.5*(near + far));
	matrixStack.load(ViewOffset);
	
	//DrawObject(Cylinders["Root"], matrixStack);
	DrawObject(Spheres["RootM"], matrixStack);
	
	window.requestAnimationFrame(render);
}

//Renders the given item using the given matrix
//stack, and renders in points if so desired.
function DrawObject(data, matrixStack, pointMode, rAngle, useAngle)
{
	if (!pointMode) { pointMode = false; }
	if (!useAngle) { useAngle = false; }
	data.model.PointMode = pointMode;
	
	//Inherit matrices.
	matrixStack.push();
	
	if(useAngle)
	{
		matrixStack.rotate(data.baseAngle + rAngle, data.axis);
	} 
	else
	{
		matrixStack.rotate(data.baseAngle + (data.timeScale * time), data.axis);
	}
	
	//Apply transformation matrices using data.
	matrixStack.translate(data.translate[0], data.translate[1], data.translate[2]);
	matrixStack.scale(data.scale[0], data.scale[1], data.scale[2]);
	
	//Set the program.
	gl.useProgram(data.model.program);
	
	//Pass in matrix information.
	gl.uniformMatrix4fv(data.model.uniforms.ModelView, false, flatten(matrixStack.current()));
	gl.uniformMatrix4fv(data.model.uniforms.Perspective, false, flatten(Perspective));
	gl.uniform4fv(data.model.uniforms.color, flatten(data.color));
	
	//Actually render.
	data.model.render();
	
	//Handle child objects.
	for (var i = 0; i < data.children.length; i++)
	{
		switch(data.children[i].type)
		{
			case "Cylinder":
				if(data.children[i].name == "AxisA"){ DrawObject(Cylinders[data.children[i].name], matrixStack, pointMode, rAngle1, true); }
				else if(data.children[i].name == "AxisB"){ DrawObject(Cylinders[data.children[i].name], matrixStack, pointMode, rAngle2, true); }
				else if(data.children[i].name == "AxisC"){ DrawObject(Cylinders[data.children[i].name], matrixStack, pointMode, rAngle3, true); }
				else { DrawObject(Cylinders[data.children[i].name], matrixStack, pointMode); }
				break;
			case "Sphere": DrawObject(Spheres[data.children[i].name], matrixStack, pointMode); break;
			case "Ring": DrawObject(Rings[data.children[i].name], matrixStack, pointMode); break;
		}
	}
	
	//Clear the stack.
	matrixStack.pop();
}

function resize()
{
	var w = canvas.clientWidth;
	var h = canvas.clientHeight;
	
	gl.viewport(0, 0, w, h);
	
	var fovy = 75.0;
	var aspect = w / h;
	
	Perspective = perspective(fovy, aspect, near, far);
}

window.onload = init;
window.onresize = resize;