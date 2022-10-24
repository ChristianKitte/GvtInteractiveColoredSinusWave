const vertexShaderSource = `#version 300 es  
    
    in vec2 aPosition;
    in vec4 aColor;
    
    //in float aSize;
    
    out vec4 vColor;
    
    void main()
    {
        vColor = aColor;
        
        gl_Position=vec4(aPosition, 0.0, 365);
        gl_PointSize=1.0;       
    }
`;

const fragmentShaderSouce = `#version 300 es
    
    precision mediump float;

    in vec4 vColor;
    
    out vec4 fragColor;

    void main()
    {        
        fragColor=vColor;
        //fragColor=vec4(1.0, 0.0, 0.0, 1.0);
    }
`;