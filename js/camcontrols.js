// Free Cam
// Characterized by:
//  origin
//  radial distance r (from origin)
//  angles theta (0-pi), phi (0-2pi)
// Angles signify rotation about origin.
// Origin can move by panning with MMB. Rotate w/ LMB. Camera always
// looks at origin.
var FreeCam = 0;
// Cyl Cam - moves on the surface of a cylinder and pivots around that point
// Characterized by:
//  radius of rail r
//  angle around rail phi
//  z (vertical displacement of rail, may not use)
//  origin pivot params or, otheta, ophi (around camera's location on rail)
// Camera's position on rail is set w/ MMB. Camera's rotation around pivot
// is set w/ LMB; this moves the origin and tells camera to look at it. Zooming
// adds a displacement vector to camera and origin, which rotates w/ phi.
var CylCam = 1;

epsilon = .01;
function initCam(type) {

  if (type==FreeCam) {
    return {
      type: FreeCam,
      r: 20,
      phi: Math.PI/2,
      theta: Math.PI/2,
      rRate: 1,
      thetaRate: -3,
      phiRate: 3,
      xPanRate: 2.5,
      yPanRate: 2.5,
      thetaLL: epsilon,
      thetaUL: Math.PI-epsilon,
      rLL: epsilon,
      origin: new THREE.Vector3(0,0,0)
    };
  }
  if (type==CylCam) {
    return {
      type: CylCam,
      r: 15,
      phi: Math.PI/2,
      z: -2, // may not use
      or: 1,
      otheta: Math.PI/2,
      ophi: Math.PI,
      rRate: 1,
      phiRate: 1,
      zRate: 1,
      othetaRate: -0.5,
      ophiRate: -0.5,
      xPanRate: 2.5,
      yPanRate: 2.5,
      othetaLL: epsilon,
      othetaUL: Math.PI-epsilon,
      rLL: epsilon,
      origin: new THREE.Vector3(0,0,0)
    };
  }
}

function positionCamera(cam, camera) {
  if (cam.type==FreeCam) {
    camera.position.x = cam.r * Math.cos(cam.phi) * Math.sin(cam.theta) + cam.origin.x;
    camera.position.z = cam.r * Math.sin(cam.phi) * Math.sin(cam.theta) + cam.origin.z;
    camera.position.y = cam.r * Math.cos(cam.theta) + cam.origin.y;
    camera.lookAt(cam.origin);
  }
  if (cam.type==CylCam) {
    camera.position.x = cam.r * Math.cos(cam.phi);
    camera.position.z = cam.r * Math.sin(cam.phi);
    camera.position.y = cam.z;
    cam.origin.x = cam.or * Math.cos(cam.ophi) * Math.sin(cam.otheta);
    cam.origin.z = cam.or * Math.sin(cam.ophi) * Math.sin(cam.otheta);
    cam.origin.y = cam.or * Math.cos(cam.otheta);
    cam.origin.applyAxisAngle(new THREE.Vector3(0,1,0),-cam.phi);
    cam.origin.add(camera.position);
    camera.lookAt(cam.origin);
  }
}

function handleLMB(cam, dX, dY) {
  if (cam.type==FreeCam) {
    cam.theta += cam.thetaRate * dY;
    if (cam.theta < cam.thetaLL) cam.theta = cam.thetaLL;
    if (cam.theta > cam.thetaUL) cam.theta = cam.thetaUL;
    cam.phi += cam.phiRate * dX;
  }
  if (cam.type==CylCam) {
    cam.otheta += cam.othetaRate * dY;
    if (cam.otheta < cam.othetaLL) cam.otheta = cam.othetaLL;
    if (cam.otheta > cam.othetaUL) cam.otheta = cam.othetaUL;
    cam.ophi += cam.ophiRate * dX;
    console.log(cam.origin, camera.position);
  }
}

function handleMMB(cam, dX, dY) {
  if (cam.type==FreeCam) {
    // Not obvious:
    // default plane (theta=phi=0) is Y up, Z right, so put displacement
    // vector in that plane, rotate around Z to adjust for theta,
    // then rotate around Y to adjust for phi
    var displacement = new THREE.Vector3(0, dY*cam.yPanRate, dX*cam.xPanRate);
    displacement.applyAxisAngle(new THREE.Vector3(0,0,-1),Math.PI/2-cam.theta);
    displacement.applyAxisAngle(new THREE.Vector3(0,1,0),cam.phi);
    displacement.x *= -1; // minus is necessary for some reason
    cam.origin.add(displacement);
  }
  if (cam.type==CylCam) {
    cam.phi += cam.phiRate * dX;
  }
}

function handleWheel(cam, d) {
  if (cam.type==FreeCam) {
    cam.r += (d>0)?cam.rRate:(-1*cam.rRate);
    if (cam.r<cam.rLL) cam.r = cam.rLL;
  }
}