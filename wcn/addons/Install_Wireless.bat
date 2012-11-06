@echo off

REM
REM  Batch file is originally from the cyborgworkshop.org
REM  http://cyborgworkshop.org/2009/07/30/
REM

SET CUR_DIR=%cd%
subst z: “%CUR_DIR%”
chdir /D Z:
Z:\setupSNK.exe

REM  Hopefully setupsnk gets done in time

sleep 60
subst /D Z:
