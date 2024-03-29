create database login;
use login;

create table registration1 (
r_id int not null auto_increment,
firstName varchar(255),
email varchar(255),
mobile int,
userName varchar(255),
pass varchar(255),
conPass varchar(255),
primary key (r_id)
);

CREATE TABLE usser (fname varchar(225), lname varchar(255), age int, address VARCHAR(255));

CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

insert into students(select * from school_27feb.students);

select * from students;

CREATE TABLE `attendance1` (
  `attend_id` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `dates` date DEFAULT NULL,
  `statuss` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attend_id`),
  KEY `id` (`id`),
  CONSTRAINT `attendance1_ibfk_1` FOREIGN KEY (`id`) REFERENCES `students` (`id`)
);

insert into attendance1(select * from school_27feb.attendance1);

select * from attendance1 limit 60000;

CREATE TABLE `basic_details1` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `bday` date DEFAULT NULL,
  `zipcode` int DEFAULT NULL,
  `rstatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`s_id`)
);

insert into basic_details1(select * from schoolnew.basic_details1);
select * from basic_details1;

CREATE TABLE `edu_details` (
  `s_id` int NOT NULL,
  `boardName` varchar(255) DEFAULT NULL,
  `passyear` int DEFAULT NULL,
  `percent` int DEFAULT NULL
);

insert into edu_details(select * from schoolnew.edu_details);
select * from edu_details;

CREATE TABLE `exam` (
  `id` int NOT NULL,
  `sub_id` int NOT NULL,
  `prilims_mark_th` int NOT NULL,
  `prilims_th_total` int NOT NULL,
  `prilims_mark_pr` int NOT NULL,
  `prilims_pr_total` int NOT NULL,
  `terminal_mark_th` int NOT NULL,
  `terminal_th_total` int NOT NULL,
  `terminal_mark_pr` int NOT NULL,
  `terminal_pr_total` int NOT NULL,
  `final_marks_th` int NOT NULL,
  `final_th_total` int NOT NULL,
  `final_marks_pr` int NOT NULL,
  `final_pr_total` int NOT NULL,
  `exam_date` date DEFAULT NULL,
  `attendance` varchar(255) DEFAULT NULL,
  KEY `id` (`id`),
  CONSTRAINT `exam_ibfk_1` FOREIGN KEY (`id`) REFERENCES `students` (`id`)
);

insert into exam (select * from school_27feb.exam);
select * from exam;

create TABLE `student10` (
  `std_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`std_id`)
);

insert into student10 (select * from school10.student10);
select * from student10 limit 600000;

select * from usser;

-- CREATE TABLE customers (name varchar(225), address varchar(255));

insert into registration1(r_id,firstName, email, mobile, userName, pass, conPass) values("50","dixit", "dixit@gmail.com", "957454644","dixit8502_12", "PatelDK@8502", "PatelDK@8502");

insert into registration1 (firstName, email, mobile, userName, pass, conPass) values('Dhyey','dhyey@gmal.com','7531598426','dhyey_26','e799b909a5a0210ad27198d11c1e68be','e799b909a5a0210ad27198d11c1e68be');

delete from registration1 where r_id = 50;

alter table registration1 add keyss varchar(255);

alter table registration1 add currentTime timestamp default current_timestamp();

select userName, pass, salt from registration1 where firstName="Chirag";

select salt from registration1 where firstName = "Chirag";

select * from registration1;

truncate table registration1