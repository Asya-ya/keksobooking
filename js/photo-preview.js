const FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const renderPreview = (file, preview) => {
  if (FILE_TYPES.includes(file.type)) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

const createImg = (wrap) => {
  wrap.innerHTML = '';
  const img = document.createElement('img');
  img.src = '#';
  img.alt = 'Фотография жилья';
  img.style.width = 'inherit'
  img.style.height = 'inherit';
  wrap.append(img);
  return img;
}

export { renderPreview, createImg }
