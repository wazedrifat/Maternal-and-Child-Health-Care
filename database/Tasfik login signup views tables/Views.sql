create or replace view person_info_view
(
	"PERSON_ID",
	"NAME",
	"DATE_OF_BIRTH",
	"NATIONALITY",
	"BLOOD_GROUP",
	"RELIGION",
	"GENDER"
) as
select PERSON_ID,NAME,
	   DATE_OF_BIRTH,NATIONALITY,
	   BLOOD_GROUP,RELIGION,GENDER
from person

create or replace view person_contacts_view
(
	"PERSON_ID",
	"NAME",
	"EMAIL_ADDRESS",
	"NATIONALITY",
	"CITY",
	"ZIP_CODE",
	"STREET_NAME",
	"APARTMENT_NO"
) as
select PERSON_ID,NAME,
	   EMAIL_ADDRESS,NATIONALITY,
	   CITY,ZIP_CODE,STREET_NAME,
	   APARTMENT_NO
from person

create or replace view person_after_1990_view
(
	"PERSON_ID",
	"NAME",
	"DATE_OF_BIRTH",
	"EMAIL_ADDRESS",
	"NATIONALITY",
	"BLOOD_GROUP",
	"RELIGION",
	"GENDER",
	"CITY",
	"ZIP_CODE",
	"STREET_NAME",
	"APARTMENT_NO"
) as
select PERSON_ID,NAME,
	   DATE_OF_BIRTH,EMAIL_ADDRESS,
	   NATIONALITY,BLOOD_GROUP,RELIGION,
	   GENDER,CITY,ZIP_CODE,STREET_NAME,
	   APARTMENT_NO
from person
where DATE_OF_BIRTH > to_date('01/01/1990','dd/mm/yyyy')
with check option constraint birthdate_before_1990;




















