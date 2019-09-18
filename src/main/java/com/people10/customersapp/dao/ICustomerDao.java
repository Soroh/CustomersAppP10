package com.people10.customersapp.dao;

import com.people10.customersapp.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICustomerDao extends JpaRepository<Customer, Integer> {
    List<Customer> findByFirstNameContainingOrLastNameContainingOrEmailContainingOrIpContaining(String fName,String lName,String email,String ip);
}
