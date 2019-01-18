# Database
## Setup the container

First navigate to the **docker folder** using the terminal. From the root of the project you simply have to type:
```
cd docker/
```

Once in the docker folder, you should find a `docker-compose.yml` file. To tell docker to *execute* it, run the following command:
```
docker-compose -p shortener up
```
> /!\ It may take some time if you don't have the image of Postgrès installed on your machine.

Open another terminal and launch:
```
docker exec -it shortener psql -U postgres
```

Now you should be inside Postgres' CLI. You can now set the structure of the database by pasting:
```SQL
DROP TABLE IF EXISTS public.link CASCADE;
CREATE TABLE public.link(
	id serial NOT NULL,
	hash varchar(255),
	url varchar(255),
	visits integer,
	created_at date,
	id_s_user integer,
	CONSTRAINT link_id PRIMARY KEY (id)

);
ALTER TABLE public.link OWNER TO postgres;

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
ALTER TABLE public."s_user" OWNER TO postgres;

ALTER TABLE public.link ADD CONSTRAINT s_user_fk FOREIGN KEY (id_s_user)
REFERENCES public."s_user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
```

## Delete the container
> Only when you want to remove the application completely from your machine.
```
docker container stop shortener
docker container rm shortener
```

# Launch the project
## Classic start
```
npm run serve
```

## Testing
```
npm run test
```

# Gist of the project
This API works as [Google Shortener](https://goo.gl/). That's to say you can convert a long URL into a short unreadable URL. Also, you can know how many people clicked on your link.

## User creation
### Create a user
In order to create a user, you have to pass two elements to the API. A name and a password.
This can be done by requesting :

```
POST: http://127.0.0.1:8000/user/
```

With a body structured like this:
```JSON
{
  "name": "My name",
  "password": "P@ssword"
}
```

### Login

In order to login in, you have to pass two elements to the API. The name and the password.
This can be done by requesting :

```
GET: http://127.0.0.1:8000/user/login
```

Body:
```JSON
{
  "name": "My name",
  "password": "P@ssword"
}
```

As a response you should get a **token**, used later to access secured routes.

### Delete a user

The API also allows you to delete a user.
```
DELETE: http://127.0.0.1:8000/user/:id
```

With the header:
```JSON
"Authorization": "TOKEN"
```
where the token is the token retrieved during login.

### Update the user
You can modify the informations of the user.
```
PUT: http://127.0.0.1:8000/user
```
Body:
```JSON
{
  "name": "new name",
  "password": "new password"
}
```
> Don't forget the authorization header.

### Informations on current user
It's possible to get informations on the current user.
To do so, request:
```
GET: http://127.0.0.1:8000/user/current
```
> Don't forget the authorization header.

## Commands associate to a link
### Create a URL

In order to create your link, you have to pass two elements to the API. A URL and a name.
This can be done by requesting:
```
POST: http://127.0.0.1:8000/link/
```

With a body structured like this:
```JSON
{
  "url": "http://my-url.com"
}
```

As a response you should get:
```JSON
"http://127.0.0.1:8000/link/HASH"
```

### Access the URL
You can simply access the URL by visiting the link returned by the previous request.
A GET method will have to be used.

### List all URL
It's possible to retrieve all the URL generated.
To do so, you simply have to call:
```
GET: http://127.0.0.1:8000/link
```

You should get an array of objects looking like:
```JSON
[
  {
    "short": "http://127.0.0.1:8000/link/HASH",
    "url": "http://my-url.com",
    "visits": 51
  }
]
```
Where `short` is the unreadable URL, `url` is the original link, and `visits` the number of times the link has been visited.

#### Options
Optionally you can pass a `name` parameter to the request. Thus, requesting the following address will give you all the links where the given name can be found in the original url.
```
GET: http://127.0.0.1:8000/link/?name=my
```
> Warning! The given pattern is case sensitive.

### Delete a URL
The API also allows you to delete the generated URL.
To do so:
```
DELETE: http://127.0.0.1:8000/link/HASH
```

