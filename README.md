# photo-forms

Custom questionnaire builder and data collector for photographers.

## Route Planning

Routes and pages should include:

- [ ] `/` -- Dashboard
  - 10 most recent form submissions
  - Forms list with option to add a new one
  - _**Requires authentication**_

- [x] `/login` -- Login page
  - Standard UI for login
  - Redirects to `/` on success

- [x] `/form/:id` -- View a given form to fill it out and submit it the first time
  - Retrieves a forms configuration and displays it in fillable fashion
  - Includes options to save, save and exit, or cancel
  - For authenticated users, show option to return to form's submission page, and/or to edit the form

- [ ] `/form/:id/submissions` -- View a list of submissions for a given form
  - _**Requires authentication**_
  
- [ ] `/form/:id/edit` -- View a given form to edit its structure
  - Shows structure of a form and options to edit that structure as well as add new fields including:
    - Single line text
    - Multi line text 
    - Option lists (configurable as checklist, radios, or drop downs)
  - Each field allows an alias, label, details and help text. Also has an `order` and can be flagged to show value in list view.
  - Option lists allow any number of items as well as an optional "custom" item that allows for an "Other: ____"
  - _**Requires authentication**_
  
- [ ] `/submission/:id` -- View a submitted form
  - Authorized user can link here from a list of submitted forms
  - User who submitted the form can also view this using a link emailed to them with their receipt and provided on submission
  - _**Requires authentication**_

- [x] `/submission/:id/edit` -- Edit a previously submitted form
  - _**Requires authentication**_ -- administrative user is a given, but perhaps this could allow users who submitted the form to be able to authenticate with their email address and an access token?
