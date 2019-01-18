
DROP TABLE IF EXISTS public.link CASCADE;
CREATE TABLE public.link(
	id serial NOT NULL,
	hash varchar(255),
	url varchar(255),
	created_at date,
	id_s_user integer,
	CONSTRAINT link_id PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.link OWNER TO postgres;
-- ddl-end --

DROP TABLE IF EXISTS public."s_user" CASCADE;
CREATE TABLE public."s_user"(
	id serial NOT NULL,
	name varchar(255),
	password text,
	salt text,
	token text,
	CONSTRAINT s_user_id PRIMARY KEY (id),
	UNIQUE(name)
);
-- ddl-end --
ALTER TABLE public."s_user" OWNER TO postgres;
-- ddl-end --

-- object: s_user_fk | type: CONSTRAINT --
-- ALTER TABLE public.link DROP CONSTRAINT IF EXISTS s_user_fk CASCADE;
ALTER TABLE public.link ADD CONSTRAINT s_user_fk FOREIGN KEY (id_s_user)
REFERENCES public."s_user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

