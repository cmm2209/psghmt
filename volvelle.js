var n=0,rotINT
function rotate(direction)
{  
x=document.getElementById("inner-volvelle")
clearInterval(rotINT)
if (direction>0) {
rotINT=setInterval("startRotate(1)",10);
}
  else {
rotINT=setInterval("startRotate(-1)",10);
  }
}
function startRotate(dir)
{ 
  if (dir>0) {
n=n+0.5    
x.style.transform="rotate(" + n + "deg)"
x.style.webkitTransform="rotate(" + n + "deg)"
x.style.OTransform="rotate(" + n + "deg)"
x.style.MozTransform="rotate(" + n + "deg)"
if (n==360){n=0};
}
  else {
if (n==0){n=360}
n=n-0.5    
x.style.transform="rotate(" + n + "deg)"
x.style.webkitTransform="rotate(" + n + "deg)"
x.style.OTransform="rotate(" + n + "deg)"
x.style.MozTransform="rotate(" + n + "deg)";    
  }  
if (n==7.5 || n==15 || n==22.5 || n==30 || n==37.5 || n==45 || n==52.5 || n==60 || n==67.5 || n==75 || n==82.5 || n==90 || n==97.5 || n==105 || n==112.5 || n==120 || n==127.5 || n==135 || n==142.5 || n==150 || n==157.5 || n==165 || n==172.5 || n==180 || n==187.5 || n==195 || n==202.5 || n==210 || n==217.5 || n==225 || n==232.5 || n==240 || n==247.5 || n==255 || n==262.5 || n==270 || n==277.5 || n==285 || n==292.5 || n==300 || n==307.5 || n==315 || n==322.5 || n==330 || n==337.5 || n==345 || n==352.5 || n==360)
{
clearInterval(rotINT)
}  
}
