<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo password</p>
<?php include __DIR__ . "/../templates/alertas.php"; ?>
<form action="" method="POST" class="formulario">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password"
        placeholder="Ingresa tu password">
    </div>
    <input type="submit" class="boton" value="Guardar">
</form>
<div class="acciones">
    <a href="/">Inicia Sesión Aquí</a>
    <a href="/">Obtener una Cuenta</a>
</div>