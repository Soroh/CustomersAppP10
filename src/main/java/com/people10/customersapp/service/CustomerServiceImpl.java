package com.people10.customersapp.service;

import com.people10.customersapp.dao.ICustomerDao;
import com.people10.customersapp.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements ICustomerService {
    @Autowired
    private ICustomerDao customerDao;

    @Override
    public List<Customer> getAllCustomersPaged(int pageNo) {
        return null;
    }

    @Override
    public List<Customer> searchCustomers(String searchTerm) {
        return customerDao.findByFirstNameContainingOrLastNameContainingOrEmailContainingOrIpContaining(searchTerm,searchTerm,searchTerm,searchTerm);
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerDao.save(customer);
    }

    @Override
    public void deleteCustomer(Integer customerId) {
        customerDao.deleteById(customerId);

    }

    @Override
    public Customer findById(Integer customerId) {
        return customerDao.findById(customerId).orElse(null);
    }

    @Override
    public Page<Customer> search(String search, int pageNo) {
        return null;
    }

    @Override
    public List<Customer> findAll() {
        return customerDao.findAll();
    }
}
