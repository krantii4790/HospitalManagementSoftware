
package com.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.model.Doctor;
import com.hospital.repository.DoctorRepository;

@Service
public class DoctorSevice 
   {
	  @Autowired
      private DoctorRepository doctorRepository;
	  
	  public List<Doctor> getAllDoctor()
	  {
		  return doctorRepository.findAll();
	  }
	  
	  public Doctor saveDoctor(Doctor doctor)
	  {
		  return doctorRepository.save(doctor);
	  }
	  
	  public List<Doctor> getDoctorBySpecification(String spec)
	  {
	      return doctorRepository.getAllDoctorsBySpec(spec);
	  }

	  
	  public List<Doctor> getAllDoctorBySpecification(String spec)
	  {
		  return doctorRepository.getAllDoctorsBySpec(spec);
	  }
	  
    } 
