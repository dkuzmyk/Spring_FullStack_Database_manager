import React from 'react';

export default function About(){
    return (
        <div>
            <h1 className='Header'>
                ABOUT
            </h1>
            <p class="blocktext">
                <p> This web-app is meant to replicate a database management system. </p>
                <p> Here you're able to register users and store them into your MySQL server. </p>
                <p> Registered users will be able to log-in and see other registered users. </p>
                <p> Admin users are able to see all users, their emails and passwords. </p>
                <p> Admin users are also able to delete or edit usernames, passwords and emails. </p>
                <p> There's only one Admin account, it's defined by default on the Java server. </p>
                <p> username: Admin -- password: Admin </p>
                <p> Back-end: Java 17 & Maven, Spring Boot, MySQL.  </p>
                <p> Front-end: JavaScript, React, HTML, CSS </p>
                <p> Made by github.com/dkuzmyk </p>
            </p>
        </div>
    );
}