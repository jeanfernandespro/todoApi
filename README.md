# todoApi

## Instalação

Instale as dependencias do _**NODE-JS**_.
Crie um DB MYSQL com duas tabelas, a primeira chamada _tasks_ e a segunda _users_.

Set as config do DB igual o arquivo **.env.example**

## Tabela _tasks_

### id INT (com incrementação automática) | title varchar(150) | status varchar(150) | created_at varchar(45) | update_at varchar(45)

## Tabela _users_

### id INT (com incrementação automática) | username varchar(50) | real_name varchar(250) | phone varchar(50) | email varchar(100) | user_password varchar(50) | token varchar(600)

## Execução

No package.json está setado para ser exec com NPM START (vai exec o _nodemon_)
