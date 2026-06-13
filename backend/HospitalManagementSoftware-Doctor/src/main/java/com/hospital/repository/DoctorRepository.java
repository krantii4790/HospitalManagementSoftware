package com.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hospital.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Integer>
   {
	 //here we created custom method with help of jpql query
	 //this method return 1 doctor only
	@Query("SELECT d FROM Doctor d WHERE d.doctorSpec = ?1") //?1 -> no of parameter 
     public List<Doctor> getAllDoctorsBySpec(String spec);
	 
	 //all Doctor same specifications returns
	@Query("SELECT DISTINCT d FROM Doctor d WHERE d.doctorSpec = ?1")
	 public Doctor getDistinctDoctorBySpec(String spec);
   }
