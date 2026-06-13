package com.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.model.Doctor;
import com.hospital.service.DoctorSevice;

@RestController
public class DoctorController {  
	
	@Autowired
	private DoctorSevice doctorSevice;
	
	@GetMapping("/allDoctors")
	public List<Doctor> fetchAllDoctors()
	{
		return doctorSevice.getAllDoctor();
	}
	
	@PostMapping("/saveDoctor")
	public Doctor savingDoctor(@RequestBody Doctor doctor)
	{
		return doctorSevice.saveDoctor(doctor);
	}
	
	@GetMapping("/fetchDoctor/{spec}")
	public List<Doctor> fetchDoctorBySpec(@PathVariable String spec)
	{
		return doctorSevice.getDoctorBySpecification(spec);
	}
	
	@GetMapping("/allDoctors/{spec}")
	public List<Doctor> FetchAllDoctorBySpecification(@PathVariable String spec)
	{
		return doctorSevice.getAllDoctorBySpecification(spec);
	}

}
