# Journal Resources

    GET journals/:pubmed

## Description
Retrieves a journal by pubmed id.

***

## Parameters

**pubmed**

***

## Return format
An object with the following keys and values:

- **pubmed** — Publication pubmed id.

***

## Errors
404 : Could not find journal with pubmed id of [pubmed]

***

## Example
**Request**

   GET api/v1/journals/:pubmed

**Return** __shortened for example purpose__
``` json
[
    {
        "id": 774,
        "pubmed": 24336571,
        "created_at": "2017-08-26T19:59:38.707Z",
        "updated_at": "2017-08-26T19:59:38.707Z"
    }
]
```