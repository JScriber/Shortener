
DROP TABLE IF EXISTS public.link CASCADE;
CREATE TABLE public.link(
	id serial NOT NULL,
	hash varchar(255),
	url varchar(255),
	created_at date,
	id_user integer,
	CONSTRAINT link_id PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.link OWNER TO postgres;
-- ddl-end --

DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user"(
	id serial NOT NULL,
	name varchar(255),
	password varchar(255),
	salt varchar(255),
	token varchar(255),
	CONSTRAINT user_id PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public."user" OWNER TO postgres;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.link DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.link ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

