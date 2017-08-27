# Journal Resources

    GET journals

## Description
Returns a listing of jounrals in the database.

***

## Parameters

Requires none at this time.

***

## Return format
An array with the following keys and values:

- **id** — Unique id of the journal.
- **pubmed** — Publication pubmed id.
- **created_at** — Creation date.
- **updated_at** — Update date.

***

## Errors
None

***

## Example
**Request**

   GET api/v1/journals/

**Return** __shortened for example purpose__
``` json
{
    "data": [
        {
            "id": 727,
            "pubmed": 86747586,
            "created_at": "2017-08-26T19:16:33.330Z",
            "updated_at": "2017-08-26T19:16:33.330Z"
        },
        {
            "id": 712,
            "pubmed": 24336569,
            "created_at": "2017-08-26T18:02:39.444Z",
            "updated_at": "2017-08-26T18:02:39.444Z"
        },
        {
            "id": 713,
            "pubmed": 24336571,
            "created_at": "2017-08-26T18:02:39.444Z",
            "updated_at": "2017-08-26T18:02:39.444Z"
        },
        {
            "id": 714,
            "pubmed": 24717434,
            "created_at": "2017-08-26T18:02:39.444Z",
            "updated_at": "2017-08-26T18:02:39.444Z"
        },
        {
            "id": 715,
            "pubmed": 27013184,
            "created_at": "2017-08-26T18:02:39.444Z",
            "updated_at": "2017-08-26T18:02:39.444Z"
        },
        {
            "id": 716,
            "pubmed": 25494202,
            "created_at": "2017-08-26T18:02:39.444Z",
            "updated_at": "2017-08-26T18:02:39.444Z"
        },
        {
            "id": 717,
            "pubmed": 26472758,
            "created_at": "2017-08-26T18:02:39.445Z",
            "updated_at": "2017-08-26T18:02:39.445Z"
        },
        {
            "id": 718,
            "pubmed": 26627737,
            "created_at": "2017-08-26T18:02:39.445Z",
            "updated_at": "2017-08-26T18:02:39.445Z"
        },
        {
            "id": 719,
            "pubmed": 26780180,
            "created_at": "2017-08-26T18:02:39.445Z",
            "updated_at": "2017-08-26T18:02:39.445Z"
        },
        {
            "id": 720,
            "pubmed": 27260156,
            "created_at": "2017-08-26T18:02:39.446Z",
            "updated_at": "2017-08-26T18:02:39.446Z"
        },
        {
            "id": 721,
            "pubmed": 27260157,
            "created_at": "2017-08-26T18:02:39.446Z",
            "updated_at": "2017-08-26T18:02:39.446Z"
        },
        {
            "id": 722,
            "pubmed": 27453484,
            "created_at": "2017-08-26T18:02:39.448Z",
            "updated_at": "2017-08-26T18:02:39.448Z"
        },
        {
            "id": 723,
            "pubmed": 27661255,
            "created_at": "2017-08-26T18:02:39.448Z",
            "updated_at": "2017-08-26T18:02:39.448Z"
        },
        {
            "id": 724,
            "pubmed": 27760321,
            "created_at": "2017-08-26T18:02:39.448Z",
            "updated_at": "2017-08-26T18:02:39.448Z"
        },
        {
            "id": 725,
            "pubmed": 27869803,
            "created_at": "2017-08-26T18:02:39.449Z",
            "updated_at": "2017-08-26T18:02:39.449Z"
        },
        {
            "id": 726,
            "pubmed": 28162770,
            "created_at": "2017-08-26T18:02:39.450Z",
            "updated_at": "2017-08-26T18:02:39.450Z"
        }
    ]
}
```