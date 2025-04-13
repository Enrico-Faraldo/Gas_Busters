-- criando e usando o database 'Gas_busters', que será utilizado no projeto;
create database Gas_busters;
use Gas_busters;

-- criando a tabela Endereco para guardar a localização das empresas inseridas futuramente;
create table Endereco(
idEndereco int primary key auto_increment,
estado varchar(45),
cidade varchar(50),
bairro varchar(50),
logradouro varchar(50),
numero int,
cep varchar(9)
);

-- criando a tabela Empresa que será utilizada para o cadastro das empresas parceiras;
create table Empresa(
idEmpresa int primary key auto_increment,
nome varchar(30),
telefone varchar(20),
cnpj varchar(18),
fkEndereco int,
foreign key(fkEndereco) references Endereco(idEndereco)
);

-- criando a tabela Setor que ajudará a identificar os usuários de cada empresa de acordo com o respectivo setor;
create table Setor(
idSetor int not null,
fkEmpresa int not null,
nomeSetor varchar(30),
foreign key (fkEmpresa) references Empresa(idEmpresa),
primary key(idSetor, fkEmpresa)
);

-- criando a tabela Usuario que guardará informações sobre o cadastro de funcionários de diferentes empresas;
create table Usuario(
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(100),
senha varchar(255),
fkSetor int,
fkEmpresa int,
foreign key(fkSetor, fkEmpresa) references Setor(idSetor, fkEmpresa)
);


-- criando a tabela Sensor que registrará os sensores de cada empresa com a coluna de localização, que ajudará
-- a identificar onde os sensores foram instalados, para adotar medidas de segurança nos locais com vazamento;
create table Sensor(
idSensor int primary key auto_increment,
modelo varchar(20),
status varchar(20),
localizacao varchar(150),
fkEmpresa int,
foreign key(fkEmpresa) references Empresa(idEmpresa),
constraint chk_status check(status in('Ativo', 'Inativo'))
);


-- criando a tabela Leitura que armazenará os dados coletados pelos sensores em diversas empresas;
-- NOTA: foi adicionado o default 1 na coluna fkSensor para demonstração com a API, pois dessa forma evitamos
-- conflito já que utilizaremos apenas um sensor para realizar os testes;
create table Leitura(
idLeitura int not null auto_increment,
fkSensor int not null default 1,
quantidade decimal(5,2),
data_leitura datetime,
foreign key (fkSensor) references Sensor(idSensor),
primary key(idLeitura, fkSensor)
);

-- criando alguns índices nas tabelas para uma melhor organização, podendo facilitar a visualização dos dados;
create index ix_usuario_empresa on Usuario(fkEmpresa);
create index ix_usuario_setor on Usuario(fkSetor, fkEmpresa);
create index ix_sensor_empresa on Sensor(fkEmpresa);
create index ix_leitura_sensor on Leitura(fkSensor);
create index ix_data_leitura on Leitura(data_leitura);

-- inserindo dados na tabela Endereço;
insert into Endereco (estado, cidade, bairro, logradouro, numero, cep)
			  values ('SP', 'São Paulo', 'Vila Mariana', 'Rua Domingos de Morais', 1234, '04010-001'),
                     ('RJ', 'Rio de Janeiro', 'Copacabana', 'Av. Atlântica', 567, '22010-000');

-- inserindo dados na tabela Empresa;                     
insert into Empresa (nome, telefone, cnpj, fkEndereco)
             values ('GasTech', '(11) 91234-5678', '12.345.678/0001-90', 1),
                    ('EcoGás', '(21) 99876-5432', '98.765.432/0001-12', 2);

-- inserindo dados na tabela Setor;                    
insert into Setor (idSetor, fkEmpresa, nomeSetor)
          values  (1, 1, 'Manutenção'),
                  (2, 1, 'Segurança'),
                  (1, 2, 'Operações');

-- inserindo dados na tabela Usuario;                  
insert into Usuario (nome, email, senha, fkSetor, fkEmpresa)
             values ('João Silva', 'joao@gastech.com', 'senha123', 1, 1),
                    ('Maria Oliveira', 'maria@gastech.com', 'senha456', 2, 1),
                    ('Carlos Souza', 'carlos@ecogas.com', 'senha789', 1, 2);
 
-- inserindo dados na tabela Sensor; 
insert into Sensor (modelo, status, localizacao, fkEmpresa)
            values ('MQ-02', 'Ativo', 'Sala 1 - Perto do botijão', 1),
                   ('MQ-02', 'Inativo', 'Sala 2 - Entrada', 1),
                   ('MQ-02', 'Ativo', 'Depósito de cilindros', 2);

-- inserindo dados na tabela Leitura;                   
insert into Leitura (idLeitura, fkSensor, quantidade, data_leitura)
		     values (1, 1, 35.50, '2025-04-10 14:00:00'),
                    (2, 1, 36.10, '2025-04-10 15:00:00'),
                    (3, 3, 45.00, '2025-04-10 14:30:00');                   

-- utilizando o select em cada tabela separadamente;                   
select * from Endereco;
select * from Empresa;
select * from Setor;
select * from Usuario;
select * from Sensor;
select * from Leitura;

-- selecionando o nome da empresa onde o fkEndereco é igual a 1;
select nome from Empresa where fkEndereco = 1;

-- selecionando o email do usuario que pertence ao setor com id 1 da empresa com id 1;
select email from Usuario where (fkEmpresa, fkSetor) = (1, 1);

-- selecionando o nome dos funcionarios de todas as empresas;
select u.nome, e.nome from Usuario u
inner join Empresa e on e.idEmpresa = u.fkEmpresa;

-- selecionando a data da leitura e a localização de cada sensor registrado;
select s.idSensor, s.localizacao, l.data_leitura from Leitura l
inner join Sensor s on s.idSensor = l.fkSensor;
            

