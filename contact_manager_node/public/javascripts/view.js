class View {
  contactsTemplate = (contacts) => {
    let partialHtml = document.querySelector('#contactsPartial').innerHTML;
    Handlebars.registerPartial('contactsPartial', partialHtml);
    let templateHtml = document.querySelector('#contactsTemplate').innerHTML;
    let template = Handlebars.compile(templateHtml);

    return template(contacts);
  }

  formTemplate = () => {
    let templateHtml = document.querySelector('#contactForm').innerHTML;
    let template = Handlebars.compile(templateHtml);

    return template();
  }

  editTemplate = (contactData) => {
    let templateHtml = document.querySelector('#contactForm').innerHTML;
    let template = Handlebars.compile(templateHtml);

    return template(contactData);
  }

  tagTemplate = (tags) => {
    let templateHtml = document.querySelector('#tagsTemplate').innerHTML;
    let template = Handlebars.compile(templateHtml);

    return template(tags);
  }

  setInnerHtml = (id, html) => {
    document.querySelector(id).innerHTML = html;
  }

  showDiv = (id) => {
    document.querySelector(id).style.display = 'block';
  }

  hideDiv = (id) => {
    document.querySelector(id).style.display = 'none';
  }

  displayEditForm = (data) => {
    this.hideDiv('#addSearch');
    this.hideDiv('#tagsDiv');
    this.hideDiv('#contacts');
    this.showDiv('#editDiv');
    this.setInnerHtml('#editFormDiv', this.editTemplate(data));
  }

  displayNewContactForm = () => {
    this.hideDiv('#contacts');
    this.hideDiv('#tagsDiv');
    this.hideDiv('#addSearch');
    this.showDiv('#newContact');
    this.setInnerHtml('#newContactFormDiv', this.formTemplate());
  }

  displayContacts = (contacts) => {
    this.hideDiv('#newContact');
    this.hideDiv('#editDiv');
    this.showDiv('#addSearch');
    this.setInnerHtml('#contacts', this.contactsTemplate(contacts));
    this.showDiv('#contacts');
  }

  displayTags = (tags) => {
    this.showDiv('#tagsDiv');
    let tagsObj = { tag: tags };
    this.setInnerHtml('#tagsDiv', this.tagTemplate(tagsObj));
  }

  addBtnListener = (handler) => {
    document.querySelector('#addBtn').addEventListener('click', handler);
  }

  editDeleteListener = (handler) => {
    document.querySelector('#contacts').addEventListener('click', handler);
  }

  submitNewContactListener = (handler) => {
    document.querySelector('#newContactForm')
      .addEventListener('submit', handler);
  }

  cancelNewContactListener = (handler) => {
    document.querySelector('#cancelNewContact')
      .addEventListener('click', handler);
  }

  cancelEditListener = (handler) => {
    document.querySelector('#cancelEdit').addEventListener('click', handler);
  }

  submitEditListener = (handler) => {
    document.querySelector('#editForm').addEventListener('submit', handler);
  }

  searchListener = (handler) => {
    document.querySelector('#searchBox').addEventListener('keyup', handler);
  }

  searchTagListener = (handler) => {
    document.querySelector('#tagsDiv').addEventListener('click', handler);
  }
}

export default View;