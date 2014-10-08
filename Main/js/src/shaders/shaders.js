Shaders = {
  
  /* ------------------------------------------------------------- */
  // box blur scaled to depth map
  /* ------------------------------------------------------------- */

  "boxDOF": {

    uniforms: {
      tDiffuse: { type: "t", value: 0, texture: null },
      tDepth:   { type: "t", value: 1, texture: null },
      focus:    { type: "f", value: 1.0 },
      maxblur:  { type: "f", value: 1.0 },
      h:        { type: "f", value: 1.0/512.0 },
      v:        { type: "f", value: 1.0/512.0 }
    },

    vertexShader: [

      "varying vec2 vUv;",

      "void main() {",

        "vUv = vec2( uv.x, 1.0 - uv.y );",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

      "}"

    ].join("\n"),

    fragmentShader: [
      "#define RADIUS 4.0",

      "uniform sampler2D tDiffuse;",
      "uniform sampler2D tDepth;",
      "uniform float focus;",
      "uniform float maxblur;",
      "uniform float h;",
      "uniform float v;",

      "varying vec2 vUv;",

      "void main() {",
      "  vec4 sum = vec4( 0.0 );",
      
      "  float hf = h * maxblur * abs(texture2D(tDepth, vUv).x - focus);",
      "  float vf = v * maxblur * abs(texture2D(tDepth, vUv).x - focus);",
      
      "  for (float x = -RADIUS; x <= RADIUS; x++) ",
      "  for (float y = -RADIUS; y <= RADIUS; y++) ",
      "  {",
      "    float ux = vUv.x + x * hf;",
      "    float uy = vUv.y + y * vf;",
      
      "    sum += texture2D( tDiffuse, vec2( ux, uy ) );",
      "  }",

      "  gl_FragColor = sum/81.0;",
      "}"

    ].join("\n")

  },

  /* ------------------------------------------------------------- */
  // two-pass Gaussian blur, scaled to depth map
  /* ------------------------------------------------------------- */

  'hDOF': {

    uniforms: {

      tDiffuse: { type: "t", value: 0, texture: null },
      tDepth:   { type: "t", value: 1, texture: null },
      focus:    { type: "f", value: 1.0 },
      maxblur:  { type: "f", value: 1.0 },
      h:        { type: "f", value: 1.0 / 512.0 }

    },

    vertexShader: [

      "varying vec2 vUv;",

      "void main() {",

        "vUv = vec2( uv.x, 1.0 - uv.y );",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

      "}"

    ].join("\n"),

    fragmentShader: [

      "uniform sampler2D tDiffuse;",
      "uniform sampler2D tDepth;",
      "uniform float focus;",
      "uniform float maxblur;",
      "uniform float h;",

      "varying vec2 vUv;",

      "void main() {",

        "float hf = h * maxblur * abs(texture2D(tDepth, vUv).x - focus);",

        "vec4 sum = vec4( 0.0 );",

        "sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hf, vUv.y ) ) * 0.051;",
        "sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hf, vUv.y ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hf, vUv.y ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hf, vUv.y ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x,            vUv.y ) ) * 0.1633;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hf, vUv.y ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hf, vUv.y ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hf, vUv.y ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hf, vUv.y ) ) * 0.051;",

        "gl_FragColor = sum;",

      "}"


    ].join("\n")

  },

  'vDOF': {

    uniforms: {

      tDiffuse: { type: "t", value: 0, texture: null },
      tDepth:   { type: "t", value: 1, texture: null },
      focus:    { type: "f", value: 1.0 },
      maxblur:  { type: "f", value: 1.0 },
      v:        { type: "f", value: 1.0 / 512.0 }

    },

    vertexShader: [

      "varying vec2 vUv;",

      "void main() {",

        "vUv = vec2( uv.x, 1.0 - uv.y );",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

      "}"

    ].join("\n"),

    fragmentShader: [

      "uniform sampler2D tDiffuse;",
      "uniform sampler2D tDepth;",
      "uniform float focus;",
      "uniform float maxblur;",
      "uniform float v;",

      "varying vec2 vUv;",

      "void main() {",

        "float vf = v * maxblur * abs(texture2D(tDepth, vUv).y - focus);",

        "vec4 sum = vec4( 0.0 );",

        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vf ) ) * 0.051;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vf ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vf ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vf ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y            ) ) * 0.1633;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vf ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vf ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vf ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vf ) ) * 0.051;",

        "gl_FragColor = sum;",

      "}"


    ].join("\n")

  },

};