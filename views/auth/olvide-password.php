<h1 class="nombre-pagina">Olvide Password</h1>
<p class="descripcion-pagina">Restablece tu password aquí</p>
<?php include __DIR__ . "/../templates/alertas.php"; ?>
<form method="POST" action="/olvide" class="formulario">
    <div class="campo">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="email">
    </div>
    <input type="submit" value="Enviar" class="boton">
</form>
<div class="acciones">
    <a href="/crear-cuenta">Si aún no tienes una cuenta, crea una aquí</a>
    <a href="/">Inicia sesión aquí</a>
</div>