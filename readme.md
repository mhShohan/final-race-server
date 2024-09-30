Project Start - 31 December, 2023

- baseUrl: `/api/v1`

# BSMRSTU Semester registration system / Semester Form fill-up

`Introduction:` The BSMRSTU Semester Registration System/Semester Form Fill-Up is a web application designed to streamline and simplify the semester registration process within the university. This system role-based access controls distinct responsibilities of Super Admin, Chairmen, Students, and Hall Operators organized workflow. By integrating key features and functionalities, this system aims to enhance the overall management of semester-related tasks, providing a user-friendly experience for all stakeholders involved. This web application reduces student's hassles and it can be done with very less paper works. And minimize the work process that a student can fill up the semester form from his/her devices.

### Role Base Access Control:

- Super Admin – Have access to all data
  - Create a new faculty
  - Create a new department
  - Create a new subject
  - Retrieve all faculties, departments, and subjects
  - Only the Super Admin can create a new Role as like (Chairman, Office Operator, or Hall Operator)
- Chairman (Individual Department)
  - When a student submits their form to attend the semester exam with all the information, then the form will be visible in the chairman’s dashboard. If the student is eligible to attend the semester exam then the Chairman can approve the form, otherwise, the Chairman can decline or Hold the form and can leave any message as to why the form is declined or hold.
  - Retrieve all forms of the semester which are submitted of his/her department
- Student
  - Register a new account and login to their account
  - View profile, dashboard, registered semester.
  - Generate new receipt of semester fee to make payment.
  - Can register new a semester as a regular semester, retake, and improvement exam
  - After the form fill-up of the semester, if the chairman approves his/her form then he/she will be able to payment of the semester fee otherwise he will see the messages of the chairman about what he leaves at the time of decline of hold.
  - Can pay the semester fee using mobile payment methods and after the payment is done, the form will submitted to his/her Hall Operator.
  - When the Chairman and Hall Operator approve the semester form a generated Admit Card will be visible in the student dashboard
- Hall Operator (Individual Hall)
  - Receive the form and payment receipt
  - If the student is a resident of that hall he will check whether the fee of the hall is paid or not. If the Hall Operator sees that all payments have been done then he can approve. Otherwise, he can hold the form and leave a message about why the form is held.

# Tech Stacks:

### Client-Side

- TypeScript – programming language
- React.js –Javascript library to create web user interfaces
- Redux-toolkit – state management tools
- MUI – Component library

### Server Side

- TypeScript – programming language
- Node.js – run time
- Express.js – a web framework of node.js
- Mongodb – NoSQL database
- Mongoose – ODM of mongoDB
- Socket.io – event-driven library for real-time data

# Endpoints Completed

### Faculty

- POST - /faculties
- GET - /faculties
- GET - /faculties/:id
- PATCH - /faculties/:id

### Department

- POST - /departments
- GET - /departments
- GET - /departments/:id
- PATCH - /departments/:id

### Hall

- POST - /halls
- GET - /halls
- GET - /halls/:id
- PATCH - /halls/:id

### Course

- POST - /courses
- GET - /courses
- GET - /courses/:id
- PATCH - /courses/:id

### Admin

- POST - /admins
- POST - /admins/login
- GET - /admins
- GET - /admins/:id
- PATCH - /admins/:id

### Student

- POST - /students
- POST - /students/login
- GET - /students
- GET - /students/:id
- PATCH - /students/:id

## Registration Info

- POST - /registration-info
- PATCH - /registration-info/:id
- GET - /registration-info/:id

## semester fee form

- POST - /semester-fee-form
- PATCH - /semester-fee-form/:id
- GET - /semester-fee-form/:id

## departmental fee form

- POST - /departmental-fee-form
- PATCH - /departmental-fee-form/:id
- GET - /departmental-fee-form/:id

## residential fee form

- POST - /residential-fee-form
- PATCH - /residential-fee-form/:id
- GET - /residential-fee-form/:id

## fee form - create together

- POST - /fee-form
- GET - /fee-form
