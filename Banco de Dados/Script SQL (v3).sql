-- criando e utilizando o database Gas_busters;
create database Gas_busters;
use Gas_busters;

-- criando a tabela Endereco, que conterá as informações referentes ao endereço das empresas;
create table Endereco(
idEndereco int primary key auto_increment,
estado varchar(50),
cidade varchar(50),
bairro varchar(45),
logradouro varchar(100),
numero int,
cep varchar(9)
);

-- criando a tabela Empresa com os dados sobre as empresas cadastradas;
create table Empresa(
idEmpresa int primary key auto_increment,
nome varchar(50),
cnpj varchar(18),
telefone varchar(20),
qtdPlataformas int,
fkEndereco int,
foreign key(fkEndereco) references Endereco(idEndereco),
unique ix_cnpj (cnpj)
);

-- criando a tabela Token, que irá fazer a conexão dos usuários com as respectivas empresas através do código;
create table Token(
idToken int primary key auto_increment,
codigo varchar(20),
fkEmpresa int not null,
foreign key(fkEmpresa) references Empresa(idEmpresa),
unique ix_codigo (codigo),
key ix_codigo_empresa (codigo, fkEmpresa)
)auto_increment = 500;

-- criando a tabela Usuario, que registrará os dados dos usuários cadastrados;
create table Usuario(
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(150),
senha varchar(255),
fkToken int not null,
foreign key(fkToken) references Token(idToken),
unique ix_email (email),
key ix_usuario_token (nome, fkToken),
key ix_usuario_email (nome, email)
);

-- criando a tabela Plataforma, que registrará as plataformas petroquímicas de cada empresa;
create table Plataforma(
idPlataforma int primary key auto_increment,
status varchar(10),
localizacao varchar(255),
fkEmpresa int not null,
foreign key(fkEmpresa) references Empresa(idEmpresa),
constraint chk_statusPlat check(status in('Ativa', 'Inativa'))
);

-- criando a tabela Sensor para registrar os sensores em cada plataforma;
create table Sensor(
idSensor int primary key auto_increment,
modelo varchar(15) default 'MQ-02',
status varchar(10) default 'Ativo',
posicionamento varchar(255),
fkPlataforma int not null,
foreign key(fkPlataforma) references Plataforma(idPlataforma),
constraint chk_statusSensor check(status in('Ativo', 'Inativo'))
);

-- criando a tabela Leitura para armazenar os dados coletados pelo sensor;
create table Leitura(
idLeitura int primary key auto_increment,
fkSensor int not null default 1,
quantidade decimal(5,2),
dataLeitura datetime,
foreign key(fkSensor) references Sensor(idSensor)
);

-- inserindo dados na tabela Endereco
insert into Endereco (estado, cidade, bairro, logradouro, numero, cep)
            values   ('São Paulo', 'São Paulo', 'Centro', 'Rua das Palmeiras', 100, '01000-000'),
                     ('Rio de Janeiro', 'Rio de Janeiro', 'Laranjeiras', 'Rua das Laranjeiras', 200, '22240-003'),
                     ('Bahia', 'Salvador', 'Barra', 'Av. Oceânica', 300, '40140-130'),
                     ('Paraná', 'Curitiba', 'Batel', 'Rua Buenos Aires', 400, '80240-120');
                     
-- inserindo dados na tabela Empresa
insert into Empresa (nome, cnpj, telefone, qtdPlataformas, fkEndereco)
            values  ('Petrobras', '11.111.111/0001-11', '(21) 98765-4321', 3, 1),
                    ('Shell Brasil', '22.222.222/0001-22', '(11) 91234-5678', 2, 2),
                    ('BR Distribuidora', '33.333.333/0001-33', '(71) 99887-6655', 1, 3),
                    ('Raízen', '44.444.444/0001-44', '(41) 91122-3344', 2, 4);
                    
-- inserindo dados na tabela Token
insert into Token (codigo, fkEmpresa)
		   values ('PETRO2025', 1),
                  ('SHELL2025', 2),
                  ('BRDIST2025', 3),
                  ('RAIZEN2025', 4);
                  
-- inserindo dados na tabela Usuario
insert into Usuario (nome, email, senha, fkToken)
            values  ('João Lima', 'joao.lima@petro.com', 'senha123', 500),
                    ('Ana Souza', 'ana.souza@shell.com', 'senha456', 501),
                    ('Carlos Oliveira', 'carlos.oliveira@br.com', 'senha789', 502),
                    ('Fernanda Reis', 'fernanda.reis@raizen.com', 'senha321', 503);
                    
-- inserindo dados na tabela Plataforma
insert into Plataforma (status, localizacao, fkEmpresa)
              values   ('Ativa', 'Bacia de Campos - RJ', 1),
                       ('Ativa', 'Bacia de Santos - SP', 1),
                       ('Inativa', 'Plataforma Norte - AM', 1),
                       ('Ativa', 'Campo de Lula - RJ', 2),
                       ('Inativa', 'Campo de Marlim - RJ', 2),
                       ('Ativa', 'Terminal de Candeias - BA', 3),
                       ('Ativa', 'Unidade de Paulínia - SP', 4),
                       ('Inativa', 'Unidade de Araucária - PR', 4);
                       
-- inserindo dados na tabela Sensor
insert into Sensor (status, posicionamento, fkPlataforma)
            values ('Ativo', 'Setor A', 1),
                   ('Inativo', 'Setor B', 2),
                   ('Ativo', 'Sala Técnica', 3),
                   ('Ativo', 'Sala de Controle', 4),
                   ('Ativo', 'Área Externa', 5),
                   ('Inativo', 'Subsolo', 6),
                   ('Ativo', 'Laboratório', 7),
                   ('Inativo', 'Estoque', 8);
                   
-- inserindo dados na tabela Leitura
insert into Leitura (fkSensor, quantidade, dataLeitura)
            values  (1, 18.5, '2025-04-13 08:00:00'),
                    (1, 20.3, '2025-04-13 09:00:00'),
                    (2, 10.1, '2025-04-13 10:00:00'),
                    (3, 5.7,  '2025-04-13 11:00:00'),
                    (4, 12.4, '2025-04-13 12:00:00'),
                    (5, 21.9, '2025-04-13 13:00:00'),
                    (6, 9.0,  '2025-04-13 14:00:00'),
                    (7, 16.6, '2025-04-13 15:00:00'),
                    (8, 11.3, '2025-04-13 16:00:00');

-- selecionando os dados de cada tabela separadamente;
select * from Endereco;
select * from Empresa;
select * from Token;
select * from Usuario;
select * from Plataforma;                    
select * from Sensor;
select * from Leitura;
                 