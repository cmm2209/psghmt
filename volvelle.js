var n=0,rotINT
function rotateDIV()
{
x=document.getElementById("inner-volvelle")
clearInterval(rotINT)
rotINT=setInterval("startRotate()",10)
}
function startRotate()
{
n=n+1
x.style.transform="rotate(" + n + "deg)"
x.style.webkitTransform="rotate(" + n + "deg)"
x.style.OTransform="rotate(" + n + "deg)"
x.style.MozTransform="rotate(" + n + "deg)"
if (n==8 || n==15 || n==23 || n==30 || n==38 || n==45 || n==53 || n==60 || n==68 || n==75 || n==83 || n==90 || n==98 || n==105 || n==113 || n==120 || n==128 || n==135 || n==143 || n==150 || n==158 || n==165 || n==173 || n==180 || n==188 || n==195 || n==203 || n==210 || n==218 || n==225 || n==233 || n==240 || n==248 || n==255 || n==263 || n==270 || n==278 || n==285 || n==293 || n==300 || n==308 || n==315 || n==323 || n==330 || n==338 || n==345 || n==353 || n==360)
{
clearInterval(rotINT)
if (n==360){n=0}
}
}
