<?php namespace Classes;
use PHPMailer\PHPMailer\PHPMailer;
class Email{
    public $email;
    public $nombre;
    public $token;
    public function __construct($email,$nombre,$token){
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }
    public function enviarConfirmacion(){
        // crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'c21a25f96021c0';
        $mail->Password = '1d798341396ea7';
        $mail->setFrom('cuentas@odontologia.com');
        $mail->addAddress('cuentas@odontologia.com', 'odontologia.com');
        $mail->Subject = 'Confirma tu cuenta';
        // set html
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';
        $contenido = '<html>';
        $contenido .= "<p><strong>Hola " . $this->email .  "</strong> Has Creado tu cuenta en App Salón, solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a>";        
        $contenido .= "<p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>";
        $contenido .= '</html>';
        $mail->Body = $contenido;
        //Enviar el mail
        $mail->send();
    }
    public function enviarInstrucciones() {
       // create a new object
       $mail = new PHPMailer();
       $mail->isSMTP();
       $mail->Host = 'smtp.mailtrap.io';
       $mail->SMTPAuth = true;
       $mail->Port = 2525;
       $mail->Username = 'c21a25f96021c0';
       $mail->Password = '1d798341396ea7';
       $mail->setFrom('cuentas@odontologia.com');
       $mail->addAddress('cuentas@odontologia.com', 'odontologia.com');
       $mail->Subject = 'Reestablece tu password';
       // Set HTML
       $mail->isHTML(TRUE);
       $mail->CharSet = 'UTF-8';
       $contenido = '<html>';
       $contenido .= "<p><strong>Hola " . $this->nombre .  "</strong> Has solicitado reestablecer tu password, sigue el siguiente enlace para hacerlo.</p>";
       $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/recuperar?token=" . $this->token . "'>Reestablecer Password</a>";        
       $contenido .= "<p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>";
       $contenido .= '</html>';
       $mail->Body = $contenido;
        //Enviar el mail
       $mail->send();
    }
}