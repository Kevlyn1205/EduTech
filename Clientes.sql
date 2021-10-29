Create database Clientes

use Clientes

create table Clientes(
Codigo int identity(1001,1) primary key,
Nombre varchar(35) not null,
Telefono varchar(9),
Email varchar(25)
);
select * from Clientes