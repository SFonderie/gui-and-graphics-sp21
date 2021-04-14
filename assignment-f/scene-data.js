/*
Final Assignment, "Gimbal Loops", Sydney Fonderie
This is where I put all of information about the 
models in the scene.
*/

var Cylinders = {
	AxisA : {
		model : undefined,
		axis : [0, 0, 1],
		baseAngle : 0,
		timeScale : 1,
		translate : [0, 0, 0],
		scale : [1, 1, 1],
		color : [1, 1, 1, 1],
		children : [{
			type : "Sphere",
			name : "RootB"
		},{
			type : "Ring",
			name : "RingA"
		},{
			type : "Cylinder",
			name : "Gyro"
		},{
			type : "Cylinder",
			name : "Stick"
		}]
	},
	AxisB : {
		model : undefined,
		axis : [0, 0, 1],
		baseAngle : 0,
		timeScale : 1,
		translate : [0, 0, 0],
		scale : [1, 1, 1],
		color : [1, 1, 1, 1],
		children : [{
			type : "Sphere",
			name : "RootC"
		},{
			type : "Ring",
			name : "RingB"
		}]
	},
	AxisC : {
		model : undefined,
		axis : [0, 0, 1],
		baseAngle : 0,
		timeScale : 1,
		translate : [0, 0, 0],
		scale : [1, 1, 1],
		color : [1, 1, 1, 1],
		children : [{
			type : "Ring",
			name : "RingC"
		},{
			type : "Cylinder",
			name : "NibTop"
		},{
			type : "Cylinder",
			name : "NibDown"
		},{
			type : "Sphere",
			name : "TipTop"
		},{
			type : "Sphere",
			name : "TipDown"
		}]
	},
	Gyro : {
		model : undefined,
		axis : [0, 0, 1],
		baseAngle : 0,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [50, 50, 2],
		color : [0.85, 0.75, 0.25, 1],
		children : [{
			type : "Ring",
			name : "GyRing"
		}]
	},
	Stick : {
		model : undefined,
		axis : [0, 0, 1],
		baseAngle : 0,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [3, 3, 96],
		color : [0.5, 0.3, 0.1, 1],
		children : []
	},
	NibTop : {
		model : undefined,
		axis : [0, 0, 1],
		baseAngle : 0,
		timeScale : 0,
		translate : [0, 0, 120],
		scale : [4, 4, 20],
		color : [0.85, 0.85, 0.85, 1],
		children : []
	},
	NibDown : {
		model : undefined,
		axis : [0, 0, 1],
		baseAngle : 0,
		timeScale : 0,
		translate : [0, 0, -120],
		scale : [4, 4, 20],
		color : [0.85, 0.85, 0.85, 1],
		children : []
	},
};

var Spheres = {
	RootM : {
		model : undefined,
		axis : [1, 6, 1],
		baseAngle : 90,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [0.1, 0.1, 0.1],
		color : [1, 1, 1, 1],
		children : [{
			type : "Sphere",
			name : "RootA"
		}]
	},
	RootA : {
		model : undefined,
		axis : [1, 0, 0],
		baseAngle : 90,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [1, 1, 1],
		color : [1, 1, 1, 1],
		children : [{
			type : "Cylinder",
			name : "AxisA"
		}]
	},
	RootB : {
		model : undefined,
		axis : [1, 0, 0],
		baseAngle : 90,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [1, 1, 1],
		color : [1, 1, 1, 1],
		children : [{
			type : "Cylinder",
			name : "AxisB"
		}]
	},
	RootC : {
		model : undefined,
		axis : [1, 0, 0],
		baseAngle : 90,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [1, 1, 1],
		color : [1, 1, 1, 1],
		children : [{
			type : "Cylinder",
			name : "AxisC"
		}]
	},
	TipTop : {
		model : undefined,
		axis : [1, 0, 0],
		baseAngle : 0,
		timeScale : 0,
		translate : [0, 0, 140],
		scale : [8, 8, 8],
		color : [1, 1, 1, 1],
		children : []
	},
	TipDown : {
		model : undefined,
		axis : [1, 0, 0],
		baseAngle : 0,
		timeScale : 0,
		translate : [0, 0, -140],
		scale : [8, 8, 8],
		color : [1, 1, 1, 1],
		children : []
	},
};

var Rings = {
	RingA : {
		model : undefined,
		axis : [0, 1, 0],
		baseAngle : 90,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [100, 100, 10],
		color : [0.7, 0.7, 0.7, 1],
		radius : 0.95,
		children : []
	},
	RingB : {
		model : undefined,
		axis : [0, 1, 0],
		baseAngle : 90,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [105, 105, 10],
		color : [0.8, 0.8, 0.8, 1],
		radius : 0.95,
		children : []
	},
	RingC : {
		model : undefined,
		axis : [0, 1, 0],
		baseAngle : 90,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [110, 110, 10],
		color : [0.9, 0.9, 0.9, 1],
		radius : 0.95,
		children : []
	},
	GyRing : {
		model : undefined,
		axis : [1, 0, 0],
		baseAngle : 0,
		timeScale : 0,
		translate : [0, 0, 0],
		scale : [1.2, 1.2, 3],
		color : [0.9, 0.8, 0.3, 1],
		radius : 0.8,
		children : []
	},
};
