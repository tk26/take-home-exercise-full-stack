# Submission Details

## Candidate
Tejas Kumthekar 👨‍💻 

## Solution

### Backend
`POST /team` endpoint which accepts request body according to the `TeamMember` data model.

Used [`bodyParser`](https://www.npmjs.com/package/body-parser) library as the request body parsing middleware. 

Gives `201 Created` on successful insertion of the record, `400 Bad Request` with client-friendly validation error messages on unacceptable inputs and `500 Internal Server Error` otherwise.

Following validation rules were added using Sequelize -
* First Name, Last Name and Title cannot be null and should be between 1 to 255 characters long.
* Story cannot be null and should be between 1 to 500 characters long.
* Favorite color should be in hexadecimal string (regex matching).
* Photo URL should be a URL.

### Frontend
Used [`Formik`](https://formik.org/) library for building the add member form.
(New to me 😃)

Used [`yup`](https://www.npmjs.com/package/yup) library for parsing and validation.
(New to me 😃)

Used Bootstrap CSS to apply layout styling to the add member form.

Added a conditional `Join the team!` button only available for the last card.

CSS for the button copied from `Go to App` button on https://matterapp.com/ to mimic Matter App production design.

On successful submission, cleared the form input and reload the page to reflect the new team member. Passed `true` to the `reload()` to NOT serve the page from the cache.

### And there's more
Used Matter's icon, changed page title and app details in the `manifest`.

Ran the page through Google Lighthouse Audits and adhered to Accessibility standard guidelines.

Footer text color was white by default. If the team member has chosen a light color as his/her favorite, the white color text on the footer doesn't contrast well with it and can potentially be invisble. Added a conditional logic to set the footer text color to be either white or black based on the member's favorite color.