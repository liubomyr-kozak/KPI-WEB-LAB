const $ = (name) => {
  const nodes = document.querySelectorAll(name);

  if (nodes.length === 1) return nodes[0];

  return nodes;
}

const validationRules = {
  name: {
    regexp: /^[А-ЯЇІЄҐ'][а-яїієґ]*\s[А-ЯЇІЄҐ']\.[А-ЯЇІЄҐ']\.$/,
    message: "Формат поля: 'Призвище І.П.'",
  },
  variant: {
    regexp: /^\d{1,2}$/,
    message: "Формат поля: '1'",
  },
  phone: {
    regexp: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    message: "Формат поля: '(000)-000-00-00'",
  },
  facultet: {
    regexp: /^[А-Яа-яЁёЇїІіЄєҐґ']+$/,
    message: "Формат поля: 'ФІОТ'",
  },
  address: {
    regexp: /^[А-Яа-яЁёЇїІіЄєҐґ']+\.\s[А-Яа-яЁёЇїІіЄєҐґ']*$/,
    message: "Формат поля: 'м. Київ'",
  },
};

const DemoDataForm = {
  name: 'Призвище І.П.',
  variant: '1',
  phone: '(000)-000-00-00',
  facultet: 'ФІОТ',
  address: 'м. Київ',
};

class FormService {
  fieldsRef = new Map();
  formRef = null;
  validationRules = validationRules

  setField(type, fieldRef) {
    fieldRef.addEventListener('input', function (e) {
      e.target.classList = '';
      e.target.setCustomValidity('');
    });

    this.fieldsRef.set(type, fieldRef)
  }

  validateField = (fieldRef, key) => {
    const { regexp } = this.validationRules[key];
    return regexp.test(fieldRef.value)
  };

  setInvalidClass = (fieldRef, key) => {
    const { message } = this.validationRules[key];
    fieldRef.setCustomValidity(message);
    fieldRef.classList = 'field-invalid'
  };


  setForm(formRef) {
    this.formRef = formRef

    this.formRef.onsubmit = (e) => {
      e.preventDefault();


      let isFormValid = true;

      this.fieldsRef.forEach((fieldRef, fieldKey) => {
        if (this.validateField(fieldRef, fieldKey)) {
          fieldRef.classList = 'field-valid';
        } else {
          this.setInvalidClass(fieldRef, fieldKey);
          isFormValid = false;
        }
      });

      if (isFormValid) {
        $('#result-popup').classList = 'js-open'


        this.fieldsRef.forEach((fieldRef, fieldKey) => {
          $(`.result-popup-container .${fieldKey} span`).innerText = fieldRef.value
        });
      }
    }
  }
}

const form = new FormService();

form.setField('name', $('#form input[name="name"]'))
form.setField('variant', $('#form input[name="variant"]'))
form.setField('phone', $('#form input[name="phone"]'))
form.setField('facultet', $('#form input[name="facultet"]'))
form.setField('address', $('#form input[name="address"]'))
form.setForm(document.forms.form)


$('#form input[name="fillForm"]')
  .addEventListener('click', () => {
    form.fieldsRef.forEach((fieldRef, fieldKey) => {
      fieldRef.value = DemoDataForm[fieldKey]
    });
  })


$('.result-popup-close-btn')
  .addEventListener('click', () => {
    $('#result-popup').classList = ''
  })