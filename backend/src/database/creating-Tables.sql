CREATE SCHEMA users;

CREATE TABLE users.Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(255) NOT NULL,
    RegistrationDate DATETIME NOT NULL DEFAULT GETDATE(),
    LastLogin DATETIME,
    -- Add more fields as needed
);

--populating some values on the users table:
INSERT INTO users.Users (Username, Email, Password)
VALUES
    ('Mtumishi', 'mtumishicollins@gmail.com', '1234');

	--checking values:
	SELECT * FROM users.Users; 



--creatting Carbon footprints table

CREATE TABLE users.CarbonFootprints (
    FootprintID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    SelectedFactor VARCHAR(100) NOT NULL, -- Assuming the factor selected can be a string
    Category VARCHAR(100), -- Assuming the category can be a string
    Quantity VARCHAR(100)NOT NULL, -- Assuming quantity can be a decimal value
    Results VARCHAR(100), 
    TotalResults VARCHAR(100), -- Assuming total results can be a decimal value
    DateRecorded DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES users.Users(UserID)
);

DROP TABLE users.CarbonFootprints;

SELECT * FROM users.CarbonFootprints;




---testing carbonfootprints table:
INSERT INTO users.CarbonFootprints (UserID, SelectedFactor, Quantity, Category, Results) 
VALUES 
  ('1','Fuel', '10 litres', 'Type: Petrol', 'CO2e: 50');



--goals table

CREATE TABLE users.Goals (
    GoalID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    GoalDescription VARCHAR(255) NOT NULL,
    TargetDate DATE,
    Progress DECIMAL(5, 2),
    CONSTRAINT FK_UserID FOREIGN KEY (UserID) REFERENCES users.Users(UserID)
);

--education
CREATE TABLE users.Education (
    ArticleID INT IDENTITY(1,1) PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    DatePublished DATETIME NOT NULL DEFAULT GETDATE()
);

--email Queue

CREATE TABLE users.EmailQueue (
    EmailID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    EmailAddress VARCHAR(255) NOT NULL,
    Subject VARCHAR(255) NOT NULL,
    Body TEXT NOT NULL,
    DateToSend DATETIME NOT NULL,
    Status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    CONSTRAINT FK_UserID_EmailQueue FOREIGN KEY (UserID) REFERENCES users.Users(UserID)
);



