CREATE TABLE public.link(
	hash varchar(255) NOT NULL,
	url varchar(255),
	visits smallint,
	CONSTRAINT hash PRIMARY KEY (hash)
);

ALTER TABLE public.link OWNER TO postgres;
