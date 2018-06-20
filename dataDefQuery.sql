/*Data definition queries for veterinarian hospital database
by Calista Wong */


/*table structure for table `doctor`*/

CREATE TABLE `doctor`
(
`doctor_id` int(11) NOT NULL AUTO_INCREMENT,
`d_name` varchar(255) NOT NULL,
PRIMARY KEY (`doctor_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*table structure for table `owner`*/

CREATE TABLE `owner` 
(
`owner_id` int(11) NOT NULL AUTO_INCREMENT,
`o_name` varchar(255) NOT NULL,
`phone` int(10) NOT NULL,
`balance` float(10) NOT NULL,
PRIMARY KEY (`owner_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*table structure for table `pet`*/

CREATE TABLE `pet`
(
`pet_id` int(11) NOT NULL AUTO_INCREMENT,
`p_name` varchar(255) NOT NULL,
`age` int(2) DEFAULT NULL,
`species` varchar(255) NOT NULL,
`breed` varchar(255) DEFAULT NULL,
`d_ID` int(11) NOT NULL,
`o_ID` int(11) NOT NULL,
FOREIGN KEY (`d_ID`) REFERENCES `doctor` (`doctor_id`),
FOREIGN KEY (`o_ID`) REFERENCES `owner` (`owner_id`),
PRIMARY KEY (`pet_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*table structure for table `medication`*/

CREATE TABLE `medication`
(
`medication_id` int(11) NOT NULL AUTO_INCREMENT,
`m_name` varchar(255) NOT NULL,
`cost` float(10) NOT NULL,
PRIMARY KEY (`medication_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*table structure for table `appointment`*/

CREATE TABLE `appointment`
(
`appointment_id` int(11) NOT NULL AUTO_INCREMENT,
`time` varchar(5) NOT NULL,
`date` int(100) NOT NULL,
`p_ID` int(11) NOT NULL,
FOREIGN KEY (`p_ID`) REFERENCES `pet` (`pet_id`),
PRIMARY KEY (`appointment_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*table structure for table `petMed`*/

CREATE TABLE `petMed`
(
`p_ID` int(11) NOT NULL,
`m_ID` int(11) NOT NULL,
FOREIGN KEY (`p_ID`) REFERENCES `pet` (`pet_id`),
FOREIGN KEY (`m_ID`) REFERENCES `medication` (`medication_id`),
PRIMARY KEY (`p_ID`, `m_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*----------------ADDING DATA HERE---------------------------------*/

/*dumping data for table `doctor`*/
INSERT INTO `doctor` (`d_name`) VALUES
("Dr. Gerard"),
("Dr. Johnson"),
("Dr. Kim"),
("Dr. Benton"),
("Dr. Lauren");


/*dumping data for table `owner`*/
INSERT INTO `owner` (`o_name`, `phone`, `balance`)VALUES
('Jon B.', 3458764134, 00.00),
('Marc J.', 5204546789, 12.50),
('Kate S.', 2435678934, 100.34),
('Ruby R.', 3452567345, 56.23);


 
/*dumping data for table `medication`*/
INSERT INTO `medication` (`m_name`, `cost`)VALUES
('flea medicine', 39.99),
('anti-itch cream', 10.50),
('amoxicillin acid', 25.99),
('ipuprofen', 16.55);


/*dumping data for table `pet`*/
INSERT INTO `pet` (`p_name`, `age`, `species`, `breed`, `d_ID`, `o_ID`) VALUES
("Baby", 5, "cat", "grey tabby", 1, 1),
("Snowball", 7, "cat", "maine coone", 2, 2),
("Rufus", 9, "dog", "german shepherd", 3, 3),
("Cupcake", 1, "hamster", "dwarf", 4, 4); 


/*dumping data for table `appointment`*/
INSERT INTO `appointment` (`time`, `date`, `p_ID`)VALUES
('12:30 PM', 05022018, 1),
('1:45 PM', 05022018, 2),
('2:30 PM', 05022018, 3),
('3:00 PM', 05022018, 4);


insert into petMed (p_ID, m_ID) values (1, 1);

 