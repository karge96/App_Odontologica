<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcios-pagina">Llena el siguiente formulario</p>
<?php include_once __DIR__ . "/../templates/alertas.php"; ?>
<!--  -->
<form action="/crear-cuenta" class="formulario" method="POST">
    <div class="campo"> 
        <label for="nombre">Nombre:</label>
        <input type="text" value="<?php echo s($usuario->nombre); ?>" id="nombre" name="nombre" placeholder="nombre">
    </div>
    <div class="campo">
        <label for="apellido">Apellido:</label>
        <input type="text" value="<?php echo s($usuario->apellido); ?>" id="apellido" name="apellido" placeholder="apellido">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input type="tel" value="<?php echo s($usuario->telefono); ?>" id="telefono" name="telefono" placeholder="telefono">
    </div>
    <div class="campo">
        <label for="email">Email:</label>
        <input type="email" id="email" value="<?php echo s($usuario->email); ?>" name="email" placeholder="email">
    </div>
    <div class="campo">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password">
    </div>
    <input type="submit" value="Crear Cuenta" class="boton">
</form>
<div class="acciones">
    <a href="/">Inicia sesión aquí</a>
    <a href="/olvide">¿Olvidaste tu password?</a>
</div>