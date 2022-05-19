const FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const renderPreview = (file, wrap, alt) => {
  if (FILE_TYPES.includes(file.type)) {
    const reader = new FileReader();
    const img = document.createElement('img');

    wrap.innerHTML = '';   
    img.alt = alt;
    img.className = 'preview';
    img.style.width = 'inherit'
    img.style.height = 'inherit';
    wrap.append(img);

    reader.addEventListener('load', () => {
      img.src = reader.result;
    });

    reader.readAsDataURL(file);
    return img;
  }
};

export { renderPreview }
