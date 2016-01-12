CREATE DATABASE `tiger_analytics_db` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE `cisco_user_list` (
  `id_cisco_user_list` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) DEFAULT NULL,
  `login` varchar(1000) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `site_admin` varchar(45) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `company` varchar(1000) DEFAULT NULL,
  `blog` longtext,
  `location` varchar(1000) DEFAULT NULL,
  `email` varchar(1000) DEFAULT NULL,
  `hireable` varchar(45) DEFAULT NULL,
  `bio` text,
  `public_repos` varchar(45) DEFAULT NULL,
  `public_gists` varchar(45) DEFAULT NULL,
  `followers` varchar(45) DEFAULT NULL,
  `following` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `row_inserted_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_cisco_user_list`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `repository_info` (
  `id_repository_info` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(1000) DEFAULT NULL,
  `repo_id` varchar(45) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `full_name` varchar(2000) DEFAULT NULL,
  `is_private` varchar(45) DEFAULT NULL,
  `description` text,
  `is_fork` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `pushed_at` varchar(45) DEFAULT NULL,
  `homepage` text,
  `size` varchar(45) DEFAULT NULL,
  `watchers_count` varchar(45) DEFAULT NULL,
  `language` varchar(200) DEFAULT NULL,
  `has_issues` varchar(45) DEFAULT NULL,
  `has_downloads` varchar(45) DEFAULT NULL,
  `has_wiki` varchar(45) DEFAULT NULL,
  `has_pages` varchar(45) DEFAULT NULL,
  `forks_count` varchar(45) DEFAULT NULL,
  `open_issues` varchar(45) DEFAULT NULL,
  `default_branch` varchar(200) DEFAULT NULL,
  `row_inserted_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_repository_info`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `cisco_user_timeline` (
  `id_cisco_user_timeline` int(11) NOT NULL AUTO_INCREMENT,
  `actor_login` varchar(2000) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `event` varchar(45) DEFAULT NULL,
  `event_action` varchar(45) DEFAULT NULL,
  `event_closed_at` varchar(45) DEFAULT NULL,
  `event_created_at` varchar(45) DEFAULT NULL,
  `event_number` varchar(45) DEFAULT NULL,
  `repository_name` varchar(2000) DEFAULT NULL,
  `repository_owner` varchar(2000) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `row_inserted_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_cisco_user_timeline`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `cisco_tfidf` (
  `cisco_tfidf_id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(1000) DEFAULT NULL,
  `uniqueness` varchar(100) DEFAULT NULL,
  `reach` varchar(100) DEFAULT NULL,
  `row_inserted_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cisco_tfidf_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
