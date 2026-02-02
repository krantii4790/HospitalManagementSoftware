package com.hospital.model;

public class Doctor
   {
      private int doctorId;
      private String doctorName;
      private String doctorSpec;
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
	  @Override
	  public String toString() {
		return "Doctor [doctorId=" + doctorId + ", doctorName=" + doctorName + ", doctorSpec=" + doctorSpec
				+ ", doctorExp=" + doctorExp + "]";
	  }
      
      
   }
