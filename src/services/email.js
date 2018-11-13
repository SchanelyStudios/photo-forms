import * as axios from 'axios';

export default class EmailService {

  static send(to, from, subject, message) {

    // Ensure all params are present
    if (!to || !from || !subject || !message) {
      console.error('Mising required params in EmailService.send request.');
      return null;
    }

    // Send request to API
    return axios({
      url: 'http://mailer.schanelyphotography.com',
      method: 'post',
      data: {
        auth: process.env.REACT_APP_PF_MAILER_AUTH_CODE,
        to, from, subject, message
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      if (data.response === 'SUCCESS') {
        console.log('Message was successfully sent to the mailer api.');
        return data;
      } else {
        console.error('An error was returned by the mailer api:', data.response);
      }
    })
    .catch(err => {
      console.error('An error occurred with the mailer api request', err);
      return null;
    });
  }

}
