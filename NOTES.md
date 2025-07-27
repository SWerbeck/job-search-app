React router still keeps guest id in url on login -> need to fix

MAJOR TODO
Need to associate user with company for editing and getting api routes for a users company. Currently if you edit a company name like google it will edit for every user. - 7/27/25

Bugs to fix:
When editing a company name for a logged in user the single application data does not load for the company we edited. - 7/27/25

Applications:

1. Last updated date when you edit an appication does not update the date. - 7/27/25

Contacts:

1. Need to build delete contacts.
2. Posting a new company works for a contact but does not appear in the dropdown - 7/27/25

Company: need edit buttons that direct you edit applications and edit contacts(This should be done last after edit applications and edit contacts are finished)
Company: Need a drop down to edit company names. You shouldnt be allowed to edit a company name, only if they are mispelled.

Future Ideas:

1. Add follow up field for reminders on applications to follow up on. Yes or no tab? Checkbox?
2. Maybe a calendar for when you applied to a job -> Look up how to har code SQL timestamps going back a year for guests. React Calendar
3. Might need to make a calendar or library calendar to be able to edit the applied date. Say you forgot to add one from a week ago and want to change the date.
   When editing applied date we may or may not need to edit the backend when creating the application table. creation_date TIMESTAMPTZ DEFAULT Now(),

test test
