package com.dkuzmy.FullStackSpring.controller;

import com.dkuzmy.FullStackSpring.model.User;
import com.dkuzmy.FullStackSpring.service.UserServiceImp;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserServiceImp userService;

    @Autowired
    public UserController(UserServiceImp userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user){
        System.out.println("Added user " + user.getUsername());
        return userService.saveUser(user);
    }

    @GetMapping("/getAll")
    public List<User> getAll(){
        System.out.println("Returned all users.");
        return userService.getAll();
    }

    @PostMapping("/login")
    public User login(@RequestBody User user){
        return userService.login(user);
    }

    @PutMapping("/edit")
    public void editUser(@RequestBody User user){
        System.out.println("Attempting editing " + user.getId());
        userService.editUserById(user);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestBody User user){
        userService.deleteUserById(user);
    }
}
