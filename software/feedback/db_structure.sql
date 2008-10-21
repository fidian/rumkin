-- MySQL dump 9.11
--
-- Host: localhost    Database: discuss
-- ------------------------------------------------------
-- Server version	4.0.23_Debian-1-log

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL auto_increment,
  `topic` varchar(50) NOT NULL default '',
  `name` varchar(30) NOT NULL default '',
  `message` varchar(250) NOT NULL default '',
  `page` varchar(250) NOT NULL default '',
  `posttime` datetime NOT NULL default '0000-00-00 00:00:00',
  `seen` tinyint(1) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `topic` (`topic`),
  KEY `seen` (`seen`)
) TYPE=MyISAM;

--
-- Table structure for table `recent_ip`
--

CREATE TABLE `recent_ip` (
  `ip_addr` char(11) NOT NULL default '',
  `last_post` datetime NOT NULL default '0000-00-00 00:00:00',
  KEY `ip_addr` (`ip_addr`)
) TYPE=MyISAM;

