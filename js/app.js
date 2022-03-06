// Variable
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Elimina los cursos del tbody
const limpiarHTML = () => {
  // Forma lenta
  // contenedorCarrito.innerHTML = '';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
};

// Muestra el carrito de comparas en el HTML
const carritoHTML = () => {
  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img class="imagen-curso u-full-width" src=${imagen} />
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id=${id} >X</a>
      </td>
    `;
    // Agregar el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
};

// Elimina los cursos del carrito
const eliminarCurso = (e) => {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    articulosCarrito.forEach((curso) => {
      if (curso.id === cursoId) {
        if (curso.cantidad > 1) {
          curso.cantidad -= 1;
        } else {
          articulosCarrito = articulosCarrito.filter(
            (curso) => curso.id !== cursoId
          );
        }
      }
    });

    carritoHTML();
  }
};

// Lee el contenido del HTML que le dimos click y extrae la información del curso
const leerDatosCurso = (curso) => {
  // Crear un objeto con el contenido del cruso actual
  const infoCurso = {
    // Podemos seleccionar el div e indicarle directamente lo que necesitamos
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('div h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Objeto actualizado
      } else {
        return curso; //Objeto no duplicado
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agregamos elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
};

// Mandamos al carro de compras
const agregarCurso = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
};

const cargarEventListeners = () => {
  // Cuando agregas un curso presionando agregar al Carrito
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

  // Vaciar carrito
  vaciarCarrito.addEventListener('click', () => {
    articulosCarrito.length = 0;
    limpiarHTML();
  });
};

cargarEventListeners();
