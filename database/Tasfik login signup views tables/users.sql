create table users
(
	name varchar2(100) not null,
	password varchar2(100) not null,
	email varchar2(100) not null,
	role varchar2(100) not null,
constraint users_pk primary key(email)
)
insert into user_requests values ('Tasfik','tasfik123','tasfik2@gmail.com','ADMIN');
insert into user_requests values ('Tasfik','tasfik123','tasfik@gmail.com','DEVELOPER');
insert into user_requests values ('Wazed','wazed123','wazed@gmail.com','DEVELOPER');
create table user_requests
(
	name varchar2(100) not null,
	password varchar2(100) not null,
	email varchar2(100) not null,
	role varchar2(100) not null,
	permission varchar2(100) not null,
constraint user_requests_pk primary key(email )
)

insert into user_requests values ('Tahsin','tahsin123','tahsin@gmail.com','DEVELOPER','DENIED');
insert into user_requests values ('Zenith','zenith123','zenith@gmail.com','DEVELOPER','DENIED');
insert into user_requests values ('Rafi','rafi123','rafi@gmail.com','DEVELOPER','DENIED');

CREATE OR REPLACE TRIGGER TriggerUsers
after update of permission
ON user_requests
FOR EACH ROW
when (new.permission = 'GRANTED')
BEGIN
insert into users  
values(
:old.name,
:old.password,
:old.email,
:old.role
);
END;



create table user_view
(
	view_name varchar2(100),
	email varchar2(100)
constraint user_requests_pk primary key(email,view_name)
)

insert into user_view values
(
'person_info_view',
'wazed@gmail.com'
)

insert into user_view values
(
'person_contacts_view',
'zenith@gmail.com'
)

insert into user_view values
(
'person_after_1990_view',
'niloy@gmail.com'
)


insert into user_view values
(
'person_after_1990_view',
'tahsin@gmail.com'
)
insert into user_view values
(
'person_contacts_view',
'tahsin@gmail.com'
)


insert into user_view values
(
'person_info_view',
'wazed@gmail.com'
)

insert into user_view values
(
'person_after_1990_view',
'wazed@gmail.com'
)

create table timeline
(
id 	varchar2(100),
news 	varchar2(100),
constraint timeline_pk primary key(id)
)

insert into timeline values('news_1001','person_info_view');

insert into timeline values('news_1002','person_contacts_view');

insert into timeline values('news_1003','person_after_1990_view');







