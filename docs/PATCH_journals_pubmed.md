# Journal Resources

    PATCH journals/:pubmed

## Description
Patches a pubmed journal parameters value.

***

## Parameters

**pubmed**

***

## Authorization
**headers**

authorization: ["token"]
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

   PATCH api/v1/journals/:pubmed

**Return** __shortened for example purpose__
``` json
{
    "id": [
        774
    ]
}
```