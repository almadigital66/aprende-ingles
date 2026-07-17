// Cambiar entre pestañas de Login y Registro
function cambiarTab(tipo) {
  const tabLogin = document.getElementById('tab-login');
  const tabRegistro = document.getElementById('tab-registro');
  const formLogin = document.getElementById('form-login');
  const formRegistro = document.getElementById('form-registro');

  if (tipo === 'login') {
    tabLogin.classList.add('activo');
    tabRegistro.classList.remove('activo');
    formLogin.classList.remove('oculto');
    formRegistro.classList.add('oculto');
  } else {
    tabRegistro.classList.add('activo');
    tabLogin.classList.remove('activo');
    formRegistro.classList.remove('oculto');
    formLogin.classList.add('oculto');
  }
}

// LOGIN
document.getElementById('form-login').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  errorEl.textContent = '';

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      errorEl.textContent = traducirError(error.code);
    });
});

// REGISTRO
document.getElementById('form-registro').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('registro-nombre').value;
  const email = document.getElementById('registro-email').value;
  const password = document.getElementById('registro-password').value;
  const errorEl = document.getElementById('registro-error');
  errorEl.textContent = '';

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.updateProfile({ displayName: nombre });
    })
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      errorEl.textContent = traducirError(error.code);
    });
});

// Traducción básica de errores comunes de Firebase al español
function traducirError(code) {
  const errores = {
    'auth/email-already-in-use': 'Este correo ya está registrado.',
    'auth/invalid-email': 'El correo no es válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.'
  };
  return errores[code] || 'Ocurrió un error. Intenta de nuevo.';
}