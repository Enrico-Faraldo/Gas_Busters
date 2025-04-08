create table empresa (
    idEmpresa int primary key auto_increment,
    nome varchar(100),
    cnpj varchar(20),
    endereco varchar(150)
);

create table funcionario (
    idFuncionario int primary key auto_increment,
    nome varchar(100),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table arduino (
    idArduino int primary key auto_increment,
    modelo varchar(45) default 'uno r3',
    valor_lido decimal(5,2),
    fkEmpresa int,
    fkFuncionario_responsavel int,
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkFuncionario_responsavel) references funcionario(idFuncionario)
);

create table leitura_sensor (
    idLeitura int primary key auto_increment,
    fkArduino int,
    valor_lido decimal(5,2),
    data_hora datetime,
    foreign key (fkArduino) references arduino(idArduino)
);
