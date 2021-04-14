/*
Final Assignment, "Gimbal Loops", Sydney Fonderie
This file was adapted from the "sphere.js" file to enable
the rendering of a ring shape.
*/

"use strict";

function Ring(stacks, slices, radius, vertexShader, fragmentShader)
{ 
    var i, j;
	
    var program = initShaders(gl, vertexShader || "object-vertex-shader", fragmentShader || "object-fragment-shader");
	
	var height = 1.0;
	var nStacks = stacks || 1;
    var nSlices = slices || 20;
	var iRadius = radius || 0.8;
	var dZ = height / (nStacks + 1);
    var dTheta = 2.0 * Math.PI / nSlices;
	
	//Add vertices.
    var positions = [];
	
	//Create the vertices and put them in
	//the right locations. This renders up
	//the outer vertices of the ring.
    for (j = 0; j < nStacks + 2; j++)
	{
        var z = j * dZ - (height / 2);
		
        for (i = 0; i < nSlices; i++)
		{
            var theta = i * dTheta;
            var x = Math.cos(theta);
            var y = Math.sin(theta);
			
            positions.push(x, y, z);
        }
    }
	
	//This for loop creates the inner
	//vertices of the ring, rendering
	//down so that there is an n-shaped
	//render path.
	for (j = 0; j < nStacks + 2; j++)
	{
        var z = (height / 2) - (j * dZ);
		
        for (i = 0; i < nSlices; i++)
		{
            var theta = i * dTheta;
            var x = iRadius * Math.cos(theta);
            var y = iRadius * Math.sin(theta);
			
            positions.push(x, y, z);
        }
    }
	
	//Add indices.
    var indices = [];
    var drawCalls = [];
	
	//These variables serve to offset
	//the index count so that we can
	//render in batches.
    var start = indices.length;
    var offset = start * 2;
	
    var n = 0; //Previous index tracker.
    var m = 0; //Current index tracker.
	
	//This loop renders the triangles between
	//each line of vertices.
    for (j = 0; j < ( ( nStacks + 1 ) * 2 ) + 1; j++)
	{
        for (i = 0; i < nSlices; i++)
		{
            m = n + i; //Column to render.
            indices.push(m);				//0     1     2  ...  n-1	<- Strip
            indices.push(m + nSlices);		//n    n+1   n+2 ... 2n-1	<- Next strip
        }
		
		//Finish the strip by
		//inserting the start.
        indices.push(n);					//0
        indices.push(n + nSlices);			//n
		
		//Increment for the next
		//strip of triangles.
        n += nSlices;
		
		//Push the strip into the draw call.
        drawCalls.push({
            type: gl.TRIANGLE_STRIP,
            count: indices.length - start,
            offset: offset
        });
		
		//Reset the offsets.
        start = indices.length;
        offset = start * 2;
    }
	
	//Now for the last strip, which connects from
	//the last row of vertices to the first.
	for (i = 0; i < nSlices; i++)
	{
		m = i;
		indices.push(m + n);
		indices.push(m);
    }
	
    indices.push(n);
    indices.push(0);
	
	n += nSlices;
	
	drawCalls.push({
        type: gl.TRIANGLE_STRIP,
        count: indices.length - start,
        offset: offset
    });
	
    start = indices.length;
    offset = start * 2;
	
	//NOW THE WEBGL STUFF
	
    var vPosition = {
        numComponents: 3,
        buffer: gl.createBuffer(),
        location: gl.getAttribLocation(program, "vPosition")
    };
	
    gl.bindBuffer(gl.ARRAY_BUFFER, vPosition.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	
    var elementArray = {
        buffer: gl.createBuffer()
    };
	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArray.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
    this.PointMode = false;
    this.program = program;
	
    this.render = function ()
	{
        gl.useProgram(program);
		
		gl.enableVertexAttribArray(vPosition.location);
        gl.bindBuffer(gl.ARRAY_BUFFER, vPosition.buffer);
        gl.vertexAttribPointer(vPosition.location, vPosition.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
		
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArray.buffer);
		
        for (i = 0; i < drawCalls.length; ++i )
		{
            var p = drawCalls[i];
            gl.drawElements(this.PointMode ? gl.POINTS : p.type, p.count, gl.UNSIGNED_SHORT, p.offset);
        }
    };
};
