import Model from '/javascripts/model.js';
import View from '/javascripts/view.js';
import Controller from '/javascripts/controller.js';

document.addEventListener('DOMContentLoaded', () => {
  new Controller(new Model(), new View());
});
