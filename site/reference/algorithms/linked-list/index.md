---
title: Linked Lists
---

I came across an article in <i>Linux Journal</i> that discussed an interesting method of making a doubly-linked list while only using one pointer.  In [Issue 129](http://www.linuxjournal.com/article/6828), Prokash Sinha discussed the method in detail.  I had been bouncing around a similar idea for binary search trees, but never could make anything useful.  I suppose that's because I was starting in the wrong area.

Here are two blocks of code that compare the list implementations.  The premise is simple.  Instead of storing the `next` and `prev` memory addresses, you merely store the XOR difference between them.  See the article (and subscribe *today* to *Linux Journal*) for an explanation that is more in-depth.

You can cut your header information in half, since your struct only needs to store the difference between the pointers.  Let me show you what I mean, assuming that we are storing integers in our linked list.

    // Typical doubly-linked list
    typedef struct node {
        struct node *prev;
        struct node *next;

        int data;
    } node;

    // Our doubly-linked list with a single pointer
    typedef struct node {
       struct node *diff;

       int data;
    } node;

Yep, that's right.  A doubly-linked list with just the space for one pointer.  How do you do it?  Well, it's not that hard, but first let's get into the "Why".

I have programmed for limited environments, such as for Palm OS back in the day.  I like to code in C and tweak things until they are faster, smaller, and better.  I also would like to see perhaps a Linux kernel option to have memory-efficient doubly linked lists (among other things) if possible because I want to get various devices (Aquapad? Rasberry pi? My router?) running a lean, mean, optimized kernel.  For these reasons, at times memory is a concern.  For those times, this version of a doubly-linked list could be beneficial.  Most of the time it will not be the smartest, especially if you absolutely need the most speed you can squeeze out of the machine.  That isn't to say that the memory efficient technique is slow; it just consumes a tiny bit of more CPU cycles.  Tiny.  How many?  Let's find out.

The best way to judge how much time an algorithm takes is to do an analysis of the code.  I'll try to do that for you.  The easiest way is to  torture test a reference implementation.  I'll certainly do that for you too. To do either, I will need a few functions.  Keep in mind that my code isn't optimized for speed or size at this point.  It is just a good working implementation.

    // sizeof((node *)) == 8
    // sizeof(int) == 8

    #define PTRTYPE int
    #define XOR(a,b) ((node *) ((PTRTYPE)(a)^(PTRTYPE)(b)))
    #define XOR3(a,b,c) ((node *) ((PTRTYPE)(a)^(PTRTYPE)(b)^(PTRTYPE)(c))));

These special `#define` macros will help me out.  On my system, the size of the pointer is the same as the `int` data type.  You may need to use `unsigned long`, `long long`, `short`, or something else.  The `XOR()` and `XOR3()` macros just save me tons of typing.  I could have made an actual function for that, but it would have been silly to do that because the lines are so darn small.  Setting up the call to the function, passing the parameters, and passing back the return value would have chewed up more CPU cycles than I would have liked ... unless you inline the function, but I digress.

Basically the `XOR()` macro just does a bitwise XOR of two pointers.  If you recall from your binary math class, 01010000 XOR 11000011 results in 10010011.  XOR just flips bits in the first value as specified in the second.  So, if you start with 000 and XOR it by 010, you get 010 as your result.  If you XOR it again by 010, the result is the original 000 value.  Enough of that; let's see some code and compare differences!

    // Normal way to count the number of nodes in the list
    unsigned long countNodes(node *head) {
        unsigned long nodes = 0;
        node *curr;
        curr = head;
        while (curr) {
            nodes ++;
            curr = curr->next;
        }
        return nodes;
    }

    // Counting the number of nodes in this special list
    unsigned long countNodes(node *head) {
        unsigned long nodes = 0;
        node *curr, *prev, *temp;
        prev = NULL;
        curr = head;
        while (curr) {
            nodes ++;
            temp = curr;
            curr = XOR(prev, temp->diff);
            prev = temp;
        }
        return nodes;
    }

This simple function just shows you how to count the number of nodes in a doubly linked list.  The modified version is a bit longer.  There are two extra variables and an extra assignment before the while loop.  Negligible performance hit.  Inside the while loop, there are two more assignments and one XOR.

You can download the [source] and take a look at how you can insert values, delete nodes, and finally peek into my testing program.  There's a little more overhead because we need to track the node we were just at and the current node, then update pointers in more than one node, but the changes are pretty minimal.  There are optimizations that you can use to even get rid of temporary pointers at times, if that's more of a concern to you.

I speculated that the size of the compiled code will be mere bytes larger.  I also believed the actual traversal, insertion, and deletion would operate at 1/2 the speed because we are modifying twice as many variables and performing an XOR with each iteration.

Now comes the fun part.  Testing.  I wrote a tiny little program that is identical for each list structure.  I've coded the algorithms in separate files.  Download the [source] and you can do the same.  When I compile them and strip them, this is the sizes that I see:

    $ for F in countnodes deletenode insertvalue; do gcc -Os -Wall -o ${F}.o ${F}.c; strip ${F}.o; done

    $ ls -l normal_version/*.o
    -rw-r--r--  1 root root  496 Jan 22 21:01 countnodes.o
    -rw-r--r--  1 root root  560 Jan 22 21:01 deletenode.o
    -rw-r--r--  1 root root  548 Jan 22 21:01 insertvalue.o

    $ ls -l xor_version/*.o
    -rw-r--r--  1 root root  504 Jan 22 21:01 countnodes.o
    -rw-r--r--  1 root root  580 Jan 22 21:01 deletenode.o
    -rw-r--r--  1 root root  564 Jan 22 21:01 insertvalue.o

As you can see, only very minor changes in size, the largest is a difference of 20 bytes.  However, it all depends on where those bytes are, because if they are in the time-consuming `while` loops, then those extra instructions could consume a lot of time.

I ran my test program five times on each list, alternating between them, and tallied the amount of user time each one took.  I have two tests.  The insert test just seeds the random number generator with a static value, make a node with a random number, and insert the node into the ordered list with the insert function above.  The delete function just inserts a bunch of numerically descending values (very fast to insert them) and deletes the Nth node, determined "randomly" using the statically seeded random number generator.  I ran each test for both versions with 10,000, 20,000, and 30,000 inserts and deletes.  The average times are listed below.

| Iterations | Insert | Delete | Mod Insert | Mod Delete |
|-----------:|-------:|-------:|-----------:|-----------:|
|     10,000 |  0.306 |  0.382 |      0.350 |      0.484 |
|     20,000 |  3.566 |  3.834 |      3.244 |      4.312 |
|     30,000 | 13.988 | 14.092 |     14.282 |     14.124 |

The normal linked list should be faster than the XOR version, but I never thought it would be such a close race.  I tested the program on my web server (the nicest machine I have available to me for testing), and it could be doing stuff in the background.  To compensate, I alternated the tests and ran them several times to average things out.

I don't know why the insertion of 20,000 values for the normal list takes less time than with the XOR version, but it certainly did.  We could mark that up to a fluke, but I ran that test so many times back and forth and it constantly beat the normal version.  The rest all expectedly bigger, but not a straight percentage.  The increase ranges from 0.2% to 26.7% longer for the XOR version.

Anyway, this is a very interesting idea and if you can handle the minor drawback of the extra time, it can save a lot of space.  For about 10% longer, you can have a list of 20,000 entries save you 160k in memory (8 bytes per pointer, 20,000 pointers).  It could also make allocation easier for the OS since you need smaller structures, or worse due to excessive memory fragmentation.

There is nothing bad about trying something out to see if it suits your needs better.  I'm not saying this is the end-all best solution.  It just can help out a lot.

* [Download the Code](lists.tar.gz) - Code for all the examples above, the testing program, and list definitions.  Just change to the appropriate directory and issue a "make" command.  This was compiled under Linux, but most other platforms should be able to handle it with minor (if any) changes.
* [Linux Journal Article](http://www.linuxjournal.com/article/6828) - Where the idea was first described to me.  I felt it didn't describe things adequately, so I expanded a bit on the idea with this page.  Plus tests are good.

[source]: lists.tar.gz
