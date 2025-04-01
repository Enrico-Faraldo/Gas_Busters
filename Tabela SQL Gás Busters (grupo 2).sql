-- Criando database para o script

create database sprint01;

-- Colocar a database em uso

use sprint01;

/* 
Criando tabelas para: 
O usuário (idCadastro, cadastro, nome completo, email e senha para cadastro);
Para as empresas (idEmpresa, nome da empresa, quantidade de funcionários, nome do representante, fkcadastro);
Para os dados resgatados do sensor MQ-2
*/


create table Cadastro (
	idCadastro int not null primary key auto_increment,
    nome_completo varchar (35),
    email varchar (60),
    senha varchar (20),
    unique ix_email (email),
    constraint chkemail check (email like '%@%')
    ); 
    
create table Empresas (
	idEmpresa int not null primary key auto_increment,
    nome_empresa varchar (25),
    qtd_funcionarios int default null, 
    nome_representante varchar (15),
    unique ix_nome_empresa (nome_empresa),
    fkcadastro int,
    constraint chkFkCadastro foreign key (fkcadastro) references Cadastro(idCadastro)
    ); 
    
create table Sensor (
	idSensor int not null primary key auto_increment,
    porcentagem decimal (4,2),
    data_sensor date,
    hora time
    );
    
-- Inserindo dados em todas as tabelas como exemplo para demonstração

insert into Cadastro (nome_completo, email, senha)
	values ('Mariana Souza', 'mariana.souza@yahoo.com', 'M4r!@N@2023'),
		   ('Diogo Rodrigues Alves', 'diogo.alves@gmail.com', 'D!og64'),
		   ('Isabella Gomes Pinto', 'isabella.pinto@outlook.com', 'Isa0613#'),
           ('Sergio Alves Filho', 'sergio.filho@gmail.com', 'SPTech2210'),
           ('Paulo Guedes Dourado', 'paulo.dourado@hotmail,com', '170902##');
           
insert into Empresas (nome_empresa, nome_representante, fkcadastro) 
	values ('Yara Brasil', 'João', 1),
		   ('Bayer', 'Fernando', 2),
           ('Cibra', 'Julia', 3),
           ('Basf', 'João', 4),
           ('Braskem', 'Ana', 5);
           
insert into Sensor (porcentagem, data_sensor, hora)
	values (28.19, '2025-04-11', '14:38:18'),
		   (71.55, '2025-04-12', '19:42:10'),
           (96.82, '2025-04-14', '12:05:24'),
           (07.36, '2025-04-11', '16:48:03'),
           (52.71, '2025-04-13', '18:11:16');
           
-- Observando os dados inseridos em cada tabela

select idCadastro as 'ID', nome_completo as 'Nome Completo', email as 'E-mail', senha as 'Senha' from Cadastro;

select idEmpresa as 'ID', nome_empresa as 'Nome da Empresa', qtd_funcionarios as 'Quantidade de Funcionários', nome_representante as 'Representante' from Empresas;

select idSensor as 'ID', porcentagem as 'Porcentagem de Gás Combustível no Ar', data_sensor as 'Datas', hora as 'Horas' from Sensor;

-- Adicionando uma restrição onde a porcentagem não pode passar de 100 e não ser menor que 0

alter table Sensor add constraint chk_limite_porcentagem
	check (porcentagem < 100 and porcentagem > 0);
    
-- Validando se a restrição foi inserida


insert into Sensor (porcentagem, data_dado, hora)
	values (101.98, '2025-04-18', '19:23:11');
-- Error Code: 1264. Out of range value for column 'porcentagem' at row 1


-- Apresentar os dados da tabela Cadastro onde o email está em ordem crescente

select idCadastro as 'ID', nome_completo as 'Nome Completo', email as 'E-mail', senha as 'Senha' from Cadastro order by email asc;

-- Apresentar os dados da tabela Empresas onde o nome da empresa começa com a letra B

select idEmpresa as 'ID', nome_empresa as 'Nome da Empresa', qtd_funcionarios as 'Quantidade de Funcionários', nome_representante as 'Representante' from Empresas where nome_empresa like 'B%';

-- Atualizando os dados da coluna funcionários

update Empresas
set qtd_funcionarios = 1500
where idEmpresa = 1;

update Empresas
set qtd_funcionarios = 3400
where idEmpresa = 2;

update Empresas
set qtd_funcionarios = 5700
where idEmpresa = 3;

update Empresas
set qtd_funcionarios = 2100
where idEmpresa = 4;

update Empresas
set qtd_funcionarios = 8600
where idEmpresa = 5;

-- Verificando se os dados foram atualizados

select qtd_funcionarios as 'Quantidade de Funcionários' from Empresas;

-- Adicionando uma coluna 'Valor da empresa' na tabela Empresas

alter table Empresas add valor_empresa char(15) not null;

-- Inserindo dados nessa nova coluna

update Empresas 
set valor_empresa = 32000000000
where idEmpresa = 1;

update Empresas 
set valor_empresa = 52740000000
where idEmpresa = 2;

update Empresas 
set valor_empresa = 72421000000
where idEmpresa = 3;

update Empresas 
set valor_empresa = 117910000000
where idEmpresa = 4;

update Empresas 
set valor_empresa = 89230000000
where idEmpresa = 5;

-- colocando um case when para o valor da empresa ser 'Alto', 'Médio' ou 'Baixo'

select nome_empresa as 'Nome da Empresa', 
	case
		when valor_empresa < 35000000000 then 'Baixo'
		when valor_empresa between 50000000000 and 90000000000 then 'Médio'
		else 'Alto'
	end as 'Categoria Valor'
from Empresas;

-- Analisando os dados registrado no sensor no dia 11 de abril e salvo no bd

select idSensor as 'ID', porcentagem as 'Porcentagem de Gás Combustível no Ar', data_sensor as 'Datas', hora as 'Horas' from Sensor where data_sensor = '2025-04-11';

-- Colocando outro case when para identificar a gravidade do vazamento em 'Seguro', 'Cuidado', 'Certeza de possível vazamento' e 'Perigo Urgente'

select porcentagem as 'Porcentagem de Gás Combustível no Ar',
	case
		when porcentagem < 10.00 then 'Seguro'
        when porcentagem between 10.00 and 30.00 then 'Pode haver vazamento'
        when porcentagem between 30.00 and 60.00 then 'Certeza de possível vazamento'
        else 'Perigo Urgente'
	end as 'Nível de Perigo'
from Sensor;
