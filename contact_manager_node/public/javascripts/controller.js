class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.setInterface();
    this.setEventListeners();
  }

  setInterface = async () => {
    let contacts = await this.model.getAllContactsObj();
    this.view.displayContacts(contacts);
    let tags = await this.model.getAllUniqueTags();
    this.view.displayTags(tags);
  }

  setSearchedInterface = (contactsArr) => {
    this.view.displayContacts({ contact: contactsArr });
  }

  setEventListeners = () => {
    this.view.addBtnListener(this.addBtnHandler);
    this.view.submitNewContactListener(this.createNewContactHandler);
    this.view.cancelNewContactListener(this.cancelNewContactHandler);
    this.view.editDeleteListener(this.editDeleteHandler);
    this.view.cancelEditListener(this.cancelEditHandler);
    this.view.submitEditListener(this.submitEditHandler);
    this.view.searchListener(this.#debounce(this.searchHandler, 250));
    this.view.searchTagListener(this.searchTagHandler);
  }

  #debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), delay);
    };
  };

  addBtnHandler = () => {
    this.view.displayNewContactForm();
  }

  searchHandler = async () => {
    let searchStr = document.querySelector('#searchBox').value;
    let results = await this.model.getSearchContacts(searchStr, 'full_name');
    this.setSearchedInterface(results);
  }

  searchTagHandler = async (event) => {
    if (event.target.className === 'searchBtn btn btn-secondary') {
      let searchStr = event.target.textContent;
      let results = await this.model.getSearchContacts(searchStr, 'tag');
      this.setSearchedInterface(results);
    } else if (event.target.id === 'removeTagSearch') {
      this.setInterface();
    }
  }

  editDeleteHandler = async (event) => {
    if (event.target.id === 'edit') {
      let id = event.target.dataset.editId;
      let data = await this.model.getContact(id);
      this.view.displayEditForm(data);

    } else if (event.target.id === 'delete') {
      await this.model.deleteContact(event.target.dataset.deleteId);
      this.setInterface();
    }
  }

  submitEditHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let jsonData = JSON.stringify(Object.fromEntries(formData));
    let contactId = event.target.querySelector('#contactId').dataset.contactId;
    await this.model.editContact(contactId, jsonData);
    this.setInterface();
  }

  createNewContactHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let jsonData = JSON.stringify(Object.fromEntries(formData));
    await this.model.sendNewContact(jsonData);
    this.setInterface();
  }

  cancelNewContactHandler = () => {
    this.setInterface();
  }

  cancelEditHandler = () => {
    this.setInterface();
  }
}

export default Controller;