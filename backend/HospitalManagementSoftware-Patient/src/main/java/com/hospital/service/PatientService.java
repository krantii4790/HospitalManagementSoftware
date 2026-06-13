package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;

@Service
public class PatientService {
	
	@Autowired
	private PatientRepository patientRepository;
	
	public List<Patient> getAllPatient()
	{
		return patientRepository.findAll();
	}
	
	public Optional<Patient> getPatientById(int id)
	{
		return patientRepository.findById(id);
	}
	
	public Patient savePatient(Patient patient)
	{
		return patientRepository.save(patient);
	}
	
	public boolean deletePatient(int id) {

	    if (patientRepository.existsById(id)) {
	        patientRepository.deleteById(id);
	        return true;
	    }
	    return false;
	}


}
