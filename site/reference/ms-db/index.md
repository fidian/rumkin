---
title: Access and MSSQL
summary: Little functions and bits of code for Microsoft Access and Microsoft SQL Server.
---

While working in Microsoft Access and Microsoft SQL Server, I needed a few things to make my work day a little easier.  I've got them listed here to help you out too.


Access Module: List Connections
-------------------------------

I was trying to set up a proper DSN to a FoxPro table and was having a difficult time about it.  If you can not find any help at [ConnectionStrings.com](http://www.connectionstrings.com), which would be rare, then this module will help you out.  First, make a connection to the desired target in an Access database (not a project).  Then, make a new module with this code in it.

    Sub ListConnections()
        Dim TD As TableDef
        Debug.Print CurrentDb.TableDefs.Count & " TableDefs in " & CurrentDb.Name
        For Each TD In CurrentDb.TableDefs
            Debug.Print "[" & TD.Name & "]"
            Debug.Print "  Connection String:  " & TD.Connect
            Debug.Print "  Source table:  " & TD.SourceTableName
        Next TD
    End Sub

Move your cursor to be in the function and hit the play button.  All of the connection strings that are in your database will be shown in the debug window.


Access Module:  Strip Everything Except Numbers
-----------------------------------------------

There were some fields that contained both numbers and letters, but all I wanted were the numbers.  I created a module and added this function to it.

    Public Function StripValues(selection)
      Dim sValue
      Dim rValue As Object

      If (IsNull(selection)) Then
        StripValues = "0"
        Exit Function
      End If

      Set rValue = CreateObject("VBScript.RegExp")
      rValue.Global = True
      rValue.IgnoreCase = True

      'strip the numbers off
      rValue.Pattern = "(\D*)"
      sValue = rValue.Replace(selection, "")
      If (sValue = "") Then
        sValue = "0"
      End If
      StripValues = sValue
    End Function

Now, you can use `StripValues()` in your SQL statements, as in `select id, StripValues(itemcode) from items` and get the numbers you are seeking.


SQL Server:  CPU Usage
----------------------

One day our SQL server was acting up.  We needed to see what was going on and what was chewing up all of the time.  The below code will get a snapshot of what was going on, wait 10 seconds, then compare the current activity to what was happening in order to determine how much CPU time was spent for the various tasks.

    use master
    select spid, login_time, cpu into #before
        from dbo.sysprocesses

    waitfor delay '00:00:10'

    select a.spid, (a.cpu - b.cpu) as cpu, rtrim(hostname) as hostname,
        rtrim(program_name) as program_name, loginame, cmd
        from dbo.sysprocesses as a inner join #before as b
            on a.spid = b.spid and a.login_time = b.login_time
        order by cpu desc

    drop table #before

This code will not work well if the server is being chewed away by lots of little processes that get done in under 10 seconds.  It is only good for those long queries that build massive tables and manipulate data for extended periods of time.


SQL Server:  Find Table
-----------------------

This slightly longer snippet will iterate through all of the databases in the system and will look for a database name that contains "asdf" (I expect you to change that part in the code).  This was written because we had access to a large system with thousands of tables in the various different databases, and we were looking for a table.  We didn't know the full name, so that made our search even more difficult.

    set nocount on

    declare @dbname as varchar(8000)
    declare @tblname as varchar(8000)
    declare @sql as varchar(8000)

    declare cursor1 Cursor for
    select name from master.dbo.sysdatabases

    open cursor1

    Fetch Next From Cursor1 Into @dbname

    --  Loop thru cursor
    While @@FETCH_STATUS = 0
    Begin
        set @sql = 'declare cursor2 cursor for select name from [' + @dbname + '].dbo.sysobjects'
        set @sql = @sql + ' where type = ''U'' and name like ''%asdf%'''

        exec(@sql)
        open cursor2

        fetch next from cursor2 into @tblname
        while @@FETCH_STATUS = 0
        begin
            print @dbname + '.' + @tblname
            fetch next from cursor2 into @tblname
        end

        close cursor2
        deallocate cursor2

        --Get the next record in the cursor
        Fetch Next From Cursor1 into @dbname
    End

    Close Cursor1
    Deallocate Cursor1
    set nocount off

You might need special permissions on the server in order for this code to work, but then again, if you need this code to work, you should probably already have the permissions.


SQL Server:  Shrink All Databases
---------------------------------

If your SQL server is running out of space and you need to delete some files to just get some more available hard drive real estate, you might run through all of the databases on your SQL server and shrink them and truncate the logs.  This code does that for you on all databases.

    use master

    set nocount on

    declare @dbname as varchar(8000)
    declare @sql as varchar(8000)
    declare @filname as varchar(8000)

    declare cursor1 Cursor for
    select name from sysdatabases

    open cursor1

    Fetch Next From Cursor1 Into @dbname

    --  Loop thru cursor
    While @@FETCH_STATUS = 0
    Begin
        print @dbname

        print ' -- Truncating log'
        set @sql = 'backup log [' + @dbname + '] with truncate_only'
        exec(@sql)

        print ' -- Shrinking database'
        set @sql = 'dbcc shrinkdatabase ([' + @dbname + '], 5, TRUNCATEONLY)'
        exec(@sql)

        -- Get the next record in the cursor
        Fetch Next From Cursor1 into @dbname
    End

    Close Cursor1
    Deallocate Cursor1

    set nocount off

    print 'Done.'

With this script, you need the person to have appropriate privileges in order to perform the log truncation and the database shrinking, but you can get huge amounts of hard drive space reclaimed for the file system.
