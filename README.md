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
CREATE TABLE public.link(
	hash varchar(255) NOT NULL,
	url varchar(255),
	visits smallint,
	CONSTRAINT hash PRIMARY KEY (hash)
);

ALTER TABLE public.link OWNER TO postgres;
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

## Create a URL

In order to create your link, you have to pass two elements to the API. A URL and a name.
This can be done by requesting:
```
POST: http://127.0.0.1:8000/link
```

With a body structured like this:
```JSON
{
  "url": "http://my-url.com"
}
```

As a response you should get:
```JSON
"http://127.0.0.1:8000/link2/HASH"
```

## Access the URL
You can simply access the URL by visiting the link returned by the previous request.
A GET method will have to be used.

## List all URL
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

### Options
Optionally you can pass a `name` parameter to the request. Thus, requesting the following address will give you all the links where the given name can be found in the original url.
```
GET: http://127.0.0.1:8000/link?name=my
```
> Warning! The given pattern is case sensitive.

## Delete a URL
The API also allows you to delete the generated URL.
To do so:
```
DELETE: http://127.0.0.1:8000/link/HASH
```

