-- Criando database para o script
create database sprint2;
drop database sprint2;


-- Colocar a database em uso
use sprint2;


/* 
Criando tabelas para os dados resgatados do sensor MQ-2
*/

create table empresa (
idEmpresa							int primary key auto_increment,
nomeFantasia							varchar(50) not null,
cnpjEmpresa							char(18) unique not null,
emailEmpresa							varchar(50) not null,						
telefoneContatoEmpresa						char(10) not null,
logradouroEmpresa						varchar(50) not null,
bairroEmpresa							varchar(50) not null,
numeroEnderecoEmpresa						int not null,
cidadeEmpresa							varchar(30) not null,
estadoSiglaEmpresa						char(2) not null,
cepEmpresa							char(9) not null,
constraint chkemail_empresa 					check (emailEmpresa like '%@%')
); 





create table funcionario (
idFuncionario							int primary key auto_increment,
nomecompletoFuncionario						varchar(50) not null,
cpfFuncionario							char(14) not null,
funcaoFuncionario						varchar(50) not null,
telefoneContatoFuncionario					char(11) not null,
emailProfissionalFuncionario 					varchar(100) not null,
senhaFuncionario						varchar(100) not null,
fkfuncionario_empresa						int,
unique								ixCadastro (cpfFuncionario, emailProfissionalFuncionario, senhaFuncionario),
constraint chkemail 						check (emailProfissionalFuncionario like '%@%'),
constraint chkfuncionario					foreign key fk_funcionario_empresa(fkfuncionario_empresa) references empresa(idEmpresa)
);





create table sensor (
idSensor 							int primary key auto_increment,
porcentagem 							decimal (5,2),
data_sensor 							datetime
);




create table aquisiçãoSensor (
idAquisição							int not null,
fkaquisição_funcionario						int not null,
fkaquisição_sensor						int not null,    
quantSensor							int not null,
valUnitário							decimal (10,2),
primary key							(idAquisição, fkaquisição_funcionario),
constraint chkaquisição_funcionario 				foreign key fk_aquisição_funcionario(fkaquisição_funcionario) references empresa(idEmpresa),
constraint chkquisição_sensor 					foreign key fk_aquisição_sensor(fkaquisição_sensor) references Sensor(idSensor)
);




-- Inserindo dados em todas as tabelas como exemplo para demonstração. 
-- Ademais, realizando uma simulação de cadastro na tabela "empresa" e "funcionario":

-- tabela empresa
insert into empresa (nomeFantasia, cnpjEmpresa, emailEmpresa, telefoneContatoEmpresa, logradouroEmpresa, bairroEmpresa, numeroEnderecoEmpresa, cidadeEmpresa, estadoSiglaEmpresa, cepEmpresa) 
	values 	('Tech Solutions', '12.345.678/0001-90', 'techsolutions@marketplus', '1127654321', 'Avenida Paulista', 'Rua das Inovações', 100, 'São Paulo', 'SP', '01010-000'),
		('PetroTech', '28.675.787/8534-79', 'petrotech@proton', '1124552365', 'Praça dos Portos', 'Rua dos Varejos', 345, 'São Paulo', 'SP', '34212-120'),
		('PeTech Solutions', '45.967.423/4003-23', 'petechsolutions@razard', '1125637653', 'Avenida Cruzeiro do Sul', 'Rua Nova II', 575, 'São Paulo', 'SP', '07644-232'),
           	('ChemistryTech', '76.879.453/6745-98', 'chemistrytech@marketplus', '1123467658', 'Praça Patios', 'Rua Praça da Cantareira', 245, 'São Paulo', 'SP', '34553-564'),
           	('BreakingPetro', '67.754.967/5341-34', 'breakingpetro@hoggi', '1122369867', 'Travessa da Serra', 'Rua Nova Serra', 234, 'São Paulo', 'SP', '04553-098');

           
 -- tabela funcionário          
insert into funcionario (nomecompletoFuncionario, cpfFuncionario, funcaoFuncionario, telefoneContatoFuncionario, emailProfissionalFuncionario, senhaFuncionario, fkfuncionario_empresa)
	values 	('Airton Santos', '253.652.365-45', 'Operador de Planta Química', '11927654321', 'airton.santos@petroquimica', "213342aas1", 1),
	      	('Alexandre Caron', '452.232.456-53', 'Técnico de Manutenção Industrial', '11974552365', 'alexandre.caron@petro.gas', "sada2112c", 2),
	      	('Douglas Alexandre', '343.465.232-34', 'Engenheiro de Processos', '11935637653', 'douglas.A@petro.quimica', "21csaas21", 3),
          	('Ana Rose', '123.342.232-32', 'Analista de Qualidade', '11963467658', 'anarose.quimic@petro', "sa2scc21", 4),
           	('Rafael Ribeiro Rocha', '232.234.341-98', 'Executivo de Vendas (B2B)', '11952369867', 'rrr.petroquimica@quimicapetro', "qwsa2323d23", 5);
           
      
 -- tabela sensor          
