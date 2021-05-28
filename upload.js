export function upload(selector, options = {}) {
  const input = document.querySelector(selector);
  const preview = document.createElement('div');

  preview.classList.add('preview');

  const open = document.createElement('button');
  open.classList.add('btn');
  open.textContent = 'Select';

  if (options.multi) {
    input.setAttribute('multiple', true)
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  input.insertAdjacentElement('afterend', preview);
  input.insertAdjacentElement('afterend', open);

  const triggerInput = () => input.click();

  const changeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }

    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (!/image/.test(file.type)) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        console.log(e.target.result);
        input.insertAdjacentHTML('afterend', `<img src=${e.target.result} alt="" width="70">`)
      }

      reader.readAsDataURL(file);
    })

  }

  open.addEventListener('click', triggerInput);
  input.addEventListener('change', changeHandler)
}
