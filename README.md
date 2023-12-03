# CPSC 481 - Final Project Fall 2023
## T01 Group 4 - NorthWest Medical Clinic Schedule System
### Group Members:
Alexander Dalgleish-Morel, 

Bryant Zhang, 

Gabriel Cameron, 

Stevan Beljić, 

Umair Tariq.

## Setup

### Step 1 - Environment
Make sure your environment is set up to support node. Follow these instructions: https://ionicframework.com/docs/intro/environment

### Step 2 - Install Ionic CLI
This will be a command-line interface that will allow you to build and run the project very easily. Follow these instructions: https://ionicframework.com/docs/intro/cli

### Step 3 - Running The Project
At this point, you should be able to simply run `ionic serve` from the main directory of the repo to get the project running. If prompted to install @angular/cli then please input Yes (Y) and install the angular interface tool. Any changes made and saved to the code will dynamically update the front-end!

## System Usage Instructions
### Login
Step 1: In the login page, in the email field, enter one of the group members first name followed by “@gmail.com”, for example “alex@gmail.com”.#
Step 2: in the password field, enter “cpsc481”.
Step 3: click the login button.
Result: The home screen will be displayed.
### Schedule Appointment
Step 1: in the home page, navigate to the “Select a physician name” modal (top left), a list of physician names is then displayed.
Step 2: select a physician, for example click on “Dr. Zhang” in the list, Dr. Zhang’s checkbox is then highlighted in blue, indicating he has been selected.
Step 3: click “OK”, the current week of the month is displayed, for example, week of Dec 4, Dec 4 - Dec 10, Monday - Sunday, as well as any booked appointment of the week highlighted in blue.
Step 4: select a time slot by clicking on the desired time on the schedule table, for example scheduling an appointment for Thursday, December 7th, 10 AM, gray highlight will indicate the time slot being selected, clicking it will display the Appointment Booking modal.
Step 5: confirm start time (desired time), 10 AM.
Step 6: confirm end time (default for 30 minutes), 10:30AM, if the appointment is longer than 30 minutes, select the endtime modal and click on desired endtime (11AM), then click “OK”.
Step 7: enter patient first name, for example Brain
Step 8: enter patient last name, for example Griffin
Step 9: enter patient phone number (phone number is auto formatted), for example 111-222-3333
Step 10: enter patient health number, for example 111222333
Step 11: enter patient information, reason for appointment, concerns, in the “Notes” selection, for example “sick”.
Step 12: click on the “CONFIRM” button.
Result: Highlighted in blue, is the appointment that is booked, with the patient name, Brain Griffin, and duration of the appointment in the respected schedule time slot, Thursday, December 7th, 10am - 11am. A confirmation toast will also appear for a few seconds, letting the user know the action has been completed.
### Update Apointment

