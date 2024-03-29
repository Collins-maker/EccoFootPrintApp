CREATE SCHEMA users;

CREATE TABLE users.Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    RegistrationDate DATETIME NOT NULL DEFAULT GETDATE(),
    LastLogin DATETIME,
    -- Add more fields as needed
);

--creatting Carbon footprints table

CREATE TABLE users.CarbonFootprints (
    FootprintID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    CarbonOutput DECIMAL(10, 2) NOT NULL,
    DateRecorded DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES users.Users(UserID)
);

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



