 ---stored procedure:
	CREATE OR ALTER PROCEDURE getUserByUsername
    @username VARCHAR(30)
AS
BEGIN
    SELECT *
    FROM users.Users
    WHERE username = @username;
END;

EXEC getUserByUsername @username = 'Mtumishi';
 
 
CREATE OR ALTER PROCEDURE registerUser
    @username VARCHAR(50),
    @email VARCHAR(50),
    @password VARCHAR(100)
AS
BEGIN
    
    DECLARE @UserID INT;
    SELECT @UserID = ISNULL(MAX(UserID), 0) + 1 FROM users.users;

    INSERT INTO users.users (username, email, password)
    VALUES (@username, @email, @password);
END;

--Testing the stored procedure---
-- Execute stored procedure with dummy data
EXEC insertUser
    @Username = 'Mtumishi',
    @Email = 'mtumishicollins@gmail.com',
    @Password = '1234';

	SELECT * FROM users.Users

	CREATE OR ALTER PROCEDURE users.InsertGoal
    @UserID INT,
    @Fuel INT,
    @CleanEnergy INT,
    @BooksAndCellulosePapers INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO users.Goals (UserID, Fuel, CleanEnergy, BooksAndCellulosePapers)
    VALUES (@UserID, @Fuel, @CleanEnergy, @BooksAndCellulosePapers);
END;



