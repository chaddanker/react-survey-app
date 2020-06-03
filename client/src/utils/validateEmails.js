//returns a function therefore lowercase
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Recipients => {
  const invalidRecipients = Recipients
    .split(',')
    .map(recipients => recipients.trim())
    .filter(recipients => re.test(recipients) === false);

  if (invalidRecipients.length && invalidRecipients[invalidRecipients.length - 1].length > 0) {

    return `These emails are invalid: ${invalidRecipients}`;
  }

  return;
};


//.trim() takes away any extra spaces in string for eavh item in array	
//.map() runs function on every item in array
//filter() passes each ind email, check to see if email is valid... if valid return false, if not falid return false
//if false, keeps value in array
//filter tests email against regex for emails