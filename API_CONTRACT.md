# HackHalt LMS - API Contract Specification

This document defines the single source of truth for the API contract between the React+Vite frontend and the PHP backend.

## Response Envelope

All API endpoints must return a standardized response envelope.

### Success Response (HTTP 200/201)
```json
{
  "success": true,
  "data": {
    ...
  },
  "message": "Action completed successfully"
}
```

### Error Response (HTTP 4xx/5xx)
```json
{
  "success": false,
  "data": null,
  "message": "Specific error message for the user",
  "code": "ERROR_CODE"
}
```

---

## Authentication Endpoints

### 1. Register User
* **Method**: `POST`
* **Path**: `/auth/register`
* **Authentication Required**: No
* **Request Body**:
  ```json
  {
    "name": "Full Name",
    "email": "name@example.com",
    "mobile": "10-digit mobile number",
    "role": "student | instructor | admin",
    "password": "Password string (min 8 chars)"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "JWT_ACCESS_TOKEN",
      "refreshToken": "REFRESH_TOKEN",
      "user": {
        "id": "user-uuid-or-id",
        "name": "Full Name",
        "email": "name@example.com",
        "mobile": "10-digit mobile number",
        "role": "student"
      }
    },
    "message": "Account created successfully"
  }
  ```
* **Error Codes**:
  * `EMAIL_ALREADY_REGISTERED` (400) - Email is already in use.
  * `VALIDATION_FAILED` (400) - Missing or invalid input fields.

### 2. Login User
* **Method**: `POST`
* **Path**: `/auth/login`
* **Authentication Required**: No
* **Request Body**:
  ```json
  {
    "email": "name@example.com",
    "password": "Password string",
    "role": "student | instructor | admin"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "JWT_ACCESS_TOKEN",
      "refreshToken": "REFRESH_TOKEN",
      "user": {
        "id": "user-uuid-or-id",
        "name": "Full Name",
        "email": "name@example.com",
        "mobile": "10-digit mobile number",
        "role": "student"
      }
    },
    "message": "Logged in successfully"
  }
  ```
* **Error Codes**:
  * `INVALID_CREDENTIALS` (401) - Incorrect email, password, or role.

### 3. Logout User
* **Method**: `POST`
* **Path**: `/auth/logout`
* **Authentication Required**: No (but typically sent with refresh token in body)
* **Request Body**:
  ```json
  {
    "refreshToken": "REFRESH_TOKEN"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": null,
    "message": "Logged out successfully"
  }
  ```

### 4. Refresh Token
* **Method**: `POST`
* **Path**: `/auth/refresh`
* **Authentication Required**: No
* **Request Body**:
  ```json
  {
    "refreshToken": "REFRESH_TOKEN"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "NEW_JWT_ACCESS_TOKEN",
      "refreshToken": "NEW_REFRESH_TOKEN"
    },
    "message": "Token refreshed successfully"
  }
  ```
* **Error Codes**:
  * `INVALID_REFRESH_TOKEN` (401) - Refresh token is invalid or expired.

---

## Course Endpoints

### 5. Get All Courses
* **Method**: `GET`
* **Path**: `/courses`
* **Authentication Required**: Yes (Bearer Token)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Cyber Security",
        "tag": "Security",
        "description": "...",
        "totalLessons": 12,
        "duration": "8h 30m",
        "difficulty": "Beginner",
        "instructor": "Dr. Sarah Jenkins",
        "skills": ["Network Security", "Threat Analysis"],
        "modules": [
          { "id": "1-1", "title": "Introduction to Cybersecurity", "duration": "45m" }
        ]
      }
    ],
    "message": "Courses retrieved successfully"
  }
  ```

### 6. Get Course Details
* **Method**: `GET`
* **Path**: `/courses/:id`
* **Authentication Required**: Yes (Bearer Token)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Cyber Security",
      "tag": "Security",
      "description": "...",
      "totalLessons": 12,
      "duration": "8h 30m",
      "difficulty": "Beginner",
      "instructor": "Dr. Sarah Jenkins",
      "skills": ["Network Security", "Threat Analysis"],
      "modules": [
        { "id": "1-1", "title": "Introduction to Cybersecurity", "duration": "45m" }
      ]
    },
    "message": "Course details retrieved successfully"
  }
  ```
* **Error Codes**:
  * `COURSE_NOT_FOUND` (404) - The requested course does not exist.

### 7. Get Enrolled Courses
* **Method**: `GET`
* **Path**: `/courses/enrolled`
* **Authentication Required**: Yes (Bearer Token)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Cyber Security",
        "tag": "Security"
      }
    ],
    "message": "Enrolled courses retrieved successfully"
  }
  ```

### 8. Enroll in Course
* **Method**: `POST`
* **Path**: `/courses/:id/enroll`
* **Authentication Required**: Yes (Bearer Token)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "completedLessons": 0,
      "data": []
    },
    "message": "Enrolled in course successfully"
  }
  ```
* **Error Codes**:
  * `ALREADY_ENROLLED` (400) - User is already enrolled.
  * `COURSE_NOT_FOUND` (404) - Course does not exist.

---

## Progress Endpoints

### 9. Get Course Progress
* **Method**: `GET`
* **Path**: `/courses/:id/progress`
* **Authentication Required**: Yes (Bearer Token)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "completedLessons": 8,
      "data": ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"]
    },
    "message": "Progress retrieved successfully"
  }
  ```
  *(Note: Returns `data: null` if user is not enrolled in the course).*

### 10. Update Course Progress (Toggle Module)
* **Method**: `POST`
* **Path**: `/courses/:id/progress`
* **Authentication Required**: Yes (Bearer Token)
* **Request Body**:
  ```json
  {
    "moduleId": "1-1",
    "completed": true
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "completedLessons": 9,
      "data": ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", "1-9"]
    },
    "message": "Progress updated successfully"
  }
  ```
* **Error Codes**:
  * `NOT_ENROLLED` (403) - The student is not enrolled in this course.
  * `MODULE_NOT_FOUND` (404) - Module ID does not belong to this course.

---

## Certificate Endpoints

### 11. Get Certificates
* **Method**: `GET`
* **Path**: `/courses/certificates`
* **Authentication Required**: Yes (Bearer Token)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "cert-uuid-or-id",
        "course": {
          "id": 1,
          "title": "Cyber Security"
        },
        "issuedAt": "2026-07-14T23:55:00.000Z"
      }
    ],
    "message": "Certificates retrieved successfully"
  }
  ```

### 12. Download Certificate PDF
* **Method**: `GET`
* **Path**: `/courses/certificates/:id/download`
* **Authentication Required**: Yes (Bearer Token)
* **Response**: Binary PDF content stream (`application/pdf`)
