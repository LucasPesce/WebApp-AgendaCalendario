export default (date) => {
  const dateElement = document.createElement('li'); /* Crea un elemento de lista */
  dateElement.classList.add('date');
  dateElement.innerHTML = date;                     /* Permite agregar contenido */
  return dateElement;
};
