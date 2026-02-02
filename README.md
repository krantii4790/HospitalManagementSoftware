🏥 **Hospital Management Software (Microservices)**

A Spring Boot–based Hospital Management System implemented using Microservices Architecture.
The system manages Doctors, Patients, and Service Discovery using Netflix Eureka.
---

📌 **Project Architecture**

This project follows a Microservices Monorepo structure with three services:

```
HospitalManagementSoftware
│
├── HospitalManagementSoftware-Server   (Eureka Server)
├── HospitalManagementSoftware-Doctor   (Doctor Microservice)
└── HospitalManagementSoftware-Patient  (Patient Microservice)
```

---

**Technologies Used**

Java

Spring Boot

Spring Data JPA

Spring Web (REST APIs)

Spring Cloud Netflix Eureka

Maven

MySQL / H2 (as configured)

REST Template

Git & GitHub

---

**Microservices Description**

1️⃣ HospitalManagementSoftware-Server (Eureka Server)

Acts as a Service Registry

All microservices register here

Enables service discovery

📍 Annotation used:

@EnableEurekaServer

2️⃣ HospitalManagementSoftware-Doctor (Doctor Service)

Responsibilities:

Manage doctor information

Provide doctor data to Patient service

Key APIs:

GET /allDoctors → Fetch all doctors

POST /saveDoctor → Add new doctor

GET /fetchDoctor/{spec} → Fetch doctors by specialization

Entities:

Doctor

doctorId

doctorName

doctorSpec

doctorExp

3️⃣ HospitalManagementSoftware-Patient (Patient Service)

Responsibilities:

Manage patient information

Communicates with Doctor service using Eureka + RestTemplate

Key APIs:

GET /allPatients → Fetch all patients

POST /registerPatient/{spec} → Register patient and assign doctor

DELETE /deletePatient/{id} → Delete patient

Special Feature:

Automatically assigns a doctor based on specialization

Fetches doctor details from Doctor microservice via Eureka

---

🔁 **Inter-Service Communication**

Uses DiscoveryClient

Uses RestTemplate

Doctor service is discovered dynamically via Eureka

client.getInstances("HospitalManagementSoftware-Doctor");

---

🗄 **Database Structure**

Doctor Table
Doctor_info
- doctor_id
- name
- specification
- experience

Patient Table
Patient_info
- patient_id
- name
- address
- age
- issue
- doctor_name
- doctor_spec
- doctor_exp

---

▶️ **How to Run the Project**

Step 1: Start Eureka Server
HospitalManagementSoftware-Server

Step 2: Start Doctor Service
HospitalManagementSoftware-Doctor

Step 3: Start Patient Service
HospitalManagementSoftware-Patient

⚠️ Ensure Eureka Server is running before other services.

---

📂 **API Testing**

You can test APIs using:

Postman

Browser (GET APIs)

Example:

http://localhost:8081/allDoctors
http://localhost:8082/allPatients

---

👨‍💻 Author

Krantikumar Dilip Patil
