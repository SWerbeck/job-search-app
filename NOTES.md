React router still keeps guest id in url on login -> need to fix

Todo from 12/1/24

Applications:

1. Need to be able to edit more info on the applications. Currently can post and delete.
2. Single application needs to display form fields. Toggle to edit - Mostly done
3. Might need to make a calendar or library calendar to be able to edit the applied date. Say you forgot to add one from a week ago and want to change the date.
   When editing applied date we may or may not need to edit the backend when creating the application table. creation_date TIMESTAMPTZ DEFAULT Now(),

Contacts:

1. Need to build single contact page.
2. Need to build edit, post, delete contacts.

Company: need edit buttons that direct you edit applications and edit contacts(This should be done last after edit applications and edit contacts are finished)
Company: Need a drop down to edit company names. You shouldnt be allowed to edit a company name, only if they are mispelled.

Future Ideas:

1. Add follow up field for reminders on applications to follow up on. Yes or no tab? Checkbox?
2. Maybe a calendar for when you applied to a job -> Look up how to har code SQL timestamps going back a year for guests. React Calendar
