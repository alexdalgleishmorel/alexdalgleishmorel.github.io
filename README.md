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
Step 1: In the login page, in the email field, enter one of the group members first name followed by “@gmail.com”, for example “alex@gmail.com”.


Step 2: in the password field, enter “cpsc481”.


Step 3: click the login button.


Result: The home screen will be displayed.


### Schedule Appointment
Step 1: in the home page, navigate to the “Select a physician name” modal (top left), a list of physician names is then displayed.


Step 2: select a physician, for example click on “Dr. Zhang” in the list, Dr. Zhang’s checkbox is then highlighted in blue, indicating he has been selected.


Step 3: click “OK”, the current week of the month is displayed, for example, week of Dec 4, Dec 4 - Dec 10, Monday - Sunday, as well as any booked appointment of the week highlighted in blue.


Step 4: select a time slot by clicking on the desired time on the schedule table, for example scheduling an appointment for Thursday, December 7th, 10 AM, gray highlight will indicate the time slot being selected, clicking it will display the Appointment Booking modal.


Step 5: confirm start time (desired time), 10 AM.


Step 6: confirm end time (default for 30 minutes), 10:30AM, if the appointment is longer than 30 minutes, select the 
endtime modal and click on desired endtime (11AM), then click “OK”.


Step 7: enter patient first name, for example Brain


Step 8: enter patient last name, for example Griffin


Step 9: enter patient phone number (phone number is auto formatted), for example 111-222-3333


Step 10: enter patient health number, for example 111222333


Step 11: enter patient information, reason for appointment, concerns, in the “Notes” selection, for example “sick”.


Step 12: click on the “CONFIRM” button.


Result: Highlighted in blue, is the appointment that is booked, with the patient name, Brain Griffin, and duration of the appointment in the respected schedule time slot, Thursday, December 7th, 10am - 11am. A confirmation toast will also appear for a few seconds, letting the user know the action has been completed.


### Update Apointment
Step 1:  in the schedule page containing the desired patient to be deleted (for example, patient Peter Griffin), navigate to the patient appointment containing their name and click it. This will open the patient booking modal containing all the patient information. There are options to update, remove, check-in, and dismiss.


Step 2: click UPDATE. This will open the appointment booking information modal, allowing the user to edit: start, end times, names, phone, health numbers, and notes.


Step 3: enter desired changes.


Step 4: click CONFIRM.


Result: a confirmation toast of the appointment being updated will appear for a few seconds informing the user of the updated action. The user will also be directed to the main schedule page. Clicking the appointment again will display the updated information. 

### Delete Appointment
Step 1: in the schedule page containing the desired patient to be deleted (for example, patient Peter Griffin), navigate to the patient appointment containing their name and click it. This will open the patient booking modal containing all the patient information. There are options to update, remove, check-in, and dismiss.


Step 2: click remove. A confirmation of removing the appointment in the schedule modal will then be displayed.


Step 3: click YES. 


Result: a confirmation toast of the schedule being removed will appear for a few seconds letting the user know the appointment has been removed, and the appointment will no longer be on the schedule.

### Patient Search
Step 1: in any page (not modals, and a physician has been selected), navigate to the top middle of the page, locate the Patient Name search box.


Step 2: click on the Patient name search box. A patient search modal is then displayed.


Step3: if the desired search patient is “Peter Griffin”, enter Peter’s name in the search box. As soon as the user starts typing the first few letters (p, pe), a list of names with those letters will appear (Peter, Penny, etc..) below.


Step 4: select the desired name in the list below the search box (Peter Griffin).


Result: the user will be brought to the day of Peter's appointment, displaying the week of the appointment as well, in the schedule.

### Date Selector Shortcut
Step1: in any page (not modals, and a physician has been selected),  navigate to the top right of the page, the system will always display the current week, for example week of 11/20/23-11/26/23 (current week), in that format. There is a calendar icon to indicate a calendar date selector. There are two blue arrow buttons, one pointing left, clicking it will return it to the week before (11/13/23-11/19/23), clicking the right arrow will advance the week by one week (11/27/23-12/3/23).


Step 2: click on the calendar icon, located on top of the current week, or the current week (top right of the page). This will open a calendar date selector modal allowing the user to choose any day of the month, or advance or return to any other months of the year.


Step 3: select a date to view, for example December 1st. 


Result: the week of 11/27/23-12/3/23 will be displayed, with all the information and details, such as the booked appointment.

### Logout
Step 1: in any page (not modals), navigate to the logged in user (box), at the top left of the screen and click it. A user profile modal should then be displayed. For example user “Bryant Zhang”, with the name of the clinic, user position, email, and the options to cancel, or logout.


Step 2: click the logout button. 


Result: clicking the logout button logs out the user, bringing them to the login page.

## Important System Usage Information
## It is not possible to attempt to schedule another appointment at a time that has already been scheduled. The system will detect it and notify the user of the conflict.
## Refreshing the page or attempting to modify the code will cause the system to lose data (lose booked appointments), returning the user to the login page. As it is not required to have a database in this course, the database is mocked for the system.
