Simple database manage utilizing Java, Spring Boot, MySQL for backend, JavaScript, React.js, HTML, CSS for front end.
The Java server edits in real time the MySQL server tables via the front-end web-app through an admin account. 
The front-end has a login that allows only the admin to access the management feature.
You can register a user (yourself) and watch the table containing the username and email of other users, the Admin has the access to usernames, passowrds, emails and unique IDs.
The Admin is able to edit, delete or add new users via the management page which only Admin accouts are able to enter. 
Spring boot communicates with the fron-end via RESTful apis. 
There's checkers on what username, password or email you're able to register, as we don't want invalid data to be inserted. 
Upon user registration, the checkers will prompt popups stating what problems the username/password/email has (eg: invalid email format, password or username too short etc.)
