# Auth

    POST admin

## Description
Allows a user to obtain a JWT token with a valid email address. 

***

## Requires authentication
False

***

## Parameters

A valid JWT request should be issued. You can provide prameters in the POST body of the request. Valid params are :

```
{
	"email": "evan@turing.io",
	"appName": "iamreal"
}

```

***

## Return format
String.

- **token** — A Request Token

***

## Errors

- **422 Missing required parameter [param]** — Request for the token was malformed, check your parameters.

