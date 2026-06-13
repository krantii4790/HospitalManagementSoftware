package com.hospital.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Doctor_info")
public class Doctor 
   {
	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
      private int doctorId;
	  @Column(name="Name")
      private String doctorName;
	  @Column(name="Specification")
      private String doctorSpec;
	  @Column(name="Experience")
      private int doctorExp;
	  public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	  }
	  public Doctor(int doctorId, String doctorName, String doctorSpec, int doctorExp) {
		super();
		this.doctorId = doctorId;
		this.doctorName = doctorName;
		this.doctorSpec = doctorSpec;
		this.doctorExp = doctorExp;
	  }
	  public int getDoctorId() {
		  return doctorId;
	  }
	  public void setDoctorId(int doctorId) {
		  this.doctorId = doctorId;
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

