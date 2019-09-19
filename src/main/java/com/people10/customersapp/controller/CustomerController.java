package com.people10.customersapp.controller;

import com.people10.customersapp.model.Customer;
import com.people10.customersapp.service.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    private CustomerServiceImpl customerService;

    @GetMapping("customers")
    public List<Customer> customers(){

       return customerService.findAll();
    }

    //Returns a list of all customers
    @GetMapping("customer/{id}")
    public Customer listCustomers(@PathVariable("id") Integer id){

                return customerService.findById(id);
    }
    //Returns a list of all customers based on search criteria
    @GetMapping("/customer/search/{searchTerm}")
    public List<Customer> searchCustomers(@PathVariable("searchTerm") String searchTerm){

               return customerService.searchCustomers(searchTerm);
    }

    //Saves or Updates customer
    @PutMapping(value ="customer")
    public Customer saveOrUpdateCustomer(@RequestBody Customer customer){

        return customerService.saveCustomer(customer);
    }

    @PostMapping(value ="customer")
    public Customer saveCustomer(@RequestBody Customer customer){

       return customerService.saveCustomer(customer);

    }

    //Deletes Customer
    @DeleteMapping("customer/{id}")
    public Customer deleteCustomer(@PathVariable("id") Integer id){

        Customer customer = customerService.findById(id);
        customerService.deleteCustomer(id);
        return customer;
    }

}
