package com.hospital.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Patient_info")
public class Patient 
   {
	   @Id
	   @GeneratedValue(strategy=GenerationType.IDENTITY)
       private int patientId;
	   @Column(name="Name")
       private String patientName;
	   @Column(name="Address")
       private String patientAddress;
	   @Column(name="Age")
       private int patientAge;
	   @Column(name="Bimari")
       private String Issue;
	   
	   @Column(name="Doctor_Name")
	   private String doctorName;
	   @Column(name="Doctor_Spec")
	   private String doctorSpec;
	   @Column(name="Doctor_Exp")
	   private int doctorExp;
	   public Patient() {
	   }
	   
	   
	   public Patient(int patientId, String patientName, String patientAddress, int patientAge, String issue,
			String doctorName, String doctorSpec, int doctorExp) {
		this.patientId = patientId;
		this.patientName = patientName;
		this.patientAddress = patientAddress;
		this.patientAge = patientAge;
		Issue = issue;
		this.doctorName = doctorName;
		this.doctorSpec = doctorSpec;
		this.doctorExp = doctorExp;
	   }
	   
	   
	   public int getPatientId() {
		   return patientId;
	   }
	   public void setPatientId(int patientId) {
		   this.patientId = patientId;
	   }
	   public String getPatientName() {
		   return patientName;
	   }
	   public void setPatientName(String patientName) {
		   this.patientName = patientName;
	   }
	   public String getPatientAddress() {
		   return patientAddress;
	   }
	   public void setPatientAddress(String patientAddress) {
		   this.patientAddress = patientAddress;
	   }
	   public int getPatientAge() {
		   return patientAge;
	   }
	   public void setPatientAge(int patientAge) {
		   this.patientAge = patientAge;
	   }
	   public String getIssue() {
		   return Issue;
	   }
	   public void setIssue(String issue) {
		   Issue = issue;
	   }
	   public String getDoctorName() {
		   return doctorName;
	   }
	   public void setDoctorName(String doctorName) {
		   this.doctorName = doctorName;
	   }
	   public String getDoctorSpec() {
		   return doctorSpec;
	   }
	   public void setDoctorSpec(String doctorSpec) {
		   this.doctorSpec = doctorSpec;
	   }
	   public int getDoctorExp() {
		   return doctorExp;
	   }
	   public void setDoctorExp(int doctorExp) {
		   this.doctorExp = doctorExp;
	   }

	   
	   
   }
