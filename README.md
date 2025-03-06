Daily Chess Puzzle App

Overview

The Daily Chess Puzzle App is a Spring Boot web application that allows users to solve daily chess puzzles. It integrates OAuth2 Google Authentication, uses MySQL for data storage, and employs chess.js for rendering and validating chess moves. The app follows best practices such as password salting, externalizing configurations via .env files, and leveraging Spring Security.

🚀 Getting Started

To run this application locally, follow these steps:

1️⃣ Prerequisites

Ensure you have the following installed:

Java 17

Maven

MySQL

Git

2️⃣ Clone the Repository

$ git clone https://github.com/DDVP95/CA95.git
$ cd CA95

3️⃣ Create a .env File

Since sensitive information is not included in the repository, you must create a .env file in the root directory.

$ touch .env

Then, open .env and add the following variables (replace placeholders with your actual values):

##################################
# Database Configuration
##################################
DB_URL=jdbc:mysql://localhost:3306/cadb?useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

##################################
# JPA / Hibernate
##################################
JPA_HIBERNATE_DDL_AUTO=update
JPA_SHOW_SQL=true

##################################
# Server Configuration
##################################
SERVER_PORT=8080

##################################
# Security - Spring Boot Basic User
##################################
SECURITY_USER_NAME=admin
SECURITY_USER_PASSWORD=your_secure_password

##################################
# Logging
##################################
LOGGING_LEVEL_SPRING=INFO
LOGGING_LEVEL_CHESSAPP=DEBUG

##################################
# OAuth2 - Google
##################################
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/login/oauth2/code/google
GOOGLE_AUTHORIZATION_GRANT_TYPE=authorization_code
GOOGLE_SCOPE=openid,profile,email
GOOGLE_AUTHORIZATION_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_USER_INFO_URI=https://www.googleapis.com/oauth2/v3/userinfo
GOOGLE_USER_NAME_ATTRIBUTE=sub

4️⃣ Configure the Database

Make sure you have a MySQL database running and update the .env file with the correct credentials.

$ mysql -u root -p
mysql> CREATE DATABASE cadb;

5️⃣ Run the Application

Once everything is configured, build and run the application:

$ mvn clean install
$ mvn spring-boot:run

The app should now be running on http://localhost:8080

6️⃣ Accessing the App

Open http://localhost:8080 in your browser.

Sign in using Google OAuth2 or the basic credentials from the .env file.

Solve daily chess puzzles!

🛠️ Technologies Used

Java 17

Spring Boot 3

Spring Security (OAuth2 authentication)

Hibernate & JPA

MySQL

Maven

chess.js (for chess move validation)

Bootstrap / TailwindCSS (for UI styling)

📚 What I Learned

This project helped me understand and apply several key concepts:

OAuth2 Authentication with Google: Implementing Google login using Spring Security.

Environment Variables & Security: Managing secrets using .env files and keeping sensitive data out of source control.

Database Management & ORM: Using Hibernate and JPA to manage MySQL data.

Password Salting & Hashing: Enhancing security by salting and hashing stored passwords.

chess.js Integration: Validating chess moves with JavaScript and rendering chess positions.

Logging & Debugging: Using structured logging for better debugging.

📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

🎯 Future Improvements

✅ Implement a leaderboard system.

✅ Add difficulty levels for puzzles.

✅ Improve UI with better animations.

✅ Allow users to submit their own chess puzzles.

🙌 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

$ git checkout -b feature-branch
$ git commit -m "Added a new feature"
$ git push origin feature-branch

📧 Contact

If you have any questions, feel free to reach out at dominikvalledor2@gmail.com or create an issue in the repository.

Happy coding! 🎉