insert into sensor (porcentagem, data_sensor)
	values 	(28.19, '2025-04-11 14:38:18'),
		(71.55, '2025-04-12 19:42:10'),
           	(96.82, '2025-04-14 12:05:24'),
           	(07.36, '2025-04-11 16:48:03'),
           	(52.71, '2025-04-13 18:11:16');
           
           
-- tabela de aquisição(ões) do sensor          
insert into aquisiçãoSensor (idAquisição, fkaquisição_funcionario, fkaquisição_sensor, quantSensor, valUnitário) 
	values 	(1, 1, 1, 100, 4000.00),
		(2, 2, 2, 87, 3480.00),
           	(3, 3, 3, 200, 8000.00),
           	(4, 4, 4, 56, 2240.00),
           	(5, 5, 5, 500, 20000.00);
		 

           

-- Fazendo uma simulação de Login:
select emailProfissionalFuncionario, senhaFuncionario from funcionario where idFuncionario = 3;



-- Observando os dados inseridos em cada tabela
select * from funcionario;

select * from empresa;

select * from sensor;

select idAquisição as 'Id da aquisição', fkaquisição_funcionario as 'Id do funcionário responsável pela aquisição', fkaquisição_sensor as 'Id do sensor',
quantSensor as 'Quantidade de sensor(es) adquirido(s)', valUnitário as 'Valor unitário do(s) sensor(es)' from aquisiçãoSensor;



-- Adicionando uma restrição onde a porcentagem não pode passar de 100 e não ser menor que 0
alter table sensor add constraint chk_limite_porcentagem check (porcentagem > 0 and porcentagem < 100);
   
   
   
-- Validando se a restrição foi inserida
update sensor set porcentagem = 100.10 where idSensor = 1;
-- Error Code: 3819. Check constraint 'chk_limite_porcentagem' is violated.



-- Apresentar os dados da tabela funcionario onde o email está em ordem crescente
select * from funcionario order by emailProfissionalFuncionario asc;



-- Apresentar os dados da tabela Empresas onde o nome da empresa começa com a letra B
select * from empresa where nomeFantasia like 'P%';



-- Analisando os dados registrado no sensor no dia 11 de abril e salvo no bd
select idSensor as 'ID', porcentagem as 'Porcentagem de Gás Combustível no Ar', data_sensor as 'Data e Hora' from sensor where data_sensor = '2025-04-11 14:38:18';



-- Colocando outro case when para identificar a gravidade do vazamento em 'Seguro', 'Cuidado', 'Certeza de possível vazamento' e 'Perigo Urgente'
select porcentagem as 'Porcentagem de Gás Combustível no Ar',
	case
		when porcentagem < 10.00 then 'Seguro'
       		when porcentagem between 10.00 and 30.00 then 'Pode haver vazamento'
        	when porcentagem between 30.00 and 60.00 then 'Certeza de vazamento'
        	else 'Perigo Urgente'
	end as 'Nível de Perigo'
from sensor;



-- criando um Inner Join para a plena observação de todos os dados em uma só colocação  
select
	nomecompletoFuncionario as 'Nome completo do funcionário', cpfFuncionario as 'CPF do funcionário', funcaoFuncionario as 'Função do funcionário',
    	telefoneContatoFuncionario as 'Telefone de contado do funcionário', emailProfissionalFuncionario as 'E-mail profissional do funcionário (e site)',
	senhaFuncionario as 'Senha do funcionário (site)', nomeFantasia as 'Nome Fantasia da empresa do funcionário', cnpjEmpresa as 'CNPJ da empresa',
	emailEmpresa as 'E-mail da empresa', telefoneContatoEmpresa as 'Telefone de contato da empresa', logradouroEmpresa as 'Logradoura da empresa',
	bairroEmpresa as 'Bairro da empresa', numeroEnderecoEmpresa as 'Número de endereço da empresa', cidadeEmpresa as 'Cidade da empresa', 
	estadoSiglaEmpresa as 'Sigla do estado da empresa', cepEmpresa as 'CEP da empresa', idSensor as 'Id do sensor em atividade',
	porcentagem as 'Porcentagem da detecção', data_sensor as 'Data e hora da detecção',
	quantSensor as 'Quantidade de sensor(es) adquirido(s)', valUnitário as 'Valor Unitário do(s) sensor(s)' 
from aquisiçãoSensor as aqSens
	
inner join sensor as sen on sen.idSensor = aqSens.fkaquisição_sensor
inner join funcionario as func on func.idFuncionario = aqSens.fkaquisição_funcionario
inner join empresa as emp on emp.idEmpresa = func.fkfuncionario_empresa;					
