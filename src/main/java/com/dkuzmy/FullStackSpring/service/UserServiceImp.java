package com.dkuzmy.FullStackSpring.service;

import com.dkuzmy.FullStackSpring.model.User;
import com.dkuzmy.FullStackSpring.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserServiceImp implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImp(@Lazy UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {

        // check if the user has valid entries
        if(!checkUsername(user.getUsername()) ||
                !checkEmail(user.getEmail()) ||
                !checkPassword(user.getPassword()) ){
            return new User("ERROR", "", "ERROR");
        }

        // check if username or email already exists
        System.out.println("Adding user " + user.getUsername());
        Optional<User> u = userRepository.findUserByUsername(user.getUsername());

        if(u.isPresent()) {
            System.out.println("Attempt to create user with taken username : " + u.get().getUsername());
            return new User("ERROR", "", "");
        }

        // check if the email exists at all
        u = userRepository.findUserByEmail(user.getEmail());

        if(u.isPresent()) {
            System.out.println("Attempt to create user with taken email : " + u.get().getEmail());
            return new User("", "", "ERROR");
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User login(User user) {
        System.out.println("Attempting login: " + user.getUsername() + " : " + user.getPassword());
        // check if the email exists at all
        Optional<User> u = userRepository.findUserByUsername(user.getUsername());

        // if user is not found, throw exception
        if(u.isEmpty() )
            throw new IllegalStateException("User doesn't "+" exist");

        // if password matches return the object
        if(u.get().getPassword().equals(user.getPassword())) {
            System.out.println("Login Successful : " + user.getUsername());
            return u.get();
        }
        else
            throw new IllegalStateException("Login Password doesn't match");
    }

    @Override
    public void deleteUserById(User user) {
        // find user
        System.out.println("Attempting deleting user Id: " + user.getId());
        Optional<User> obj = userRepository.findUserById(user.getId());

        if(obj.isEmpty()){
            throw new IllegalStateException("User doesn't exist");
        }

        userRepository.deleteById(user.getId());
    }

    @Transactional
    @Override
    public void editUserById(User user) {
        // find user
        System.out.println("Attempting editing user Id: " + user.getId());
        Optional<User> obj = userRepository.findUserById(user.getId());

        if(obj.isEmpty()){
            throw new IllegalStateException("User doesn't exist");
        }

        // check if the user has valid entries
        if(!checkUsername(user.getUsername()) ||
                !checkEmail(user.getEmail()) ||
                !checkPassword(user.getPassword()) ){
            throw new IllegalStateException("Invalid editing");
        }

        // check if username is the same or empty, if not change
        if(!obj.get().getUsername().equals(user.getUsername()) && user.getUsername() != null){
            // check if username was already taken
            Optional<User> existing = userRepository.findUserByUsername(user.getUsername());
            if(existing.isPresent())
                throw new IllegalStateException("username already in use");

            obj.get().setUsername(user.getUsername());
        }
        // check if email is the same or empty, if not change
        if(!obj.get().getEmail().equals(user.getEmail()) && user.getEmail() != null){
            // check if email was already taken
            Optional<User> existing = userRepository.findUserByEmail(user.getEmail());
            if(existing.isPresent())
                throw new IllegalStateException("email already in use");

            obj.get().setEmail(user.getEmail());
        }
        // check if password is the same or empty, if not change
        if(!obj.get().getPassword().equals(user.getPassword()) && user.getPassword() != null){
            obj.get().setPassword(user.getPassword());
        }

    }

    @Override
    public boolean checkUsername(String username) {
        // make usernames to:
        // contain at least 4 characters, at most 14 characters
        // contain no symbols such as {}[]()"';,./><
        String[] symb = {"{","}","(",")","[","]","'",",",".","/",">","<"};
        for (String a : symb) {
            if(username.contains(a))
                return false;
        }
        return username.length() >= 4 && username.length() <= 14;
    }

    @Override
    public boolean checkEmail(String email) {
        // utilizing pattern matching to check for a valid email
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+
                "[a-zA-Z0-9_+&*-]+)*@" +
                "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                "A-Z]{2,7}$";

        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }

    @Override
    public boolean checkPassword(String password) {
        // just set len limit
        return password.length() >= 4 && password.length() <= 14;
    }
}
