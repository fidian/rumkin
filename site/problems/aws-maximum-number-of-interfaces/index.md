---
title: AWS Maximum Number of Interfaces Exceecded
---

We were trying to spin up a jump host to access an environment that is hosted in AWS. This is with an established piece of software and it had the right keys. Also, it said the maximum number of *interfaces*, not *instances*, so most of the web pages that existed did not have relevant information.


Symptoms
--------

* The AWS API reported the following message:
    > ClientError: An error occurred (ResourceLimitExceeded) when calling the RunInstances operation: You have exceeded the maximum number of interfaces allowed for your account


Causes
------

* The default limit of security groups per instance is 50. For brevity, I'll call this GROUPS.
* The default limit of rules per security group is 5. Let's name the value RULES.
* The maximum value of `GROUPS × RULES` can be 250 for performance reasons.
* We were trying to add more than five security groups to the instance that we were creating.


Solution
--------

The first solution is to reduce the maximum number of rules per security group. We were trying to add 15 security groups to our instance. By doing some algebra, we can divide 250 by 15 to get a limit of 16⅔ rules per security group. Any more than 16 would make `GROUPS × RULES > 250` and that's not allowed.

One of the rules we are trying to attach has 18 rules, so we would be forbidden from adding that rule. An alternative bit of math would divide 250 by 18 to get just under 14 security groups per instance.

Amazon suggested we give up on our security group scheme because it is primarily based on single rules. For example, a security group that was applied to a web server might expose port 80 or possibly both 80 and 443. They would recommend building larger, aggregated security groups with more rules. This approach won't work well because we have very specialized machines that don't open a lot of ports.

Our setup also used security groups to allow access to services. For instance, we'd grant a `serviceNameSource` security group to an ELB and `serviceName` to the instance. The `serviceName` security group would allow traffic from only `serviceNameSource`. Seems like a nice, tight way to control our network.

To get around this problem, we stopped adding `serviceNameSource` style security groups to our jump host. Because the jump host was able to get to any machine, it had many security groups of this flavor. Instead, the `serviceName` security group was modified to allow incoming traffic from `serviceNameSource` and a `jumpHost` security group. New jump host instances are created with the `jumpHost` security group and now we can access everything again and use fewer security groups per instance.

Problem solved.
