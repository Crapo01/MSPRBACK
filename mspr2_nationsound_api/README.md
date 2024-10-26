# MSPR2 nationsound API MYSQL

eclipse with springboot initializer

java project, maven

dependencies:
Spring web  
Spring Data Jpa
MySQL Driver
Lombok


source: https://www.youtube.com/watch?v=vpf4LB54rVw

## application.properties

https://stackoverflow.com/questions/71518442/cannot-load-driver-class-jdbcmysql-localhost3306-mydatabase

//connect to db  

spring.datasource.url=jdbc:mysql://localhost:3306/nationsound  
spring.datasource.username=root  
spring.datasource.password=  
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver  
spring.jpa.show-sql: true   
 
 

//auto create tables  

spring.jpa.hibernate.ddl-auto=update  

## project structure

/banking_api_mysql/src/main/java/com/capus

add packages:

controller  
entity  
repository  
service>serviceimpl  
dto  
mapper  
  



