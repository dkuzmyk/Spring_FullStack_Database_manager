package com.dkuzmy.FullStackSpring.service;
import com.dkuzmy.FullStackSpring.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAll();
    public User login(User user);
    public void deleteUserById(User user);
    void editUserById(User user);

    // security checks
    boolean checkUsername(String username);
    boolean checkEmail(String email);
    boolean checkPassword(String password);
}
