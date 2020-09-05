import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

class AddTeamMember extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          title: '',
          story: '',
          photoUrl: '',
          favoriteColor: ''
        }}

        validationSchema={
          Yup.object().shape({
            firstName: Yup.string()
              .required('Please enter your first name')
              .min(1, 'First name should be 1 to 255 characters long')
              .max(255, 'First name should be 1 to 255 characters long'),
            lastName: Yup.string()
              .required('Please enter your last name')
              .min(1, 'Last name should be 1 to 255 characters long')
              .max(255, 'Last name should be 1 to 255 characters long'),
            title: Yup.string()
              .required('Please enter your title')
              .min(1, 'Title should be 1 to 255 characters long')
              .max(255, 'Title should be 1 to 255 characters long'),
            story: Yup.string()
              .required('Please tell us your story')
              .min(1, 'Story should be 1 to 500 characters long')
              .max(500, 'Story should be 1 to 500 characters long'),
            favoriteColor: Yup.string()
              .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter your favorite color in hexadecimal'),
            photoUrl: Yup.string()
              .url('Please enter a valid photo URL')
          })
        }

        onSubmit={(fields, actions) => {
          // delete before posting, don't throw bad data into backend
          if (!fields.photoUrl) {
            delete fields['photoUrl'];
          }

          if (!fields.favoriteColor) {
            delete fields['favoriteColor'];
          }

          Axios.post('/team', fields)
            .then(response => {
              actions.setSubmitting(false);
              actions.resetForm();
              // reload with skipping the cache
              window.location.reload(true);
            })
            .catch(error => {
              actions.setSubmitting(false);
            })
        }}

        render={({ errors, status, touched, isSubmitting }) => (
          <div id="addTeamMember">
            <h3 style={{ paddingBottom: 20 }} >Can't wait to have you :)</h3>
            <Form>
              <div className="row">
                <div className="col form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" type="text" placeholder="Jon" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                  <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                </div>
                <div className="col form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" type="text" placeholder="Snow" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                  <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="row">
                <div className="col form-group">
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="text" placeholder="True heir" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                  <ErrorMessage name="title" component="div" className="invalid-feedback" />
                </div>
                <div className="col form-group">
                  <label htmlFor="favoriteColor">Favorite Color</label>
                  <Field name="favoriteColor" type="text" placeholder="#FFFAFA" className={'form-control' + (errors.favoriteColor && touched.favoriteColor ? ' is-invalid' : '')} />
                  <ErrorMessage name="favoriteColor" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="story">Story</label>
                <Field name="story" as="textarea" style={{ height: 200 }} placeholder="One of the best feedbacks I've ever received was that I know nothing!" className={'form-control' + (errors.story && touched.story ? ' is-invalid' : '')} />
                <ErrorMessage name="story" component="div" className="invalid-feedback" />
              </div>
              
              <div className="form-group">
                <label htmlFor="photoUrl">Photo URL</label>
                <Field name="photoUrl" type="text" placeholder="https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png" className={'form-control' + (errors.photoUrl && touched.photoUrl ? ' is-invalid' : '')} />
                <ErrorMessage name="photoUrl" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <button type="submit" className="join" disabled={isSubmitting}>Join</button>
              </div>
            </Form>
          </div>
        )}
      />
    );
  }
}

export default AddTeamMember;