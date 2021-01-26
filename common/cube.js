function Cube(gl, size, vertexShaderId, fragmentShaderId) 
{
    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "cube-vertex-shader";
    var fragShdr = fragmentShaderId || "cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }
	
	//Makes the size work.
	size = size / 2;
	
    this.positions = { 
        values : new Float32Array([
			-size, -size, -size,//0 A
			-size, size, -size,	//1 B
			-size, size, size,	//2 C
			-size, -size, size,	//3 D
			size, -size, -size,	//4 E
			size, size, -size,	//5 F
			size, size, size,	//6 G
			size, -size, size	//7 H
		]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            0, 7, 3, 0, 4, 7, //Side AEHD
			4, 6, 7, 4, 5, 6, //Side EFGH
			5, 2, 6, 5, 1, 2, //Side FBCG
			1, 3, 2, 1, 0, 3, //Side BADC
			3, 7, 6, 2, 3, 6, //Side CDHG
			4, 1, 5, 4, 0, 1  //Side EABF
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};