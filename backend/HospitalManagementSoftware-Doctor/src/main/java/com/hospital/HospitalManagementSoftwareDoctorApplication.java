package com.hospital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class HospitalManagementSoftwareDoctorApplication {

	public static void main(String[] args) {
		SpringApplication.run(HospitalManagementSoftwareDoctorApplication.class, args);
	}

}
