---
title: "Levenshtein Distance Algorithm: TSQL Implementation"
template: page.jade
---

by Joseph Gama

	CREATE function LEVENSHTEIN( @s varchar(50), @t
	varchar(50) ) 
	--Returns the Levenshtein Distance between strings s1
	and s2.
	--Original developer: Michael Gilleland   
	http://www.merriampark.com/ld.htm
	--Translated to TSQL by Joseph Gama
	returns varchar(50)
	as
	BEGIN
	DECLARE @d varchar(100), @LD int, @m int, @n int, @i
	int, @j int,
	@s_i char(1), @t_j char(1),@cost int
	--Step 1
	SET @n=LEN(@s)
	SET @m=LEN(@t)
	SET @d=replicate(CHAR(0),100)
	If @n = 0
		BEGIN
		SET @LD = @m
		GOTO done
		END
	If @m = 0
		BEGIN
		SET @LD = @n
		GOTO done
		END
	--Step 2
	SET @i=0
	WHILE @i<=@n
		BEGIN
		SET @d=STUFF(@d,@i+1,1,CHAR(@i))--d(i, 0) = i
		SET @i=@i+1
		END

	SET @i=0
	WHILE @i<=@m
		BEGIN
		SET @d=STUFF(@d,@i*(@n+1)+1,1,CHAR(@i))--d(0, j) = j
		SET @i=@i+1
		END
	--goto done
	--Step 3
		SET @i=1
		WHILE @i<=@n
			BEGIN
			SET @s_i=(substring(@s,@i,1))
	--Step 4
		SET @j=1
		WHILE @j<=@m
			BEGIN
			SET @t_j=(substring(@t,@j,1))
			--Step 5
			If @s_i = @t_j
				SET @cost=0
			ELSE
				SET @cost=1
	--Step 6
			SET @d=STUFF(@d,@j*(@n+1)+@i+1,1,CHAR(dbo.MIN3(
			ASCII(substring(@d,@j*(@n+1)+@i-1+1,1))+1,
			ASCII(substring(@d,(@j-1)*(@n+1)+@i+1,1))+1,
			ASCII(substring(@d,(@j-1)*(@n+1)+@i-1+1,1))+@cost)
			))
			SET @j=@j+1
			END
		SET @i=@i+1
		END      
	--Step 7
	SET @LD = ASCII(substring(@d,@n*(@m+1)+@m+1,1))
	done:
	--RETURN @LD
	--I kept this code that can be used to display the
	matrix with all calculated values
	--From Query Analyser it provides a nice way to check
	the algorithm in action
	--
	RETURN @LD
	--declare @z varchar(255)
	--set @z=''
	--SET @i=0
	--WHILE @i<=@n
	--	BEGIN
	--	SET @j=0
	--	WHILE @j<=@m
	--		BEGIN
	--		set
	@z=@z+CONVERT(char(3),ASCII(substring(@d,@i*(@m+1
	)+@j+1 ,1)))
	--		SET @j=@j+1 
	--		END
	--	SET @i=@i+1
	--	END
	--print dbo.wrap(@z,3*(@n+1))
	END








<!--
     FILE ARCHIVED ON 8:45:20 May 26, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 3:46:13 Feb 10, 2013.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
-->
