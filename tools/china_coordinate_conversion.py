import math

def gcj_to_wgs(lng,lat):
 def forward(lng,lat):
  x,y=lng-105,lat-35
  a=-100+2*x+3*y+.2*y*y+.1*x*y+.2*math.sqrt(abs(x))
  b=300+x+2*y+.1*x*x+.1*x*y+.1*math.sqrt(abs(x))
  a+=(20*math.sin(6*x*math.pi)+20*math.sin(2*x*math.pi))*2/3
  a+=(20*math.sin(y*math.pi)+40*math.sin(y/3*math.pi))*2/3
  a+=(160*math.sin(y/12*math.pi)+320*math.sin(y*math.pi/30))*2/3
  b+=(20*math.sin(6*x*math.pi)+20*math.sin(2*x*math.pi))*2/3
  b+=(20*math.sin(x*math.pi)+40*math.sin(x/3*math.pi))*2/3
  b+=(150*math.sin(x/12*math.pi)+300*math.sin(x/30*math.pi))*2/3
  rad=lat/180*math.pi;magic=1-.006693421622965943*math.sin(rad)**2
  a=a*180/((6378245*(1-.006693421622965943))/(magic*math.sqrt(magic))*math.pi)
  b=b*180/(6378245/math.sqrt(magic)*math.cos(rad)*math.pi)
  return lng+b,lat+a
 guesslng,guesslat=lng,lat
 for _ in range(6):
  flng,flat=forward(guesslng,guesslat);guesslng-=flng-lng;guesslat-=flat-lat
 return round(guesslng,6),round(guesslat,6)
