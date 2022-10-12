const BASE_URL = 'http://localhost:3000/api/contacts'

class Model {
  getAllContacts = async () => {
    try {
      let response = await fetch(BASE_URL);
      if (response.ok) {
        return  await response.json();
      } else {
        throw new Error('error, unable to retrieve contacts');
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAllContactsObj = async () => {
    return { contact: await this.getAllContacts() }
  }

  getContact = async (id) => {
    try {
      let response = await fetch(BASE_URL + `/${id}`);
      if (response.ok) {
        return  await response.json();
      } else {
        throw new Error('error, unable to retrieve contacts');
      }
    } catch (error) {
      console.log(error);
    }
  }

  sendNewContact = async (data) => {
    let dataFormattedTags = this.#formatDataTags(data);
    try {
      let response = await fetch(BASE_URL + '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: dataFormattedTags,
      });
      if (response.ok) {
        return true;
      } else {
        throw new Error('error, unable to create new contact');
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteContact = async (id) => {
    let confirmation = confirm('Confirm deletion of contact:')
    if (confirmation) {
      try {
        let response = await fetch(BASE_URL + `/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('error, unable to delete contact');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  editContact = async (id, data) => {
    let dataFormattedTags = this.#formatDataTags(data);
    try {
      let response = await fetch(BASE_URL + `/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: dataFormattedTags,
      });
      if (response.ok) {
        alert('contact updated');
        return true;
      } else {
        throw new Error('error, unable to update contact');
      }
    } catch (error) {
      console.log(error);
    }
  }

  filterContacts = async (searchRegEx, flag) => {
    let allContactsArr = await this.getAllContacts();

    if (flag === 'full_name') {
      return allContactsArr.filter(contact => {
        return contact.full_name.match(searchRegEx);
      });
    } else if (flag === 'tag') {
      return allContactsArr.filter(contact => {
        return contact.tags.match(searchRegEx);
      })
    }
  }

  getSearchContacts = async (searchStr, flag) => {
    let searchRegEx = new RegExp(searchStr, 'gi');
    return await this.filterContacts(searchRegEx, flag);
  }

  getAllUniqueTags = async () => {
    let allContacts = await this.getAllContacts();
    let uniqueTags = [];

    allContacts.forEach(contact => {
      contact.tags.split(',').forEach(tag => {
        if (!uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
      });
    });
    return uniqueTags;
  }

  #formatDataTags = (data) => {
    let parsedData = JSON.parse(data);
    let tags = parsedData.tags;
    let formattedTags;

    if (tags.trim() === '') {
      formattedTags = ['no tags'];
    } else { 
      formattedTags = tags.split(',').map(tag => {
          return tag.toLowerCase().trim();
      });
    }

    parsedData.tags = formattedTags.join(',');
    return JSON.stringify(parsedData);
  }
}

export default Model;