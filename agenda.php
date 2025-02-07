<?php

include('config.php');

header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Credentials:true');
header ('Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS');
header ('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header ('ContentType:application/json; charset=utf-8');


$post = json_decode(file_get_contents('php://input'), true);

if($post['action'] == "login"){
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona = '%s' AND clave_persona = '%s'", $post['usuario'], $post['clave']);
    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0){
        $row = mysqli_fetch_array($rs);
        $datos = array(
            'codigo' => $row['cod_persona'],
            'nombre'=> $row['nom_persona'].' '.$row['ape_persona']
        );
        $respuesta = json_encode(array('estado' => true, 'persona' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, "mensaje" => 'Error de usuario o de clave'));
    }
    echo $respuesta; // Asegúrate de enviar la respuesta
}

if($post['action'] == "vcedula"){
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona = '%s'", $post['cedula']);
    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0){
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Cedula ya existe'));
    }else{
        $respuesta = json_encode(array('estado' => true));
    }

    echo $respuesta;
}

if($post['action'] == 'cuenta'){
    $sentencia = sprintf("INSERT INTO persona (ci_persona, nom_persona, ape_persona, clave_persona, correo_persona, estado)
    VALUES ('%s','%s','%s','%s','%s', 1)", $post['cedula'],$post['nombre'],$post['apellido'],$post['clave'],$post['correo']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Registro exitoso'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al registrar'));
    }
    echo $respuesta;
}

if($post['action'] == 'lcontactos'){
    $sentencia = sprintf("SELECT * FROM contacto WHERE persona_cod_persona = '%s'", $post['codigo']);
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos[] = array(
                'codigo' => $row['cod_contacto'],
                'nombre' => $row['nom_contacto'] ." ". $row['ape_contacto'],
                'telefono' => $row['telefono_contacto']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay contactos'));
    }
    echo $respuesta;
}

if($post['action'] == 'nuevoc'){
    $sentencia = sprintf("INSERT INTO contacto (nom_contacto, ape_contacto, telefono_contacto, email_contacto, persona_cod_persona, estado)
    VALUES ('%s', '%s', '%s', '%s', '%s', 1)", $post['nombre'],$post['apellido'],$post['telefono'],$post['correo'],$post['cod_persona']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Registro exitoso'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al registrar'));
    }
    echo $respuesta;
}

if($post['action'] == 'vtelefono'){
    $sentencia = sprintf("SELECT cod_contacto FROM contacto WHERE telefono_contacto = '%s' and persona_cod_persona = '%s'", $post['telefono'], $post['cod_persona']);
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Telefono ya existe'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Telefono puede guardarse'));
    }
    echo $respuesta;
}


if($post['action'] == 'acontacto'){
    $sentencia = sprintf("UPDATE contacto set nom_contacto='%s', ape_contacto='%s',
    telefono_contacto = '%s', email_contacto='%s' WHERE cod_contacto='%s'",
    $post['nombre'],
    $post['apellido'],
    $post['telefono'],
    $post['correo'],
    $post['cod_contacto']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Actualizacion exitosa'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar'));
    }
    echo $respuesta;
}

if($post['action'] == 'dcontacto'){
    $sentencia = sprintf("SELECT * FROM contacto WHERE cod_contacto = '%s'", $post['cod_contacto']);
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos = array(
                'nombre' => $row['nom_contacto'],
                'apellido' => $row['ape_contacto'],
                'telefono' => $row['telefono_contacto'],
                'correo' => $row['email_contacto']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay contactos'));
    }
    echo $respuesta;
}
if($post['action'] == 'econtacto'){
    $sentencia = sprintf("DELETE FROM contacto WHERE cod_contacto = '%s'", $post['cod_contacto']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Eliminacion exitosa'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar'));
    }
    echo $respuesta;
}

if($post['action'] == 'aperfil'){
    $sentencia = sprintf("UPDATE persona set nom_persona='%s', ape_persona='%s',
    correo_persona = '%s', clave_persona='%s' WHERE cod_persona='%s'",
        $post['nombre'],
        $post['apellido'],
        $post['correo'],
        $post['clave'],
        $post['cod_persona']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Actualizacion correcta'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar'));
    }
    echo $respuesta;
}

if($post['action'] == 'dpersona'){
    $sentencia = sprintf("SELECT * FROM persona WHERE cod_persona = '%s'", $post['cod_persona']);
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos = array(
                'nombre' => $row['nom_persona'],
                'apellido' => $row['ape_persona'],
                'correo' => $row['correo_persona']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay contactos'));
    }
    echo $respuesta;
}

if($post['action'] == 'rcuenta'){
    $sentencia = sprintf("SELECT * FROM persona WHERE correo_persona = '%s'", $post['correo']);
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos = array(
                'codigo' => $row['cod_persona'],
                'nombre' => $row['nom_persona'],
                'apellido' => $row['ape_persona'],
                'correo' => $row['correo_persona']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay contactos'));
    }
    echo $respuesta;
}
if($post['action'] == 'sclave'){
    $sentencia = sprintf("UPDATE persona set clave_persona='%s' WHERE cod_persona='%s'",
        $post['clave'],
        $post['cod_persona']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Cuenta recuperada'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error'));
    }
    echo $respuesta;
}


?>