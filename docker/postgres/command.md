# Setup the database
Launch in the docker folder:
```
docker-compose -p shortener up
```

Then launch:
```
docker exec -it shortener psql -U postgres
```

You can now set the structure of the database by pasting:
```SQL
CREATE TABLE public.link(
	hash varchar(255) NOT NULL,
	url varchar(255),
	visits smallint,
	CONSTRAINT hash PRIMARY KEY (hash)
);

ALTER TABLE public.link OWNER TO postgres;
```
