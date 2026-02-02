package com.hospital.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.hospital.model.Doctor;
import com.hospital.model.Patient;
import com.hospital.service.PatientService;

@RestController
public class PatientController 

   {
	  @Autowired
	  private PatientService patientService;
	  
	  @Autowired
	  private DiscoveryClient client;  //working is instance getting
	  
	  @GetMapping("/allPatients")
	  public List<Patient> fetchAllPatients()
	  {
		  return patientService.getAllPatient();
	  }
	  
	  @PostMapping("/registerPatient/{spec}")
	    public Patient savingPatient(@RequestBody Patient patient, @PathVariable String spec) {

	        List<ServiceInstance> services =
	                client.getInstances("HospitalManagementSoftware-Doctor"); // FIXED NAME

	        if (services == null || services.isEmpty()) {
	            throw new RuntimeException("Doctor service not found!");
	        }

	        ServiceInstance instance = services.get(0);
	        URI uri = instance.getUri();

	        // FIXED: Doctor API returns ARRAY
	        Doctor[] doctors = new RestTemplate()
	                .getForObject(uri + "/fetchDoctor/" + spec, Doctor[].class);

	        if (doctors == null || doctors.length == 0) {
	            throw new RuntimeException("No doctor found for: " + spec);
	        }

	        Doctor doctor = doctors[0];

	        patient.setDoctorName(doctor.getDoctorName());
	        patient.setDoctorSpec(doctor.getDoctorSpec());
	        patient.setDoctorExp(doctor.getDoctorExp());

	        return patientService.savePatient(patient);
	    }

	  @DeleteMapping("/deletePatient/{id}")
	  public String deletePatient(@PathVariable int id) {

	      if (patientService.deletePatient(id)) {
	          return "Patient deleted successfully with ID: " + id;
	      } else {
	          return "Patient not found with ID: " + id;
	      }
	  }

	}



   